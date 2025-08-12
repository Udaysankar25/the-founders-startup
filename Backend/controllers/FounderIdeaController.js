import Idea from "../models/FounderIdeaModel.js";
import User from "../models/SignupModel.js";
import multer from "multer";
import { createNotification } from "./NotificationController.js";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow images, PDFs, and videos
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// @desc    Upload idea attachment (cover image, pitch deck, video)
// @route   POST /api/ideas/upload/:type
// @access  Private
export const uploadIdeaAttachment = async (req, res) => {
  try {
    const { type } = req.params; // 'cover', 'pitch', 'video'

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Check if user is a founder
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "founder") {
      return res
        .status(403)
        .json({ message: "Only founders can upload attachments" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: `${type} uploaded successfully`,
      filePath: filePath,
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error("Upload attachment error:", error);
    res
      .status(500)
      .json({ message: "Failed to upload attachment", error: error.message });
  }
};

// @desc    Create a new idea
// @route   POST /api/ideas
// @access  Private (Founders only)
export const createIdea = async (req, res) => {
  try {
    const { title, description, funding, tags, coverImage, pitchDeck, video } =
      req.body;

    // Check if user is a founder
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "founder") {
      return res
        .status(403)
        .json({ message: "Only founders can create ideas" });
    }

    const idea = new Idea({
      title,
      description,
      funding: funding ? parseFloat(funding) : null,
      tags: tags || [],
      coverImage: coverImage || null,
      pitchDeck: pitchDeck || null,
      video: video || null,
      author: req.user.id,
    });

    const savedIdea = await idea.save();

    // Populate author details
    await savedIdea.populate("author", "name email profilePicture headline");

    res.status(201).json({
      success: true,
      message: "Idea created successfully",
      idea: savedIdea,
    });
  } catch (error) {
    console.error("Create idea error:", error);
    res
      .status(500)
      .json({ message: "Failed to create idea", error: error.message });
  }
};

// Helper: Recursively populate user fields in comments and replies
async function populateCommentsRecursively(idea) {
  await idea.populate({
    path: "comments.user",
    select: "name email profilePicture",
  });

  // For nested replies, we need to manually populate user data
  // since Mongoose doesn't support populate on nested subdocuments
  for (let comment of idea.comments) {
    if (comment.replies && comment.replies.length > 0) {
      await populateRepliesRecursively(idea, comment);
    }
  }
}

async function populateRepliesRecursively(idea, comment) {
  // Get user IDs from replies
  const userIds = comment.replies.map((reply) => reply.user);

  // Fetch users in bulk
  const User = (await import("../models/SignupModel.js")).default;
  const users = await User.find({ _id: { $in: userIds } }).select(
    "name email profilePicture"
  );

  // Create a map for quick lookup
  const userMap = {};
  users.forEach((user) => {
    userMap[user._id.toString()] = user;
  });

  // Manually populate user data in replies
  comment.replies.forEach((reply) => {
    const userId = reply.user.toString();
    if (userMap[userId]) {
      reply.user = userMap[userId];
    }
  });

  // Recursively handle nested replies
  for (let reply of comment.replies) {
    if (reply.replies && reply.replies.length > 0) {
      await populateRepliesRecursively(idea, reply);
    }
  }
}

// @desc    Get all ideas (feed)
// @route   GET /api/ideas
// @access  Private
export const getIdeas = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, tags, search } = req.query;

    const query = {
      status: "published",
      isPublic: true,
    };

    // Filter by author if provided
    if (author) {
      query.author = author;
    }

    // Filter by tags if provided
    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "name email profilePicture headline",
      },
    };

    const ideas = await Idea.paginate(query, options);

    // Populate comments and replies recursively for each idea
    for (let idea of ideas.docs) {
      await populateCommentsRecursively(idea);
    }

    res.json({
      success: true,
      ideas: ideas.docs,
      pagination: {
        currentPage: ideas.page,
        totalPages: ideas.totalPages,
        totalDocs: ideas.totalDocs,
        hasNextPage: ideas.hasNextPage,
        hasPrevPage: ideas.hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Get ideas error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch ideas", error: error.message });
  }
};

// @desc    Get single idea by ID
// @route   GET /api/ideas/:id
// @access  Private
export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate(
      "author",
      "name email profilePicture headline"
    );

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    // Populate comments and replies recursively
    await populateCommentsRecursively(idea);

    // Increment view count
    idea.views += 1;
    await idea.save();

    res.json({
      success: true,
      idea,
    });
  } catch (error) {
    console.error("Get idea by ID error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch idea", error: error.message });
  }
};

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Private (Author only)
export const updateIdea = async (req, res) => {
  try {
    const {
      title,
      description,
      funding,
      tags,
      coverImage,
      pitchDeck,
      video,
      status,
    } = req.body;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    // Check if user is the author
    if (idea.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only update your own ideas" });
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        funding: funding ? parseFloat(funding) : null,
        tags: tags || [],
        coverImage,
        pitchDeck,
        video,
        status,
      },
      { new: true, runValidators: true }
    ).populate("author", "name email profilePicture headline");

    res.json({
      success: true,
      message: "Idea updated successfully",
      idea: updatedIdea,
    });
  } catch (error) {
    console.error("Update idea error:", error);
    res
      .status(500)
      .json({ message: "Failed to update idea", error: error.message });
  }
};

// @desc    Delete idea
// @route   DELETE /api/ideas/:id
// @access  Private (Author only)
export const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    // Check if user is the author
    if (idea.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own ideas" });
    }

    await Idea.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Idea deleted successfully",
    });
  } catch (error) {
    console.error("Delete idea error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete idea", error: error.message });
  }
};

// @desc    Like/Unlike idea
// @route   POST /api/ideas/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const likeIndex = idea.likes.indexOf(req.user.id);

    if (likeIndex > -1) {
      // Unlike
      idea.likes.splice(likeIndex, 1);
    } else {
      // Like
      idea.likes.push(req.user.id);

      // Create notification for the idea author (if not liking their own idea)
      if (idea.author.toString() !== req.user.id) {
        try {
          const liker = await User.findById(req.user.id);
          await createNotification(
            idea.author,
            "like",
            `${liker.name} liked your idea`,
            `${liker.name} liked your idea "${idea.title}"`,
            req.user.id,
            { ideaId: idea._id, ideaTitle: idea.title }
          );
        } catch (error) {
          console.error("Failed to create like notification:", error);
        }
      }
    }

    await idea.save();

    res.json({
      success: true,
      message: likeIndex > -1 ? "Idea unliked" : "Idea liked",
      likeCount: idea.likes.length,
      isLiked: likeIndex === -1,
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res
      .status(500)
      .json({ message: "Failed to toggle like", error: error.message });
  }
};

// @desc    Add comment to idea
// @route   POST /api/ideas/:id/comment
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    idea.comments.push({
      user: req.user.id,
      text: text.trim(),
    });

    await idea.save();

    // Create notification for the idea author (if not commenting on their own idea)
    if (idea.author.toString() !== req.user.id) {
      try {
        const commenter = await User.findById(req.user.id);
        await createNotification(
          idea.author,
          "comment",
          `${commenter.name} commented on your idea`,
          `${commenter.name} commented on your idea "${idea.title}"`,
          req.user.id,
          { ideaId: idea._id, ideaTitle: idea.title, commentText: text.trim() }
        );
      } catch (error) {
        console.error("Failed to create comment notification:", error);
      }
    }

    // Populate the new comment with user details
    await idea.populate("comments.user", "name email profilePicture");

    const newComment = idea.comments[idea.comments.length - 1];

    res.json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res
      .status(500)
      .json({ message: "Failed to add comment", error: error.message });
  }
};

// @desc    Delete comment
// @route   DELETE /api/ideas/:id/comment/:commentId
// @access  Private (Comment author only)
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    // Find the comment recursively (could be a top-level comment or a reply)
    let comment = null;
    let commentLocation = "top-level";

    // First check top-level comments
    comment = idea.comments.id(commentId);

    // If not found in top-level, search recursively in all nested levels
    if (!comment) {
      commentLocation = "nested";
      comment = findCommentRecursively(idea.comments, commentId);
    }

    // Check if user is the comment author OR the idea author
    if (
      comment.user &&
      comment.user.toString() !== req.user.id &&
      idea.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can only delete your own comments or comments on your own idea",
      });
    }

    // Delete the comment recursively
    const deleted = deleteCommentRecursive(idea.comments, commentId);

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await idea.save();

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: error.message });
  }
};

// Helper: Recursively find a comment by ID (for unlimited nesting levels)
function findCommentRecursively(comments, commentId) {
  for (let comment of comments) {
    if (comment._id.toString() === commentId) {
      return comment;
    }
    if (comment.replies && comment.replies.length > 0) {
      const found = findCommentRecursively(comment.replies, commentId);
      if (found) return found;
    }
  }
  return null;
}

// Helper: Recursively find and delete a comment by ID
function deleteCommentRecursive(comments, commentId) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i]._id.toString() === commentId) {
      comments.splice(i, 1);
      return true;
    }
    if (comments[i].replies && comments[i].replies.length > 0) {
      const found = deleteCommentRecursive(comments[i].replies, commentId);
      if (found) return true;
    }
  }
  return false;
}

// Helper: Recursively find a comment by ID and add a reply
function addReplyRecursive(comments, commentId, replyObj) {
  console.log("addReplyRecursive called with commentId:", commentId);
  console.log(
    "Available comments:",
    comments.map((c) => c._id.toString())
  );

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    if (comment._id.toString() === commentId) {
      console.log(`Found parent comment at index ${i}, adding reply`);
      comment.replies.push(replyObj);
      return true;
    }
    if (comment.replies && comment.replies.length > 0) {
      console.log(
        `Checking replies in comment ${i}:`,
        comment.replies.map((r) => r._id.toString())
      );
      const found = addReplyRecursive(comment.replies, commentId, replyObj);
      if (found) return true;
    }
  }
  console.log("Parent comment not found in this level");
  return false;
}

// @desc    Add reply to a comment (nested)
// @route   POST /api/ideas/:ideaId/comment/:commentId/reply
// @access  Private
export const addReplyToComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: ideaId, commentId } = req.params;

    console.log("Add reply request:", { ideaId, commentId, text });

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Reply text is required" });
    }

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    console.log("Idea found:", {
      ideaId: idea._id,
      totalComments: idea.comments.length,
    });

    // Debug: Log all comment and reply IDs
    const allCommentIds = idea.comments.map((c) => c._id.toString());
    console.log("Available comment IDs:", allCommentIds);

    const allReplyIds = [];
    idea.comments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        comment.replies.forEach((reply) => {
          allReplyIds.push(reply._id.toString());
        });
      }
    });
    if (allReplyIds.length > 0) {
      console.log("Available reply IDs:", allReplyIds);
    }

    const replyObj = {
      user: req.user.id,
      text: text.trim(),
      createdAt: new Date(),
      replies: [],
    };

    console.log("Searching for parent comment:", commentId);
    const added = addReplyRecursive(idea.comments, commentId, replyObj);
    if (!added) {
      console.log("Parent comment not found in any location");
      return res.status(404).json({ message: "Parent comment not found" });
    }

    console.log("Reply added successfully");

    await idea.save();

    // Note: Population of user fields in replies will be handled in a follow-up step
    res.json({
      success: true,
      message: "Reply added successfully",
      reply: replyObj,
    });
  } catch (error) {
    console.error("Add reply error:", error);
    res
      .status(500)
      .json({ message: "Failed to add reply", error: error.message });
  }
};

// @desc    Get user's ideas
// @route   GET /api/ideas/user/:userId
// @access  Private
export const getUserIdeas = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const query = {
      author: req.params.userId,
      status: "published",
    };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: {
        path: "author",
        select: "name email profilePicture headline",
      },
    };

    const ideas = await Idea.paginate(query, options);

    // Populate comments and replies recursively for each idea
    for (let idea of ideas.docs) {
      await populateCommentsRecursively(idea);
    }

    res.json({
      success: true,
      ideas: ideas.docs,
      pagination: {
        currentPage: ideas.page,
        totalPages: ideas.totalPages,
        totalDocs: ideas.totalDocs,
        hasNextPage: ideas.hasNextPage,
        hasPrevPage: ideas.hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Get user ideas error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user ideas", error: error.message });
  }
};
