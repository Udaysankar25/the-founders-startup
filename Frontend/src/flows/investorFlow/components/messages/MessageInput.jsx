import React, { useState, useRef } from 'react';
import { FiSmile, FiPaperclip, FiImage, FiFile, FiSend } from 'react-icons/fi';
import EmojiPicker from 'emoji-picker-react';

const MessageInput = ({ onSend, onSendFile, onSendImage }) => {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const fileInputRef = useRef();
  const imageInputRef = useRef();

  const handleSend = () => {
    const trimmed = msg.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMsg('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg(prev => prev + emojiObject.emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendFile(file);
      setShowFileOptions(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendImage(file);
      setShowFileOptions(false);
    }
  };



  return (
    <div className="message-input-container">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* File Options Menu */}
      {showFileOptions && (
        <div className="file-options-menu">
          <button 
            className="file-option-btn"
            onClick={() => imageInputRef.current.click()}
          >
            <FiImage className="w-4 h-4" />
            Photo
          </button>
          <button 
            className="file-option-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <FiFile className="w-4 h-4" />
            Document
          </button>
        </div>
      )}

      <div className="message-input-box">
        {/* Emoji Button */}
        <button 
          className="input-action-btn emoji-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          title="Add emoji"
        >
          <FiSmile className="w-4 h-4" />
        </button>

        {/* File Upload Button */}
        <button 
          className="input-action-btn file-btn"
          onClick={() => setShowFileOptions(!showFileOptions)}
          title="Attach file"
        >
          <FiPaperclip className="w-4 h-4" />
        </button>

        {/* Message Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyPress}
          className="message-input-field"
        />



        {/* Send Button */}
        <button 
          className="input-action-btn send-btn"
          onClick={handleSend}
          disabled={!msg.trim()}
        >
          <FiSend className="w-4 h-4" />
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
        className="hidden"
      />
      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;
