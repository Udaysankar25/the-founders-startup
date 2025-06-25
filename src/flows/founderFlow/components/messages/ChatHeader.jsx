const ChatHeader = ({ name, avatar }) => {
  return (
    <div className="chat-header">
      <div className="chat-user">
        <img src={avatar} alt="avatar" className="chat-avatar" />
        <h4>{name} <span className="verified-icon">💡</span></h4>
      </div>
      <div className="chat-menu">⋯</div>
    </div>
  );
};

export default ChatHeader;
