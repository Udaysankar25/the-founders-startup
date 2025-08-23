import React, { useState } from "react";
import ConnectionsList from "./ConnectionsList";
import ChatWindow from "../../components/messages/ChatWindow";

const mockIdeas = [
  {
    id: 1,
    title: "Ijnjn",
    content: "nknknk",
    createdAt: "2025-07-30T14:55:12.000Z",
    hashtag: "#IjnijnIjn",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
  },
  {
    id: 2,
    title: "hey there",
    content: "fish curry",
    createdAt: "2025-07-26T17:10:10.000Z",
    hashtag: "#fishcurry",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

const UserProfilePopup = ({ user, onClose, ideas = mockIdeas }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showUnfollowConfirm, setShowUnfollowConfirm] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [connectionsType, setConnectionsType] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const getAvatarUrl = (path) => {
    if (!path) return "https://randomuser.images/men/44.jpg";
    if (path.startsWith("http")) return path;
    return `http://localhost:3000${path}`;
  };

  const handleFollow = () => setIsFollowing(true);
  const handleClickUnfollowConfirm = () => setShowUnfollowConfirm(true);
  const cancelUnfollow = () => setShowUnfollowConfirm(false);
  const confirmUnfollow = () => {
    setIsFollowing(false);
    setShowUnfollowConfirm(false);
  };
  const openConnections = (type) => {
    setConnectionsType(type);
    setShowConnections(true);
  };

  const closeConnections = () => {
    setConnectionsType("");
    setShowConnections(false);
  };

  const openChatWithUser = (chatUser) => {
    setSelectedChatUser(chatUser);
    setShowChat(true);
  };

  const closeChat = () => {
    setSelectedChatUser(null);
    setShowChat(false);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-2 md:p-4">
      <div
        className="bg-white rounded-[32px] shadow-2xl relative flex flex-col w-full max-w-2xl md:max-w-3xl h-[97vh] md:h-[90vh] overflow-hidden"
        style={{ borderRadius: "32px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-2xl font-bold text-purple-700 hover:bg-purple-100 transition cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        {showConnections ? (
          <ConnectionsList
            type={connectionsType}
            onClose={closeConnections}
            onStartChat={(user) => {
              closeConnections();
              openChatWithUser(user);
            }}
          />
        ) : showChat && selectedChatUser ? (
          <div className="flex-1 flex flex-col bg-white h-full">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <button
                onClick={closeChat}
                className="text-purple-700 text-base md:text-xl font-semibold"
              >
                &larr; Back
              </button>
              <h3 className="text-base md:text-xl font-bold text-purple-900">
                {selectedChatUser.name}
              </h3>
              <div />
            </div>
            <div className="flex-1 min-h-0">
              <ChatWindow
                chat={{ user: selectedChatUser, messages: [] }}
                onSendMessage={() => {}}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Banner and avatar scrolls with profile info */}
            <div>
              <div className="relative h-40 md:h-48 w-full">
                <div
                  className="w-full h-full rounded-t-[32px]"
                  style={{
                    background:
                      "linear-gradient(92deg,#ff8c58 0%,#3039d2 66%,#a534e5 100%)",
                  }}
                />
                <img
                  src={getAvatarUrl(user.profilePicture)}
                  alt={user.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover absolute left-4 md:left-8 -bottom-12"
                />
              </div>
              <div className="h-16" /> {/* To prevent content overlap with avatar */}
            </div>

            {/* Profile content */}
            <div className="flex-1 px-3 md:px-12 pt-4 md:pt-10 pb-8">
              {/* Header and buttons */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-purple-900">{user.name}</h2>
                  <p className="mt-1 text-sm md:text-base italic text-purple-700 max-w-xl">{user.bio}</p>
                </div>
                <div className="flex flex-row flex-wrap gap-3 w-full md:w-auto">
                  {!isFollowing ? (
                    <button
                      onClick={handleFollow}
                      className="flex-1 md:flex-none py-2 md:py-3 px-5 md:px-8 bg-purple-700 text-white rounded-2xl font-semibold shadow hover:bg-purple-800 transition"
                    >
                      + Follow
                    </button>
                  ) : (
                    <button
                      onClick={handleClickUnfollowConfirm}
                      className="flex-1 md:flex-none py-2 md:py-3 px-5 md:px-8 bg-purple-100 text-purple-700 rounded-2xl font-semibold shadow hover:bg-purple-700 hover:text-white transition"
                    >
                      Following
                    </button>
                  )}
                  <button
                    onClick={() => openChatWithUser(user)}
                    className="flex-1 md:flex-none py-2 md:py-3 px-5 md:px-8 border border-purple-700 rounded-2xl text-purple-700 font-semibold hover:bg-purple-50 transition"
                  >
                    Message
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between flex-wrap gap-y-4 mb-8 text-center">
                <div
                  className="cursor-pointer px-1 md:px-3 w-1/4"
                  onClick={() => openConnections("Followers")}
                >
                  <p className="text-xl md:text-2xl font-extrabold text-purple-900">12k</p>
                  <p className="text-purple-700 text-xs md:text-base">Followers</p>
                </div>
                <div
                  className="cursor-pointer px-1 md:px-3 w-1/4"
                  onClick={() => openConnections("Following")}
                >
                  <p className="text-xl md:text-2xl font-extrabold text-purple-900">3k</p>
                  <p className="text-purple-700 text-xs md:text-base">Following</p>
                </div>
                <div className="px-1 md:px-3 w-1/4">
                  <p className="text-xl md:text-2xl font-extrabold text-purple-900">12</p>
                  <p className="text-purple-700 text-xs md:text-base">Ideas</p>
                </div>
                <div className="px-1 md:px-3 w-1/4">
                  <p className="text-xl md:text-2xl font-extrabold text-purple-900">5</p>
                  <p className="text-purple-700 text-xs md:text-base">Startups</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-6 md:space-x-10 border-b border-gray-200 mb-8 overflow-x-auto">
                {["Overview", "Ideas", "Connections"].map((tab) => (
                  <button
                    key={tab}
                    className={`text-base md:text-lg font-semibold py-2 border-b-4 whitespace-nowrap ${
                      activeTab === tab
                        ? "border-purple-700 text-purple-900"
                        : "border-transparent text-purple-700"
                    } focus:outline-none`}
                    onClick={() => setActiveTab(tab)}
                    aria-selected={activeTab === tab}
                    role="tab"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "Overview" && (
                <section>
                  <h3 className="text-lg md:text-xl font-bold text-purple-900 mb-4">About</h3>
                  <p className="mb-8 text-base md:text-lg text-purple-800">{user.bio}</p>
                  <h4 className="text-base md:text-lg font-semibold text-purple-900 mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-3 mb-7">
                    {user.interests?.map((interest, i) =>
                      interest ? (
                        <span
                          key={i}
                          className="bg-purple-100 text-purple-700 py-1 px-3 rounded-full text-sm font-semibold"
                        >
                          #{interest}
                        </span>
                      ) : null
                    )}
                  </div>
                  <h4 className="text-base md:text-lg font-semibold text-purple-900 mb-3">Skills</h4>
                  <ul className="list-disc list-inside space-y-1 text-base text-purple-800">
                    {user.skills?.map((skill, i) => skill && <li key={i}>{skill}</li>)}
                  </ul>
                </section>
              )}
              {activeTab === "Ideas" && (
                <section>
                  <h3 className="text-lg md:text-xl font-bold text-purple-900 mb-4">User Ideas</h3>
                  <div className="space-y-5">
                    {ideas.map((idea) => (
                      <div key={idea.id} className="bg-white rounded-xl shadow p-3 border border-purple-100" style={{ background: "#faf6ff" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-purple-900">{user.name}</span>
                          <span className="text-xs text-gray-400">{new Date(idea.createdAt).toLocaleString()}</span>
                        </div>
                        <h4 className="mb-1 text-base font-semibold text-purple-800">{idea.title}</h4>
                        <div className="mb-2">{idea.content}</div>
                        {idea.image && (
                          <img src={idea.image} alt="Idea" className="w-full rounded-xl mb-2 mt-2" style={{ maxHeight: 100, objectFit: "cover" }} />
                        )}
                        {idea.hashtag && (
                          <div className="text-xs rounded-full bg-purple-200 text-purple-700 px-3 py-1 mt-2 inline-block">{idea.hashtag}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {activeTab === "Connections" && (
                <section className="mb-5 flex gap-4">
                  <button
                    className="px-4 py-2 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-800"
                    onClick={() => openConnections("Followers")}
                  >
                    See Followers
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-700 text-white rounded-full font-semibold hover:bg-purple-800"
                    onClick={() => openConnections("Following")}
                  >
                    See Following
                  </button>
                </section>
              )}
            </div>
          </div>
        )}

        {showUnfollowConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto w-full">
              <p className="text-base md:text-lg mb-6">Are you sure you want to unfollow {user.name}?</p>
              <div className="flex justify-end gap-4">
                <button onClick={cancelUnfollow} className="py-2 px-6 rounded-lg border border-gray-300">Cancel</button>
                <button onClick={confirmUnfollow} className="py-2 px-6 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">Unfollow</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePopup;
