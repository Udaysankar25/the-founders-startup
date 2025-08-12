import { Conversation, Message } from "../models/MessageModel.js";
import User from "../models/SignupModel.js";

// @desc    Get all conversations for a user
// @route   GET /api/messages/conversations
// @access  Private
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
      isActive: true,
    })
      .populate("participants", "name email profilePicture")
      .populate("lastMessage")
      .sort({ lastMessageAt: -1 });

    // Format conversations for frontend
    const formattedConversations = conversations.map((conv) => {
      const otherParticipant = conv.participants.find(
        (p) => p._id.toString() !== userId
      );

      return {
        id: conv._id,
        name: otherParticipant?.name || "Unknown User",
        avatar:
          otherParticipant?.profilePicture ||
          `https://via.placeholder.com/40x40/800080/FFFFFF?text=${(
            otherParticipant?.name || "U"
          )
            .charAt(0)
            .toUpperCase()}`,
        lastMessage: conv.lastMessage?.content || "Start a conversation",
        date: conv.lastMessageAt,
        unread: conv.unreadCount.get(userId.toString()) || 0,
        participantId: otherParticipant?._id,
      };
    });

    res.json(formattedConversations);
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ message: "Failed to get conversations" });
  }
};

// @desc    Get messages for a specific conversation
// @route   GET /api/messages/conversations/:conversationId
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Verify user is part of this conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(userId)) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const messages = await Message.find({
      conversation: conversationId,
      deletedFor: { $ne: userId }, // Exclude messages deleted for this user
    })
      .populate("sender", "name email profilePicture")
      .populate({
        path: "replyTo",
        select: "content sender",
        populate: { path: "sender", select: "_id" },
      })
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: userId },
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    // Reset unread count for this user
    conversation.unreadCount.set(userId, 0);
    await conversation.save();

    // Format messages for frontend
    const formattedMessages = messages.map((msg) => ({
      id: msg._id,
      sender: msg.sender._id.toString() === userId ? "me" : "other",
      text: msg.content,
      timestamp: msg.createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar:
        msg.sender.profilePicture ||
        `https://via.placeholder.com/40x40/800080/FFFFFF?text=${msg.sender.name
          .charAt(0)
          .toUpperCase()}`,
      isRead: msg.isRead,
      replyTo: msg.replyTo
        ? {
            id: msg.replyTo._id,
            text: msg.replyTo.content,
            sender: msg.replyTo.sender?.toString() === userId ? "me" : "other",
          }
        : null,
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Failed to get messages" });
  }
};

// @desc    Send a message
// @route   POST /api/messages/send
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, content, recipientId, replyTo } = req.body;
    const senderId = req.user.id;

    if (conversationId) {
      console.log("Send message to existing conversation:", {
        conversationId,
        content,
        senderId,
        replyTo,
      });
    } else {
      console.log("Send message to new conversation:", {
        recipientId,
        content,
        senderId,
        replyTo,
      });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Message content is required" });
    }

    let conversation;

    // If conversationId is provided, use existing conversation
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation || !conversation.participants.includes(senderId)) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    } else {
      // Create new conversation
      if (!recipientId) {
        return res.status(400).json({ message: "Recipient ID is required" });
      }

      // Check if conversation already exists
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, recipientId] },
        isActive: true,
      });

      if (!conversation) {
        console.log(
          "Creating new conversation between:",
          senderId,
          "and",
          recipientId
        );

        // Verify recipient exists
        const recipient = await User.findById(recipientId);
        if (!recipient) {
          console.log("Recipient not found:", recipientId);
          return res.status(404).json({ message: "Recipient not found" });
        }

        console.log("Recipient found:", recipient.name);

        // Create new conversation
        conversation = new Conversation({
          participants: [senderId, recipientId],
          unreadCount: new Map([[recipientId, 1]]),
        });
        await conversation.save();
        console.log("New conversation created:", conversation._id);
      }
    }

    // Create the message
    const message = new Message({
      conversation: conversation._id,
      sender: senderId,
      content: content.trim(),
      replyTo: replyTo?.id || null,
    });

    await message.save();

    // Update conversation
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();

    // Increment unread count for other participants
    conversation.participants.forEach((participantId) => {
      if (participantId.toString() !== senderId) {
        const currentCount =
          conversation.unreadCount.get(participantId.toString()) || 0;
        conversation.unreadCount.set(
          participantId.toString(),
          currentCount + 1
        );
      }
    });

    await conversation.save();

    // Populate sender and reply info for response
    await message.populate("sender", "name email profilePicture");
    if (message.replyTo) {
      await message.populate({ path: "replyTo", select: "content sender" });
    }

    const formattedMessage = {
      id: message._id,
      sender: "me",
      text: message.content,
      timestamp: message.createdAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar:
        message.sender.profilePicture ||
        `https://via.placeholder.com/40x40/800080/FFFFFF?text=${(
          message.sender.name || "U"
        )
          .charAt(0)
          .toUpperCase()}`,
      isRead: false,
      replyTo: message.replyTo
        ? {
            id: message.replyTo._id,
            text: message.replyTo.content,
            sender:
              message.replyTo.sender?.toString() === senderId ? "me" : "other",
          }
        : null,
    };

    res.json({
      message: formattedMessage,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// @desc    Search users for starting new conversations
// @route   GET /api/messages/search-users
// @access  Private
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;

    console.log("Search users request:", { query, userId });

    if (!query || query.trim().length === 0) {
      console.log("Empty query, returning empty array");
      return res.json([]);
    }

    const users = await User.find({
      _id: { $ne: userId },
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .select("name email profilePicture")
      .limit(10);

    console.log("Found users:", users.length);

    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar:
        user.profilePicture ||
        "https://via.placeholder.com/40x40/800080/FFFFFF?text=" +
          user.name.charAt(0).toUpperCase(),
    }));

    console.log("Formatted users:", formattedUsers);
    res.json(formattedUsers);
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({ message: "Failed to search users" });
  }
};

// @desc    Mark conversation as read
// @route   PUT /api/messages/conversations/:conversationId/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(userId)) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Mark all messages as read
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: userId },
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    // Reset unread count
    conversation.unreadCount.set(userId, 0);
    await conversation.save();

    res.json({ message: "Marked as read" });
  } catch (error) {
    console.error("Mark as read error:", error);
    res.status(500).json({ message: "Failed to mark as read" });
  }
};

// @desc    Delete a message for me only
// @route   DELETE /api/messages/:messageId/for-me
// @access  Private
export const deleteMessageForMe = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Add user to deletedFor array if not already there
    if (!message.deletedFor.includes(userId)) {
      message.deletedFor.push(userId);
      await message.save();
    }

    res.json({ message: "Message deleted for you" });
  } catch (error) {
    console.error("Delete message for me error:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
};

// @desc    Delete a message for everyone
// @route   DELETE /api/messages/:messageId/for-everyone
// @access  Private
export const deleteMessageForEveryone = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete for everyone
    if (message.sender.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Can only delete your own messages for everyone" });
    }

    await Message.findByIdAndDelete(messageId);

    res.json({ message: "Message deleted for everyone" });
  } catch (error) {
    console.error("Delete message for everyone error:", error);
    res.status(500).json({ message: "Failed to delete message" });
  }
};

// @desc    Delete entire conversation
// @route   DELETE /api/messages/conversations/:conversationId
// @access  Private
export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Check if user is part of the conversation
    if (!conversation.participants.includes(userId)) {
      return res
        .status(403)
        .json({ message: "You can only delete conversations you're part of" });
    }

    // Delete all messages in the conversation
    await Message.deleteMany({ conversation: conversationId });

    // Delete the conversation
    await Conversation.findByIdAndDelete(conversationId);

    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Delete conversation error:", error);
    res.status(500).json({ message: "Failed to delete conversation" });
  }
};
