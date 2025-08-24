import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMessageCircle, FiUserPlus, FiUserCheck } from "react-icons/fi";

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // Mock user data - in real app, fetch based on userId
  useEffect(() => {
    // Simulate fetching user data based on userId
    const mockUser = {
      id: userId || "1",
      name: "Priya Mehta",
      profilePicture: "https://randomuser.me/api/portraits/women/32.jpg",
      headline: "Founder & CEO at LogiTech Solutions",
      bio: "Building the future of logistics with AI-powered solutions. Passionate about solving real-world problems through innovative technology.",
      role: "founder",
      location: "Delhi, India",
      company: "LogiTech Solutions",
      website: "https://logitech.com",
      linkedin: "https://linkedin.com/in/priyamehta",
      github: "https://github.com/priyamehta",
      interests: ["Logistics", "AI/ML", "Supply Chain", "Startup", "Innovation"],
      skills: ["Product Management", "AI Development", "Business Strategy", "Team Leadership"],
      followers: 890,
      following: 156,
      posts: 23,
      startups: 2
    };
    setUser(mockUser);
  }, [userId]);

  // Mock connections data for this user
  const userFollowers = [
    {
      id: 1,
      name: "Alex Johnson",
      type: "Investor",
      status: "Angel investor in logistics and AI",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
      isFollowing: true,
      company: "TechVentures Capital",
      location: "San Francisco, USA"
    },
    {
      id: 2,
      name: "Sarah Chen",
      type: "Founder",
      status: "Building sustainable packaging solutions",
      profilePicture: "https://randomuser.me/api/portraits/women/28.jpg",
      isFollowing: false,
      company: "EcoPack Solutions",
      location: "Singapore"
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      type: "Investor",
      status: "Focus on emerging markets and logistics",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
      isFollowing: true,
      company: "Emerging Markets Capital",
      location: "Mexico City, Mexico"
    },
    {
      id: 4,
      name: "Emma Wilson",
      type: "Founder",
      status: "Revolutionizing last-mile delivery",
      profilePicture: "https://randomuser.me/api/portraits/women/65.jpg",
      isFollowing: true,
      company: "LastMile Tech",
      location: "London, UK"
    }
  ];

  const userFollowing = [
    {
      id: 5,
      name: "David Kim",
      type: "Investor",
      status: "Expert in logistics and supply chain investments",
      profilePicture: "https://randomuser.me/api/portraits/men/67.jpg",
      isFollowing: true,
      company: "SupplyChain Ventures",
      location: "Seoul, South Korea"
    },
    {
      id: 6,
      name: "Lisa Park",
      type: "Founder",
      status: "Building AI-powered warehouse management",
      profilePicture: "https://randomuser.me/api/portraits/women/89.jpg",
      isFollowing: true,
      company: "SmartWarehouse AI",
      location: "Tokyo, Japan"
    },
    {
      id: 7,
      name: "Carlos Silva",
      type: "Investor",
      status: "Latin America logistics specialist",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
      isFollowing: false,
      company: "LatAm Logistics Fund",
      location: "São Paulo, Brazil"
    }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    // Navigate to messages page with this user
    navigate(`/founder/dashboard/messages?user=${user.id}&name=${user.name}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Navigation handlers for followers/following
  const handleShowFollowers = () => {
    setShowFollowers(true);
  };
  
  const handleShowFollowing = () => {
    setShowFollowing(true);
  };

  const handleCloseConnections = () => {
    setShowFollowers(false);
    setShowFollowing(false);
  };

  const handleStartChat = (connection) => {
    navigate(`/founder/dashboard/messages?user=${connection.id}&name=${connection.name}`);
  };

  const handleViewProfile = (connection) => {
    navigate(`/founder/dashboard/user/${connection.id}`);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-purple-700 hover:text-purple-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-purple-200 shadow-lg object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-lg text-gray-600 mt-1">{user.headline}</p>
                  <p className="text-gray-500 mt-2">{user.location}</p>
                  {user.company && (
                    <p className="text-purple-700 font-medium mt-1">{user.company}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleMessage}
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button
                    onClick={handleFollow}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                      isFollowing
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-purple-600 text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <FiUserCheck className="w-4 h-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mt-4 leading-relaxed">{user.bio}</p>

              {/* Stats */}
              <div className="flex justify-center gap-10 mt-6">
                {/* Followers */}
                <div
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={handleShowFollowers}
                >
                  <span className="text-2xl font-bold text-purple-900">
                    {user.followers}
                  </span>
                  <span className="text-sm text-purple-700">Followers</span>
                </div>

                {/* Following */}
                <div
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={handleShowFollowing}
                >
                  <span className="text-2xl font-bold text-purple-900">
                    {user.following}
                  </span>
                  <span className="text-sm text-purple-700">Following</span>
                </div>

                {/* Posts */}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-purple-900">
                    {user.posts}
                  </span>
                  <span className="text-sm text-purple-700">Posts</span>
                </div>

                {/* Startups */}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-purple-900">
                    {user.startups}
                  </span>
                  <span className="text-sm text-purple-700">Startups</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["Overview", "Posts", "Connections"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "Overview" && (
              <div className="space-y-6">
                {/* Interests */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Links</h3>
                  <div className="space-y-2">
                    {user.website && (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        🌐 Website
                      </a>
                    )}
                    {user.linkedin && (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        💼 LinkedIn
                      </a>
                    )}
                    {user.github && (
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        📚 GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Posts" && (
              <div className="text-center py-12 text-gray-500">
                <p>Posts from {user.name} will appear here</p>
              </div>
            )}

            {activeTab === "Connections" && (
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleShowFollowers}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View Followers ({user.followers})
                  </button>
                  <button
                    onClick={handleShowFollowing}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View Following ({user.following})
                  </button>
                </div>
                <p className="text-center text-gray-500">Click the buttons above to view connections</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {user.name}'s Followers ({userFollowers.length})
              </h2>
              <button
                onClick={handleCloseConnections}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Followers List */}
            <div className="overflow-y-auto max-h-[70vh]">
              {userFollowers.map((follower) => (
                <div key={follower.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={follower.profilePicture}
                      alt={follower.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-200 object-cover cursor-pointer hover:border-purple-400 transition-colors"
                      onClick={() => handleViewProfile(follower)}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-semibold text-gray-800 cursor-pointer hover:text-purple-700 transition-colors truncate"
                        onClick={() => handleViewProfile(follower)}
                      >
                        {follower.name}
                      </h3>
                      <p className="text-sm text-gray-600">{follower.company}</p>
                      <p className="text-sm text-gray-500">{follower.location}</p>
                      <p className="text-gray-700 text-sm italic mt-1">"{follower.status}"</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartChat(follower)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Message
                      </button>
                      <button
                        onClick={() => handleViewProfile(follower)}
                        className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {user.name}'s Following ({userFollowing.length})
              </h2>
              <button
                onClick={handleCloseConnections}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Following List */}
            <div className="overflow-y-auto max-h-[70vh]">
              {userFollowing.map((following) => (
                <div key={following.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={following.profilePicture}
                      alt={following.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-200 object-cover cursor-pointer hover:border-purple-400 transition-colors"
                      onClick={() => handleViewProfile(following)}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-semibold text-gray-800 cursor-pointer hover:text-purple-700 transition-colors truncate"
                        onClick={() => handleViewProfile(following)}
                      >
                        {following.name}
                      </h3>
                      <p className="text-sm text-gray-600">{following.company}</p>
                      <p className="text-sm text-gray-500">{following.location}</p>
                      <p className="text-gray-700 text-sm italic mt-1">"{following.status}"</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartChat(following)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        Message
                      </button>
                      <button
                        onClick={() => handleViewProfile(following)}
                        className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePage;
