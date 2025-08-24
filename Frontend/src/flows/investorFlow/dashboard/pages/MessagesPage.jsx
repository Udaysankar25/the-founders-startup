import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatApp from '../../components/messages/ChatApp';

const MessagesPage = () => {
  const [searchParams] = useSearchParams();
  const [initialUser, setInitialUser] = useState(null);

  useEffect(() => {
    // Check if we have user parameters from navigation
    const userId = searchParams.get('user');
    const userName = searchParams.get('name');
    
    if (userId && userName) {
      setInitialUser({ id: userId, name: userName });
    }
  }, [searchParams]);

  return (
    <div className="messages-page">
      <ChatApp initialUser={initialUser} />
    </div>
  );
};

export default MessagesPage;
