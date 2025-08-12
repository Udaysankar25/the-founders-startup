import { useState } from "react";

const MessageInput = ({ onSend, replyTo = null, onCancelReply = () => {} }) => {
  const [msg, setMsg] = useState("");

  const handleSend = () => {
    const trimmed = msg.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMsg("");
    onCancelReply();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-box">
      {replyTo && (
        <div className="reply-preview">
          <div className="reply-title">
            Replying to {replyTo.sender === "me" ? "you" : "them"}
          </div>
          <div className="reply-text">{replyTo.text}</div>
          <button className="reply-cancel" onClick={onCancelReply}>
            ✕
          </button>
        </div>
      )}
      <input
        type="text"
        placeholder="Message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="send-btn" onClick={handleSend}>
        📨
      </button>
    </div>
  );
};

export default MessageInput;
