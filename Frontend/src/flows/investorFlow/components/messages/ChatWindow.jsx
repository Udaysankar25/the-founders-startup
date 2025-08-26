import { useEffect, useState } from 'react';
import socket from '../../../../socket';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatWindow = ({ chat, onBack }) => {
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

  useEffect(() => {
    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socket.off('receive-message');
  }, []);

return (
    <div className="chat-window flex flex-col h-full">
      {/* Back button on mobile */}
      <div className="md:hidden p-2 border-b">
        <button onClick={onBack} className="text-primary text-sm">&larr; Back</button>
      </div>

      <ChatHeader name={chat.name} avatar={chat.avatar} />

      <div className="messages-list flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            sender={msg.sender}
            text={msg.text}
            timestamp={msg.timestamp}
            avatar={chat.avatar}
            type={msg.type}
            fileName={msg.fileName}
            fileSize={msg.fileSize}
            imageUrl={msg.imageUrl}
          />
        ))}
      </div>

      <MessageInput 
        onSend={handleSend} 
        onSendFile={handleSendFile}
        onSendImage={handleSendImage}
      />
    </div>
  );
};


export default ChatWindow;
