import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{post.description}</p>
      <p className="text-xs text-purple-500 mt-2">
        {post.author.name} • {post.timeAgo}
      </p>
    </div>
  );
};

export default PostCard;
