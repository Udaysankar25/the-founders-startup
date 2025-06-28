import { useEffect, useState } from 'react';
import socket from '../../../../socket';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState(chat.messages || []);

  const handleSend = (text) => {
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);

    // Emit message to server
    socket.emit('send-message', {
      to: chat.id,
      message: newMsg,
    });
  };

  useEffect(() => {
    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('receive-message');
  }, []);

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
