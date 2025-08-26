import { useEffect, useState, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { FiArrowLeft } from "react-icons/fi";

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
      sender: "me",
      type: "file",
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSendImage = (file) => {
    const newMsg = {
      id: Date.now(),
      sender: "me",
      type: "image",
      imageUrl: URL.createObjectURL(file),
      fileName: file.name,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  const handleReply = (msg) => {
    setReplyTo(msg);
  };

  return (
    <div className="chat-window flex flex-col h-full">
      {/* Back button for mobile */}
      {onBack && (
        <div className="md:hidden flex items-center gap-2 p-3 border-b bg-white shadow-sm">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-gray-800">{chat.name}</span>
          </div>
        </div>
      )}

      {/* Header for desktop */}
      <div className="hidden md:block">
        <ChatHeader name={chat.name} avatar={chat.avatar} />
      </div>

      {/* Messages */}
      <div className="messages-list flex-1 overflow-y-auto p-4 bg-gray-50">
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

      {/* Input */}
      <div className="border-t bg-white">
        <MessageInput
          onSend={handleSend}
          onSendFile={handleSendFile}
          onSendImage={handleSendImage}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
