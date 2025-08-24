import React, { useState } from "react";
import { apiCall } from "../../../../utils/api.js";

const Sidebar = ({
  chats = [],
  onSelectUser,
  onNewConversation,
  onDeleteConversation,
  selectedChat,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      setIsSearching(true);
      console.log("Searching for:", query);
      const results = await apiCall(
        `/api/messages/search-users?query=${encodeURIComponent(query)}`,
        "GET"
      );
      console.log("Search results:", results);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleStartConversation = async (user) => {
    const message = `Hi ${user.name}! I'd like to connect with you.`;

    try {
      console.log("Starting conversation with user:", user);
      await onNewConversation(user.id, message);
      console.log("Conversation started successfully");
      setSearchQuery("");
      setSearchResults([]);
      setShowSearchResults(false);
    } catch (err) {
      console.error("Failed to start conversation:", err);
      alert("Failed to start conversation. Please try again.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "Today";

    const now = new Date();
    const messageDate = new Date(date);
    const diffTime = Math.abs(now - messageDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return messageDate.toLocaleDateString();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Messages</h3>
        <button className="close-btn">✖</button>
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search users to chat with..."
          className="chat-search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {showSearchResults && (
        <div className="search-results">
          <h4>Search Results</h4>
          {isSearching ? (
            <div className="loading">Searching...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.id}
                className="search-result-item"
                onClick={() => handleStartConversation(user)}
              >
                <img src={user.avatar} alt={user.name} className="avatar-img" />
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <button className="start-chat-btn">Start Chat</button>
              </div>
            ))
          ) : (
            <div className="no-results">No users found</div>
          )}
        </div>
      )}

      <div className="chat-list">
        <h4>Recent Conversations</h4>
        {chats.length === 0 ? (
          <div className="no-conversations">
            <p>No conversations yet</p>
            <p>Search for users to start chatting!</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div key={chat.id} className={`chat-card ${selectedChat?.id === chat.id ? 'selected' : ''}`}>
              <div
                className="chat-card-content"
                onClick={() => onSelectUser(chat)}
              >
                <img src={chat.avatar} alt={chat.name} className="avatar-img" />
                <div className="chat-info">
                  <div className="chat-name">{chat.name}</div>
                  <div className="chat-msg">
                    {chat.lastMessage || "Start a new conversation"}
                  </div>
                </div>
                <div className="chat-meta">
                  <span>{formatDate(chat.date)}</span>
                  {chat.unread > 0 && (
                    <span className="unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
              <button
                className="delete-conversation-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(chat.id);
                }}
                title="Delete conversation"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
