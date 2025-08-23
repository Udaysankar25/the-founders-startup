import React, { useState } from "react";
import {
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiTrendingUp,
  FiMoreHorizontal,
  FiSmile,
  FiPaperclip,
} from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import UserProfilePopup from "../dashboard/pages/UserProfilePopup"; // Import the popup component

const PostCard = ({ post, onDelete }) => {
  const [liked, setLiked] = useState(
    post.likes?.includes(JSON.parse(localStorage.getItem("user"))?._id) || false
  );
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [loading, setLoading] = useState(false);

  // Comment states
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [commentSort, setCommentSort] = useState("newest"); // "newest" or "top"

  // Popup state for user profile
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Helper to get the correct profile picture URL
  const getProfilePicUrl = (pic) => {
    if (!pic) return "https://randomuser.me/api/portraits/men/44.jpg";
    if (pic.startsWith("http")) return pic;
    return `http://localhost:5000${pic}`;
  };

  // Helper to get attachment URL
  const getAttachmentUrl = (attachment) => {
    if (!attachment) return null;
    if (attachment.startsWith("http")) return attachment;
    return `http://localhost:5000${attachment}`;
  };

  // Helper to format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInHours = Math.floor((now - commentTime) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  // Show popup with mock data when profile clicked
  const handleProfileClick = () => {
    setSelectedUser({
      name: post.author?.name || "Anonymous",
      profilePicture: post.author?.profilePicture || "https://randomuser.me/api/portraits/men/44.jpg",
      bio: "Passionate about sustainable food systems and building smarter cities.",
      followers: "12k",
      following: "3k",
      ideas: "12",
      startups: "5",
      about: "I invest in bold student-led ventures solving real problems through AI, sustainability, and education. Passionate about early-stage ideas with scalable impact.",
      interests: ["AgriTech", "StartupFounder", "StudentInnovation"],
      skills: [
        "Market Analysis",
        "Early-Stage Investing",
        "Financial Modeling",
        "Startup Mentorship"
      ]
    });
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
    setSelectedUser(null);
  };

  const toggleLike = async () => {
    try {
      setLoading(true);
      // You can add API logic here when backend is ready
      setLiked((prev) => !prev);
      setLikeCount((count) => liked ? count - 1 : count + 1);
    } catch (error) {
      console.error("Like error:", error);
    } finally {
      setLoading(false);
    }
  };

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
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err.message);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      setCommentLoading(true);
      // You can add API logic here when backend is ready
      setComments((prev) => [
        ...prev,
        {
          _id: Math.random().toString(),
          text: commentText.trim(),
          createdAt: new Date(),
          user: { name: "You", profilePicture: "https://randomuser.me/api/portraits/men/44.jpg" },
          likes: [],
          replies: []
        }
      ]);
      setCommentText("");
    } catch (error) {
      console.error("Comment error:", error);
      alert("Failed to add comment: " + error.message);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      setComments(comments.filter(c => c._id !== commentId));
    } catch (error) {
      console.error("Delete comment error:", error);
      alert("Failed to delete comment: " + error.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    console.log("Like comment:", commentId);
  };

  const handleReplyToComment = async (commentId, replyText) => {
    if (!replyText.trim()) return;
    setComments(comments.map((c) => {
      if (c._id === commentId) {
        return {
          ...c,
          replies: [
            ...(c.replies || []),
            {
              _id: Math.random().toString(),
              text: replyText.trim(),
              createdAt: new Date(),
              user: { name: "You", profilePicture: "https://randomuser.me/api/portraits/men/44.jpg" },
              likes: []
            }
          ]
        }
      }
      return c;
    }));
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return (b.likes?.length || 0) - (a.likes?.length || 0);
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg mb-6 p-6 border border-purple-100 transition hover:shadow-xl duration-300">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <button
            onClick={handleProfileClick}
            className="flex items-center focus:outline-none p-0 m-0 bg-transparent border-none cursor-pointer"
            type="button"
          >
            <img
              src={getProfilePicUrl(post.author?.profilePicture)}
              alt={post.author?.name || "User"}
              className="w-11 h-11 rounded-full ring-2 ring-purple-200 mr-3 object-cover"
            />
            <div>
              <p className="font-semibold text-primary">
                {post.author?.name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button className="text-primary text-sm font-semibold hover:underline">
              + Follow
            </button>
          </div>
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

        {/* Attachments */}
        {post.coverImage && (
          <img
            src={getAttachmentUrl(post.coverImage)}
            alt="Idea Cover"
            className="mt-2 rounded-xl w-full max-h-[400px] object-cover"
          />
        )}

        {/* Pitch Deck Link */}
        {post.pitchDeck && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-blue-800">Pitch Deck</span>
            </div>
            <a
              href={getAttachmentUrl(post.pitchDeck)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 underline mt-1 block"
            >
              View Pitch Deck
            </a>
          </div>
        )}

        {/* Video */}
        {post.video && (
          <div className="mt-3">
            <video
              controls
              className="w-full rounded-lg"
              src={getAttachmentUrl(post.video)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-purple-100 text-sm text-primary">
          <button
            onClick={toggleLike}
            disabled={loading}
            className="flex items-center gap-1 font-medium hover:text-primary disabled:opacity-50"
          >
            <span className="text-lg transition-transform hover:scale-110">
              {liked ? <FaThumbsUp className="text-primary" /> : <FiThumbsUp />}
            </span>
            Like {likeCount > 0 && `(${likeCount})`}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 font-medium hover:text-primary transition"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">
              <FiMessageCircle />
            </span>
            Comment {comments.length > 0 && `(${comments.length})`}
          </button>

          <ActionButton icon={<FiShare2 />} label="Share" onClick={handleShare} />
          <ActionButton icon={<FiTrendingUp />} label="Invest" />
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 pt-4 border-t border-purple-100">
            {/* Comment Input */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src={getProfilePicUrl(
                  JSON.parse(localStorage.getItem("user"))?.profilePicture
                )}
                alt="Your Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                  className="w-full px-4 py-2 border border-purple-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent pr-16"
                  disabled={commentLoading}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiSmile className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FiPaperclip className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Sorting */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setCommentSort("newest")}
                className={`text-sm font-medium ${
                  commentSort === "newest" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setCommentSort("top")}
                className={`text-sm font-medium ${
                  commentSort === "top" ? "text-purple-600" : "text-gray-500"
                }`}
              >
                Top
              </button>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {sortedComments.map((comment) => (
                <RecursiveCommentItem
                  key={comment._id}
                  comment={comment}
                  onDelete={handleDeleteComment}
                  onLike={handleLikeComment}
                  onReply={(commentId, replyText) =>
                    handleReplyToComment(commentId, replyText)
                  }
                  formatTimestamp={formatTimestamp}
                  getProfilePicUrl={getProfilePicUrl}
                  currentUserId={JSON.parse(localStorage.getItem("user"))?._id}
                  ideaAuthorId={post.author?._id}
                  depth={0}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User profile popup */}
      {showProfile && selectedUser && (
        <UserProfilePopup user={selectedUser} onClose={closeProfile} />
      )}
    </>
  );
};

// Recursive Comment Item Component for nested replies
const RecursiveCommentItem = ({
  comment,
  onDelete,
  onLike,
  onReply,
  formatTimestamp,
  getProfilePicUrl,
  currentUserId,
  ideaAuthorId,
  depth = 0,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const isCommentAuthor = comment.user?._id === currentUserId;
  const isIdeaAuthor = ideaAuthorId === currentUserId;
  const canDelete = isCommentAuthor || isIdeaAuthor;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    onLike(comment._id);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(comment._id);
    setShowDeleteConfirm(false);
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    setReplyLoading(true);
    try {
      await onReply(comment._id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div
      className={`${
        depth > 0
          ? `ml-${Math.min(depth * 8, 32)} border-l-2 border-purple-100 pl-4`
          : ""
      }`}
    >
      <div className="flex gap-3">
        <img
          src={getProfilePicUrl(comment.user?.profilePicture)}
          alt={comment.user?.name || "User"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-purple-600 text-sm">
                {comment.user?.name || (comment.user ? "User" : "Anonymous")}
              </span>
              <span className="text-xs text-gray-500">
                {formatTimestamp(comment.createdAt)}
              </span>
            </div>
            {canDelete && (
              <>
                <button
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiMoreHorizontal className="w-4 h-4" />
                </button>
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Delete Comment
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this comment? This
                        action cannot be undone.
                      </p>
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmDelete}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment.text}</p>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mb-3">
              <div className="flex items-start gap-2">
                <img
                  src={getProfilePicUrl(
                    JSON.parse(localStorage.getItem("user"))?.profilePicture
                  )}
                  alt="Your Avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleReply()}
                    className="w-full px-3 py-1 text-sm border border-purple-200 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-300"
                    disabled={replyLoading}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-2 ml-8">
                <button
                  onClick={handleReply}
                  disabled={replyLoading || !replyText.trim()}
                  className="px-3 py-1 text-xs bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50"
                >
                  {replyLoading ? "Posting..." : "Reply"}
                </button>
                <button
                  onClick={() => {
                    setShowReplyInput(false);
                    setReplyText("");
                  }}
                  className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${
                liked ? "text-purple-600" : "text-gray-500"
              } hover:text-purple-600`}
            >
              <FiThumbsUp className={`w-3 h-3 ${liked ? "fill-current" : ""}`} />
              Like {likeCount > 0 && `(${likeCount})`}
            </button>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-gray-500 hover:text-purple-600"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <RecursiveCommentItem
              key={reply._id}
              comment={reply}
              onDelete={onDelete}
              onLike={onLike}
              onReply={onReply}
              formatTimestamp={formatTimestamp}
              getProfilePicUrl={getProfilePicUrl}
              currentUserId={currentUserId}
              ideaAuthorId={ideaAuthorId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 font-medium hover:text-primary transition"
  >
    <span className="text-lg group-hover:scale-110 transition-transform">
      {icon}
    </span>
    {label}
  </button>
);

export default PostCard;
