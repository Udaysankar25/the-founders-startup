import React from 'react';
import PostCard from '../../components/PostCard';
import mockPosts from '../data/mockPosts';

const HomePage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Post Creation Input (placeholder) */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Post your ideas!"
            className="flex-1 px-4 py-2 border border-purple-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className="flex justify-around text-sm text-purple-700 font-medium">
          <button>🎤 Audio</button>
          <button>🎥 Video</button>
          <button>🖼️ Image</button>
        </div>
      </div>

      {/* Post Feed */}
      {mockPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
