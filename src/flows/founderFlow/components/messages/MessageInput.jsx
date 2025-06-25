import { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    const trimmed = msg.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMsg('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-box">
      <input
        type="text"
        placeholder="Message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="send-btn" onClick={handleSend}>📨</button>
    </div>
  );
};

export default MessageInput;
