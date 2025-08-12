import React, { useState, useEffect } from "react";
import { FiMic, FiVideo, FiImage, FiPlus } from "react-icons/fi";
import IdeaModal from "../dashboard/pages/IdeaModal";

// Helper to get the correct profile picture URL
const getProfilePicUrl = (pic) => {
  if (!pic) return "https://randomuser.me/api/portraits/women/44.jpg";
  if (pic.startsWith("http")) return pic;
  return `http://localhost:5000${pic}`;
};

const QuickPostInput = ({ onPost }) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  // Update user info if localStorage changes (e.g., after profile update)
  useEffect(() => {
    const handleStorage = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || {});
      } catch {
        setUser({});
      }
    };

    // Listen for both storage events and custom profile update events
    window.addEventListener("storage", handleStorage);
    window.addEventListener("profileUpdated", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profileUpdated", handleStorage);
    };
  }, []);

  const handlePost = (idea) => {
    const normalized = {
      ...idea,
      image: idea.image, // coming from IdeaModal
      timeAgo: "Just now",
      user: {
        name: user.name || "Founder",
        avatar: getProfilePicUrl(user.profilePicture),
      },
    };

    onPost(normalized);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-md border border-purple-200">
        <div
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 cursor-pointer hover:bg-purple-50 transition-colors border border-purple-300 rounded-full px-4 py-2"
        >
          <img
            src={getProfilePicUrl(user.profilePicture)}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-purple-400"
          />
          <span className="text-purple-700 text-sm flex items-center gap-2">
            <FiPlus className="text-lg" /> Post your ideas!
          </span>
        </div>

        <div className="flex justify-between mt-6 px-6 text-sm text-purple-700">
          <button className="flex items-center gap-2 hover:text-purple-900 transition-colors">
            <FiMic /> Audio
          </button>
          <button className="flex items-center gap-2 hover:text-purple-900 transition-colors">
            <FiVideo /> Video
          </button>
          <button className="flex items-center gap-2 hover:text-purple-900 transition-colors">
            <FiImage /> Image
          </button>
        </div>
      </div>

      <IdeaModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onPost={handlePost}
      />
    </>
  );
};

export default QuickPostInput;
