import React from 'react';
import QuickPostInput from '../components/QuickPostInput';
import PostCard from '../components/PostCard';

const FounderDashboard = () => {
  return (
    <>
      <QuickPostInput />
      <div className="mt-6 space-y-6">
        <PostCard />
        {/* <PostCard /> */}
      </div>
    </>
  );
};

export default FounderDashboard;
