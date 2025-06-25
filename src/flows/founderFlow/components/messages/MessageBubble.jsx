const MessageBubble = ({ sender, text, timestamp, avatar }) => {
  const isMe = sender === 'me';

  return (
    <div className={`bubble-wrapper ${isMe ? 'me' : 'other'}`}>
      {!isMe && <img src={avatar} className="bubble-avatar" />}
      <div className={`bubble ${isMe ? 'me-bubble' : 'other-bubble'}`}>
        <p>{text}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
      {isMe && <img src="/avatars/me.jpg" className="bubble-avatar" />}
    </div>
  );
};

export default MessageBubble;
