const MessageBubble = ({ sender, text, timestamp, avatar, type, fileName, fileSize, imageUrl }) => {
  const isMe = sender === 'me';

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderMessageContent = () => {
    if (type === 'image') {
      return (
        <div className="image-message">
          <img src={imageUrl} alt={fileName} className="message-image" />
          <div className="image-caption">{fileName}</div>
        </div>
      );
    }

    if (type === 'file') {
      return (
        <div className="file-message">
          <div className="file-icon">📄</div>
          <div className="file-info">
            <div className="file-name">{fileName}</div>
            <div className="file-size">{formatFileSize(fileSize)}</div>
          </div>
          <button className="download-btn" title="Download file">
            ⬇️
          </button>
        </div>
      );
    }

    return <p>{text}</p>;
  };

  return (
    <div className={`bubble-wrapper ${isMe ? 'me' : 'other'}`}>
      {!isMe && <img src={avatar} className="bubble-avatar" />}
      <div className={`bubble ${isMe ? 'me-bubble' : 'other-bubble'}`}>
        {renderMessageContent()}
        <span className="timestamp">{timestamp}</span>
      </div>
      {isMe && <img src="/avatars/me.jpg" className="bubble-avatar" />}
    </div>
  );
};

export default MessageBubble;
