import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { apiCall } from "../../../../utils/api.js";
import "./chat.css";

const ChatApp = ({ initialUser }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Responsive state for mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(true);

  // Forward UI state
  const [forwardMode, setForwardMode] = useState(false);
  const [forwardText, setForwardText] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log(
      "ChatApp mounted - Token exists:",
      !!token,
      "User exists:",
      !!user
    );

    if (!token || !user) {
      setError("Please log in to access messages");
      setLoading(false);
      return;
    }

    fetchConversations();
  }, []);

  // Handle initialUser prop to pre-select a chat
  useEffect(() => {
    if (initialUser && conversations.length > 0) {
      // Find existing chat with this user
      const existingChat = conversations.find(chat => chat.id === initialUser.id);
      
      if (existingChat) {
        setSelectedChat(existingChat);
      } else {
        // Create a mock chat if none exists
        const mockChat = {
          id: initialUser.id,
          name: initialUser.name,
          profilePicture: "https://randomuser.me/api/portraits/men/44.jpg",
          messages: [],
          unread: 0
        };
        setSelectedChat(mockChat);
      }
    }
  }, [initialUser, conversations]);

  // New useEffect to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth < 768;
      setIsMobile(isMobileSize);
      // On desktop, we always show the sidebar and chat panel
      if (!isMobileSize) {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await apiCall("/api/messages/conversations", "GET");
      setConversations(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (chat) => {
    try {
      // Fetch messages for this conversation
      const messages = await apiCall(
        `/api/messages/conversations/${chat.id}`,
        "GET"
      );

      // Mark as read
      await apiCall(`/api/messages/conversations/${chat.id}/read`, "PUT");

      // Update the chat with messages
      const updatedChat = {
        ...chat,
        messages: messages,
      };

      setSelectedChat(updatedChat);

      // Update unread count in conversations list
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === chat.id ? { ...conv, unread: 0 } : conv
        )
      );

      // On mobile, hide the sidebar when a user is selected
      if (isMobile) {
        setShowSidebar(false);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleBackToSidebar = () => {
    // Function to go back to the sidebar on mobile
    setSelectedChat(null);
    setShowSidebar(true);
  };

  const handleSendMessage = async (content, replyMeta = null) => {
    if (!selectedChat) return;

    try {
      const payload = { conversationId: selectedChat.id, content };
      if (replyMeta) payload.replyTo = replyMeta; // optional, backend may ignore

      const response = await apiCall("/api/messages/send", "POST", payload);

      // Add new message to current chat
      const messageToAdd = {
        ...response.message,
        replyTo: replyMeta || null,
      };
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, messageToAdd],
      }));

      // Update conversations list with new last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedChat.id
            ? {
                ...conv,
                lastMessage: content,
                date: new Date(),
                unread: 0,
              }
            : conv
        )
      );
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleNewConversation = async (recipientId, content) => {
    try {
      console.log("Creating new conversation with:", { recipientId, content });

      const response = await apiCall("/api/messages/send", "POST", {
        recipientId: recipientId,
        content: content,
      });

      console.log("New conversation response:", response);

      // Refresh conversations to include the new one
      await fetchConversations();

      // Find the new conversation in the updated list
      const updatedConversations = await apiCall(
        "/api/messages/conversations",
        "GET"
      );
      const newConversation = updatedConversations.find(
        (conv) => conv.id === response.conversationId
      );

      if (newConversation) {
        console.log("Found new conversation:", newConversation);
        handleUserSelect(newConversation);
      } else {
        console.log("New conversation not found in list");
      }
    } catch (err) {
      console.error("Failed to start new conversation:", err);
      throw err; // Re-throw to show error in Sidebar
    }
  };

  const handleDeleteMessageForMe = async (messageId) => {
    try {
      await apiCall(`/api/messages/${messageId}/for-me`, "DELETE");

      // Remove the message from the current chat
      setSelectedChat((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.id !== messageId),
      }));
    } catch (err) {
      console.error("Failed to delete message for me:", err);
      alert("Failed to delete message");
    }
  };

  const handleDeleteMessageForEveryone = async (messageId) => {
    try {
      await apiCall(`/api/messages/${messageId}/for-everyone`, "DELETE");

      // Remove the message from the current chat
      setSelectedChat((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.id !== messageId),
      }));
    } catch (err) {
      console.error("Failed to delete message for everyone:", err);
      alert("Failed to delete message");
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this entire conversation? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await apiCall(`/api/messages/conversations/${conversationId}`, "DELETE");

      // Remove conversation from list
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversationId)
      );

      // If this was the selected chat, clear selection
      if (selectedChat && selectedChat.id === conversationId) {
        setSelectedChat(null);
      }
    } catch (err) {
      console.error("Failed to delete conversation:", err);
      alert("Failed to delete conversation");
    }
  };

  // Start forward flow from ChatWindow
  const beginForward = (msg) => {
    setForwardText(msg.text);
    setForwardMode(true);
  };

  const sendForwardToConversation = async (conversationId) => {
    try {
      await apiCall("/api/messages/send", "POST", {
        conversationId,
        content: forwardText,
      });
      // If forwarding to the same open chat, append
      if (selectedChat && selectedChat.id === conversationId) {
        await handleSendMessage(forwardText);
      }
      setForwardMode(false);
      setForwardText("");
    } catch (e) {
      console.error("Failed to forward message", e);
      alert("Failed to forward message");
    }
  };

  if (loading) {
    return (
      <div className="chat-app-wrapper">
        <div className="loading">Loading conversations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat-app-wrapper">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="chat-app-wrapper">
      <div className="chat-layout">
        {/* Only show the sidebar if we're on a desktop or if showSidebar is true on mobile */}
        {showSidebar && (
          <div className="sidebar-wrapper">
            <Sidebar
              chats={conversations}
              onSelectUser={handleUserSelect}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
              selectedChat={selectedChat}
            />
          </div>
        )}

        {/* Show the chat panel only if a chat is selected or on a desktop */}
        {selectedChat && (
          <div className="chat-panel">
            <ChatWindow
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onDeleteMessageForMe={handleDeleteMessageForMe}
              onDeleteMessageForEveryone={handleDeleteMessageForEveryone}
              onForward={beginForward}
              onBack={isMobile ? handleBackToSidebar : null} // Pass the back handler only for mobile
            />
            {forwardMode && (
              <div className="forward-overlay">
                <div className="forward-modal">
                  <div className="forward-header">
                    <span>Forward message</span>
                    <button
                      className="forward-close"
                      onClick={() => setForwardMode(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="forward-preview">{forwardText}</div>
                  <div className="forward-list">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        className="forward-item"
                        onClick={() => sendForwardToConversation(conv.id)}
                      >
                        <img
                          src={conv.avatar}
                          className="avatar-img"
                          alt="avatar"
                        />
                        <div className="forward-info">
                          <div className="forward-name">{conv.name}</div>
                          <div className="forward-last">
                            {conv.lastMessage || ""}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Show this on desktop when no chat is selected */}
        {!selectedChat && !isMobile && (
          <div className="chat-panel">
            <div className="empty-chat-window">
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;