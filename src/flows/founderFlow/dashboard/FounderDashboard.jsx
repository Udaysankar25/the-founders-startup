import React from 'react';
import DashboardLayout from './DashboardLayout';
import QuickPostInput from '../components/QuickPostInput';
import PostCard from '../components/PostCard';

const FounderDashboard = () => {
  return (
    <DashboardLayout>
      <QuickPostInput />

      {/* Post Feed */}
      <div className="mt-6 space-y-6">
        <PostCard />
        {/* <PostCard /> */}
      </div>
    </DashboardLayout>
  );
};

export default FounderDashboard;
