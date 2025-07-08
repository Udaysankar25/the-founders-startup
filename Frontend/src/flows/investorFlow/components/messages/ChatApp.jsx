import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './chat.css';

const mockChats = [
  {
    id: 1,
    name: 'Priya Mehta',
    avatar: '/avatars/1.jpg',
    message: 'Hello, Happy...',
    date: 'May 21',
    unread: 2,
    messages: [
      { id: 1, sender: 'other', text: 'Hi Riya!', timestamp: '9:10 AM' },
      { id: 2, sender: 'me', text: 'Hi John! Good to hear.', timestamp: '9:11 AM' }
    ]
  },
  {
    id: 2,
    name: 'Jason Lee',
    avatar: '/avatars/2.jpg',
    message: 'What’s the update?',
    date: 'May 22',
    messages: [
      { id: 1, sender: 'other', text: 'Hi Priya!', timestamp: '9:10 AM' },
      { id: 2, sender: 'me', text: 'Hi Rohit! Good to hear.', timestamp: '9:11 AM' }
    ]
  }
];

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleUserSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chat-app-wrapper">
      <div className="chat-layout">
        <div className="sidebar-wrapper">
          <Sidebar chats={mockChats} onSelectUser={handleUserSelect} />
        </div>

        <div className="chat-panel">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="empty-chat-window">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

// messages
