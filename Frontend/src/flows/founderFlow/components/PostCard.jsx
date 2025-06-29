import React, { useState } from 'react';
import {
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiTrendingUp
} from 'react-icons/fi';
import { FaThumbsUp } from 'react-icons/fa';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(prev => !prev);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg mb-6 p-6 border border-purple-100 transition hover:shadow-xl duration-300">
      
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={post.avatar}
          alt={post.name}
          className="w-11 h-11 rounded-full ring-2 ring-purple-200 mr-3 object-cover"
        />
        <div>
          <p className="font-semibold text-primary">{post.name}</p>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
        <button className="ml-auto text-primary text-sm font-semibold hover:underline">
          + Follow
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.description}</p>

      {/* Funding */}
      {post.funding && (
        <div className="flex items-center gap-2 text-sm font-medium text-purple-700 bg-purple-50 px-4 py-2 rounded-xl mb-4 w-fit">
          <FiTrendingUp className="text-lg" />
          Funding Goal: ₹{post.funding}
        </div>
      )}

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-purple-100 text-primary text-xs px-3 py-1 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Idea Attachment"
          className="mt-2 rounded-xl w-full max-h-[400px] object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 mt-4 border-t border-purple-100 text-sm text-primary">
        <button
          onClick={toggleLike}
          className="flex items-center gap-1 font-medium hover:text-primary"
        >
          <span className="text-lg transition-transform hover:scale-110">
            {liked ? <FaThumbsUp className="text-primary" /> : <FiThumbsUp />}
          </span>
          Like
        </button>

        <ActionButton icon={<FiMessageCircle />} label="Comment" />
        <ActionButton icon={<FiShare2 />} label="Share" onClick={handleShare} />
        <ActionButton icon={<FiTrendingUp />} label="Invest" />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 font-medium hover:text-primary transition"
  >
    <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
    {label}
  </button>
);

export default PostCard;
