import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChatApp from '../../components/messages/ChatApp';

const MessagesPage = () => {
  const [searchParams] = useSearchParams();
  const [initialUser, setInitialUser] = useState(null);

  useEffect(() => {
    // Read user and name from URL query parameters
    const user = searchParams.get('user');
    const name = searchParams.get('name');
    
    if (user && name) {
      setInitialUser({ id: user, name: name });
    }
  }, [searchParams]);

  return (
    <div className="messages-page">
      <ChatApp initialUser={initialUser} />
    </div>
  );
};

export default MessagesPage;
