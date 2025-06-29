import React, { useState } from 'react';
import PostCard from '../../components/PostCard';
import QuickPostInput from '../../components/QuickPostInput';
import IdeaModal from '../pages/IdeaModal';
import mockPosts from '../data/mockPosts';

const HomePage = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [showModal, setShowModal] = useState(false);

  const handlePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
       <QuickPostInput onPost={handlePost} />
      </div>

      {showModal && (
        <IdeaModal
          onClose={() => setShowModal(false)}
          onPost={handlePost}
        />
      )}

      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
