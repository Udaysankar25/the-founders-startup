import React, { useState, useRef, useEffect } from "react";
import IdeaModal from "../../dashboard/pages/IdeaModal";
import ConnectionsList from "./ConnectionsList";
import ChatWindow from "../../components/messages/ChatWindow";

// Helper to get the correct profile picture URL
const getProfilePicUrl = (pic) => {
  if (!pic) return "https://randomuser.me/api/portraits/women/44.jpg";
  if (pic.startsWith("http")) return pic;
  return `http://localhost:5000${pic}`;
};

// Helper to get the correct background image URL
const getBackgroundUrl = (bg) => {
  if (!bg) return null;
  if (bg.startsWith("http")) return bg;
  return `http://localhost:5000${bg}`;
};

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showFollowers, setShowFollowers] = useState(false);
const [showFollowing, setShowFollowing] = useState(false);
const [followers, setFollowers] = useState([]);
const [following, setFollowing] = useState([]);
const [showChat, setShowChat] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [showChatWindow, setShowChatWindow] = useState(false);




  const avatarInputRef = useRef();
  const bgInputRef = useRef();

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    fetch("/api/founder/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        // Set background image from profile data
        if (data.profileBg) {
          setBgImage(getBackgroundUrl(data.profileBg));
        }
        // Update localStorage with the latest profile
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("profileUpdated"));
        // Fetch user's ideas after profile is loaded
        fetch(`/api/ideas/user/${data._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
          .then((res) => res.json())
          .then((ideasData) => {
            setIdeas(ideasData.ideas || []);
          })
          .catch(() => setIdeas([]));
      })
      .catch((err) => setProfileError("Failed to load profile"));
  }, []);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("picture", file);
    try {
      const res = await fetch("/api/founder/profile/picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      // Update profile state with new picture
      setProfile((prev) => {
        const updatedProfile = { ...prev, profilePicture: data.profilePicture };

        // Update localStorage with the updated profile
        localStorage.setItem("user", JSON.stringify(updatedProfile));

        // Dispatch events to notify other components
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("profileUpdated"));

        return updatedProfile;
      });

      setAvatar(data.profilePicture);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleBgChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit for background images)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert(
        `File too large. Maximum size is 10MB. Selected file: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB`
      );
      e.target.value = ""; // Clear the input
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = ""; // Clear the input
      return;
    }

    setUploading(true);
    setUploadError("");
    const formData = new FormData();
    formData.append("background", file);

    try {
      const res = await fetch("/api/founder/profile/background", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      // Update profile state with new background
      setProfile((prev) => {
        const updatedProfile = { ...prev, profileBg: data.profileBg };

        // Update localStorage with the updated profile
        localStorage.setItem("user", JSON.stringify(updatedProfile));

        // Dispatch events to notify other components
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("profileUpdated"));

        return updatedProfile;
      });

      setBgImage(data.profileBg);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

const userFollowers = [
  { id: 1, name: "Alice", type: "Founder", status: "HealthTech innovator", profilePicture: "https://randomuser.me/api/portraits/women/44.jpg", isFollowing: true },
  { id: 2, name: "Bob", type: "Investor", status: "Investing in AI", profilePicture: "https://randomuser.me/api/portraits/men/23.jpg", isFollowing: false },
];

const userFollowing = [
  { id: 3, name: "Charlie", type: "Founder", status: "EdTech startup", profilePicture: "https://randomuser.me/api/portraits/men/32.jpg", isFollowing: true },
];

// Show followers modal
const handleShowFollowers = () => {
  setShowFollowers(true);
};

// Show following modal
const handleShowFollowing = () => {
  setShowFollowing(true);
};

const handleStartChat = (user) => {
  setSelectedUser(user);
  setShowChatWindow(true); // show chat modal
};




  const handlePostIdea = (newIdea) => {
    // Refresh ideas from backend after posting
    if (profile?._id) {
      fetch(`/api/ideas/user/${profile._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((ideasData) => {
          setIdeas(ideasData.ideas || []);
        })
        .catch(() => setIdeas([]));
    }

    // Also refresh profile data to update idea count
    fetch("/api/founder/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        // Set background image from profile data
        if (data.profileBg) {
          setBgImage(getBackgroundUrl(data.profileBg));
        }
        // Update localStorage with the latest profile
        localStorage.setItem("user", JSON.stringify(data));
        window.dispatchEvent(new Event("profileUpdated"));
        window.dispatchEvent(new Event("refreshProfileSummary"));
      })
      .catch((err) => console.error("Failed to refresh profile:", err));

    setIsModalOpen(false);
  };

 const handleDeleteIdea = async (ideaId) => {
  if (!window.confirm("Are you sure you want to delete this idea?")) {
    return;
  }
  try {
    const response = await fetch(`/api/ideas/${ideaId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete idea");
      }

      // Remove the deleted idea from the ideas state
      setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea._id !== ideaId));

      // Also refresh profile data to update idea count
      fetch("/api/founder/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          // Set background image from profile data
          if (data.profileBg) {
            setBgImage(getBackgroundUrl(data.profileBg));
          }
          // Update localStorage with the latest profile
          localStorage.setItem("user", JSON.stringify(data));
          window.dispatchEvent(new Event("profileUpdated"));
          window.dispatchEvent(new Event("refreshProfileSummary"));
        })
        .catch((err) => console.error("Failed to refresh profile:", err));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete idea: " + error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="rounded-xl shadow-md bg-white overflow-hidden">
        <div
          className="relative min-h-[220px] flex items-end text-white bg-cover bg-center"
          style={{
            backgroundImage: profile?.profileBg
              ? `url(${getBackgroundUrl(profile.profileBg)})`
              : bgImage
              ? `url(${bgImage})`
              : "linear-gradient(to right, #fb923c, #8b5cf6)",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
          <button
            onClick={() => bgInputRef.current.click()}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            title="Change background"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 4a3 3 0 100 6 3 3 0 000-6z"
              />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={bgInputRef}
            onChange={handleBgChange}
            className="hidden"
          />

          <div className="relative z-10 w-full flex flex-col sm:flex-row items-center sm:items-end gap-4 p-6 sm:p-8">
            <label className="cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md group-hover:shadow-xl transition">
                {avatar ? (
                  <img
                    src={getProfilePicUrl(avatar)}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : profile?.profilePicture ? (
                  <img
                    src={getProfilePicUrl(profile.profilePicture)}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14a4 4 0 100-8 4 4 0 000 8zm0 2c-3.315 0-6 2.239-6 5v1h12v-1c0-2.761-2.685-5-6-5z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
            {uploading && (
              <span className="text-sm text-gray-600 ml-2">Uploading...</span>
            )}
            {uploadError && (
              <span className="text-sm text-red-600 ml-2">{uploadError}</span>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                {profile?.name || "Founder Name"}
              </h2>
              <p className="italic text-sm text-gray-200 mt-1">
                {profile?.headline || "“Turning ideas into impact”"}
              </p>
              {/* Stats */}
<div className="flex justify-center gap-10 mt-4">
  {/* Followers */}
  <div
    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
    onClick={handleShowFollowers}
  >
    <span className="text-2xl font-bold text-white drop-shadow-lg">
      {followers.length}
    </span>
    <span className="text-sm text-purple-100">Followers</span>
  </div>

  {/* Following */}
  <div
    className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
    onClick={handleShowFollowing}
  >
    <span className="text-2xl font-bold text-white drop-shadow-lg">
      {following.length}
    </span>
    <span className="text-sm text-purple-100">Following</span>
  </div>

  {/* Ideas */}
  <div className="flex flex-col items-center">
    <span className="text-2xl font-bold text-white drop-shadow-lg">
      {profile?.ideasCount ?? 0}
    </span>
    <span className="text-sm text-purple-100">Ideas</span>
  </div>

  {/* Startups */}
  <div className="flex flex-col items-center">
    <span className="text-2xl font-bold text-white drop-shadow-lg">
      {profile?.startupsCount ?? 0}
    </span>
    <span className="text-sm text-purple-100">Startups</span>
  </div>
</div>


{showFollowers && (
  <ConnectionsList
    title="Followers"
    connectionsData={userFollowers}
    onClose={() => setShowFollowers(false)}
    onStartChat={handleStartChat}
  />
)}

{showFollowing && (
  <ConnectionsList
    title="Following"
    connectionsData={userFollowing}
    onClose={() => setShowFollowing(false)}
    onStartChat={handleStartChat}
  />
)}

{showChatWindow && selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2 md:p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl md:max-w-2xl h-[90vh] md:h-[80vh] flex flex-col overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => setShowChatWindow(false)}
          className="text-purple-700 text-base font-semibold"
        >
          &larr; Back
        </button>
        <h3 className="text-lg font-bold text-purple-900 truncate max-w-[60%] md:max-w-[70%]">
          {selectedUser.name}
        </h3>
        <div /> {/* Placeholder for alignment */}
      </div>

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        <ChatWindow chat={{ user: selectedUser, messages: [] }} onSendMessage={() => {}} />
      </div>
    </div>
  </div>
)}

            </div>
          </div>
        </div>
      </div>

      {/* Your Ideas Section */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Your Ideas
            </h2>
            <p className="text-sm text-gray-500">
              All the concepts you're nurturing
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#800080] text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Idea
          </button>
        </div>
        {ideas.length === 0 ? (
          <div className="text-gray-400 italic">
            No ideas yet. Start by creating one!
          </div>
        ) : (
          <div className="grid gap-6">
            {ideas.map((idea) => (
              <div key={idea._id} className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={getProfilePicUrl(profile?.profilePicture)}
                      alt={profile?.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-semibold text-gray-800">
                      {profile?.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(idea.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteIdea(idea._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <h3 className="font-bold text-lg text-purple-700 mb-1">
                  {idea.title}
                </h3>
                <p className="text-gray-700 mb-2">{idea.description}</p>

                {/* Cover Image */}
                {idea.coverImage && (
                  <img
                    src={getBackgroundUrl(idea.coverImage)}
                    alt="Idea Cover"
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}

                {/* Tags */}
                {idea.tags && idea.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-2">
                    {idea.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Attachments */}
                {(idea.pitchDeck || idea.video) && (
                  <div className="flex gap-2 mt-2">
                    {idea.pitchDeck && (
                      <a
                        href={getBackgroundUrl(idea.pitchDeck)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                      >
                        📄 Pitch Deck
                      </a>
                    )}
                    {idea.video && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        🎥 Video
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Idea Modal */}
      <IdeaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handlePostIdea}
      />
      {profileError && (
        <div className="text-red-600 text-center">{profileError}</div>
      )}
    </div>
  );
};

export default Profile;
