import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMessageCircle, FiUserPlus, FiUserCheck, FiSearch } from "react-icons/fi";

const ConnectionsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const connectionType = searchParams.get("type") || "followers";

  // Mock connections data
  const mockConnections = {
    followers: [
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
    ],
    following: [
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
    ]
  };

  useEffect(() => {
    // Set connections based on type
    setConnections(mockConnections[connectionType] || []);
  }, [connectionType]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFollowToggle = (connectionId) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, isFollowing: !conn.isFollowing }
          : conn
      )
    );
  };

  const handleMessage = (connection) => {
    navigate(`/founder/dashboard/messages?user=${connection.id}&name=${connection.name}`);
  };

  const handleViewProfile = (connection) => {
    navigate(`/founder/dashboard/user/${connection.id}`);
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || connection.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTitle = () => {
    return connectionType === "followers" ? "Followers" : "Following";
  };

  const getCount = () => {
    return connections.length;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {getTitle()} ({getCount()})
        </h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, company, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {["All", "Founder", "Investor"].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  filter === filterOption
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Connections List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredConnections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No connections found matching your search." : `No ${connectionType} yet.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Profile Picture */}
                  <img
                    src={connection.profilePicture}
                    alt={connection.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-200 object-cover cursor-pointer hover:border-purple-400 transition-colors"
                    onClick={() => handleViewProfile(connection)}
                  />

                  {/* Connection Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 
                          className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-purple-700 transition-colors truncate"
                          onClick={() => handleViewProfile(connection)}
                        >
                          {connection.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{connection.company}</p>
                        <p className="text-sm text-gray-500 mt-1">{connection.location}</p>
                        <p className="text-gray-700 mt-2 italic">"{connection.status}"</p>
                      </div>

                      {/* Type Badge */}
                      <div className="ml-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          connection.type === "Founder" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {connection.type === "Founder" ? "★ Founder" : "● Investor"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleMessage(connection)}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <FiMessageCircle className="w-4 h-4" />
                        Message
                      </button>
                      
                      <button
                        onClick={() => handleFollowToggle(connection.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                          connection.isFollowing
                            ? "border-purple-600 bg-purple-600 text-white"
                            : "border-purple-600 text-purple-600 hover:bg-purple-50"
                        }`}
                      >
                        {connection.isFollowing ? (
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

                      <button
                        onClick={() => handleViewProfile(connection)}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
