import { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState(chat.messages);

  const handleSend = (text) => {
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
  };

  return (
    <div className="chat-window">
      <ChatHeader name={chat.name} avatar={chat.avatar} />
      <div className="messages-list">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            avatar={chat.avatar}
          />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
