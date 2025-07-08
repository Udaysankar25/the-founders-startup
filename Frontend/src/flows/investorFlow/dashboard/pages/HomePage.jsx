import React, { useState } from 'react';
import PostCard from '../../components/PostCard';
import InvestorFeed from '../../components/InvestorFeed';
import mockPosts from '../data/mockPosts';

const HomePage = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handlePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <InvestorFeed onPost={handlePost} />
      </div>

      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
