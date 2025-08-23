import React from "react";

const ChatHeader = ({ name, avatar, onBack }) => {
  return (
    <div className="chat-header">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          &larr;
        </button>
      )}
      <div className="chat-user">
        <img src={avatar} alt="avatar" className="chat-avatar" />
        <h4>
          {name} <span className="verified-icon">💡</span>
        </h4>
      </div>
      <div className="chat-menu">⋯</div>
    </div>
  );
};

export default ChatHeader;