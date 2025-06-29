import React from 'react';

const Sidebar = ({ chats = [], onSelectUser }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Messages</h3>
        <button className="close-btn">✖</button>
      </div>

      <div className="search-wrapper">
        <input type="text" placeholder="Search chats" className="chat-search" />
        <span className="search-icon">🔍</span>
      </div>

      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-card" onClick={() => onSelectUser(chat)}>
            <img src={chat.avatar} alt={chat.name} className="avatar-img" />
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-msg">
                {chat.messages?.[chat.messages.length - 1]?.text || 'Start a new conversation'}
              </div>
            </div>
            <div className="chat-meta">
              <span>{chat.date || 'Today'}</span>
              {chat.unread && <span className="unread-badge">{chat.unread}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
