import { useEffect, useRef, useState } from "react";

const MessageBubble = ({
  sender,
  text,
  timestamp,
  avatar,
  messageId,
  onDeleteForMe,
  onDeleteMessageForEveryone,
  onReply,
  onForward,
  replyTo,
}) => {
  const isMe = sender === "me";
  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  // Get current user's profile picture from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const currentUserAvatar =
    currentUser.profilePicture ||
    `https://via.placeholder.com/40x40/800080/FFFFFF?text=${(
      currentUser.name || "U"
    )
      .charAt(0)
      .toUpperCase()}`;

  const handleDeleteForMe = () => {
    if (window.confirm("Delete this message for you only?")) {
      onDeleteForMe && onDeleteForMe(messageId);
      setShowMenu(false);
    }
  };

  const handleDeleteForEveryone = () => {
    if (
      window.confirm(
        "Delete this message for everyone? This action cannot be undone."
      )
    ) {
      onDeleteMessageForEveryone && onDeleteMessageForEveryone(messageId);
      setShowMenu(false);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
    } catch (err) {
      console.error("Failed to copy message", err);
    }
    setShowMenu(false);
  };

  const handleReply = () => {
    onReply && onReply({ id: messageId, text, sender });
    setShowMenu(false);
  };

  const handleForward = () => {
    onForward && onForward({ id: messageId, text, sender });
    setShowMenu(false);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text || "");
        alert("Message copied. You can paste it to share.");
      }
    } catch (e) {
      // ignore
    }
    setShowMenu(false);
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div
      className={`bubble-wrapper ${isMe ? "me" : "other"}`}
      onContextMenu={handleContextMenu}
    >
      {!isMe && <img src={avatar} className="bubble-avatar" alt="Other user" />}
      <div className={`bubble ${isMe ? "me-bubble" : "other-bubble"}`}>
        {replyTo && (
          <div className="reply-header">
            <div className="reply-accent" />
            <div className="reply-meta">
              <div className="reply-name">
                {replyTo.sender === "me" ? "You" : "Them"}
              </div>
              <div className="reply-snippet">{replyTo.text}</div>
            </div>
          </div>
        )}
        <p>{text}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
      {isMe && (
        <img src={currentUserAvatar} className="bubble-avatar" alt="You" />
      )}

      {showMenu && (
        <div
          ref={menuRef}
          className="message-context-menu"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          <button className="ctx-item" onClick={handleReply}>
            Reply
          </button>
          <button className="ctx-item" onClick={handleCopy}>
            Copy
          </button>
          <button className="ctx-item" onClick={handleForward}>
            Forward
          </button>
          {onDeleteForMe && (
            <button className="ctx-item" onClick={handleDeleteForMe}>
              Delete for me
            </button>
          )}
          {isMe && onDeleteMessageForEveryone && (
            <button className="ctx-item" onClick={handleDeleteForEveryone}>
              Delete for everyone
            </button>
          )}
          <button className="ctx-item" onClick={handleShare}>
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
