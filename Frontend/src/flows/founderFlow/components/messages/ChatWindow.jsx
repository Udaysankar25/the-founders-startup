import { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({
  chat,
  onSendMessage,
  onDeleteMessageForMe,
  onDeleteMessageForEveryone,
  onForward,
  onBack,
}) => {
  const [messages, setMessages] = useState(chat.messages || []);
  const [replyTo, setReplyTo] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages(chat.messages || []);
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!onSendMessage) return;
    try {
      await onSendMessage(
        text,
        replyTo
          ? { id: replyTo.id, text: replyTo.text, sender: replyTo.sender }
          : null
      );
      setReplyTo(null);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleSendFile = (file) => {
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      type: 'file',
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const handleSendImage = (file) => {
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      type: 'image',
      imageUrl: URL.createObjectURL(file),
      fileName: file.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
  };

  const handleReply = (msg) => {
    setReplyTo(msg);
  };

  return (
    <div className="chat-window">
      {/* Pass the onBack prop to ChatHeader */}
      <ChatHeader name={chat.name} avatar={chat.avatar} onBack={onBack} />
      <div className="messages-list">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            avatar={msg.avatar}
            messageId={msg.id}
            replyTo={msg.replyTo}
            onDeleteForMe={onDeleteMessageForMe}
            onDeleteMessageForEveryone={onDeleteMessageForEveryone}
            onReply={handleReply}
            onForward={onForward}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput
        onSend={handleSend}
        onSendFile={handleSendFile}
        onSendImage={handleSendImage}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
      />
    </div>
  );
};

export default ChatWindow;