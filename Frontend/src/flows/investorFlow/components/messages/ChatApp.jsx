import React, { useState, useEffect } from 'react';
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
    message: 'What\'s the update?',
    date: 'May 22',
    messages: [
      { id: 1, sender: 'other', text: 'Hi Priya!', timestamp: '9:10 AM' },
      { id: 2, sender: 'me', text: 'Hi Rohit! Good to hear.', timestamp: '9:11 AM' }
    ]
  }
];

const ChatApp = ({ initialUser }) => {
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (initialUser) {
      const existingChat = mockChats.find(chat => chat.id === initialUser.id);
      if (existingChat) {
        setSelectedChat(existingChat);
      } else {
        const newChat = {
          id: initialUser.id,
          name: initialUser.name,
          avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
          message: 'Start a new conversation',
          date: 'Now',
          unread: 0,
          messages: []
        };
        setSelectedChat(newChat);
      }
    }
  }, [initialUser]);

  const handleUserSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chat-app-wrapper">
     <div className="chat-layout">
  {/* Sidebar */}
  <div className={`sidebar-wrapper ${selectedChat ? 'chat-hidden md:flex' : 'block'}`}>
    <Sidebar chats={mockChats} onSelectUser={handleUserSelect} selectedChat={selectedChat} />
  </div>

  {/* Chat Panel */}
  <div className={`chat-panel ${selectedChat ? 'block' : 'chat-hidden md:flex'}`}>
    {selectedChat ? (
      <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
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
