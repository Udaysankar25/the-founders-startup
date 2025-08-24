import React, { useState } from "react";

const mockConnections = [
  {
    id: 1,
    name: "Swathi",
    type: "Founder",
    status: "Backing student-led innovation in HealthTech.",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Ravi",
    type: "Investor",
    status: "Investing in next-gen AI startups.",
    profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
    isFollowing: false,
  },
];

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Founders", value: "Founder" },
  { label: "Investors", value: "Investor" },
];

const typeIcon = (type) => {
  if (type === "Founder")
    return <span title="Founder" className="ml-1 text-yellow-400 text-base">★</span>;
  if (type === "Investor")
    return (
      <span title="Investor" className="ml-1">
        <span className="inline-block w-3 h-3 rounded-full bg-green-500 align-middle"></span>
      </span>
    );
  return null;
};

const ConnectionsList = ({ title, connectionsData = [], onClose, onStartChat }) => {
  const [connections, setConnections] = useState(connectionsData.length ? connectionsData : mockConnections);

  const [filter, setFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");

  const handleToggleFollow = (id) => {
    setConnections((prev) =>
      prev.map((conn) =>
        conn.id === id ? { ...conn, isFollowing: !conn.isFollowing } : conn
      )
    );
  };

  const filteredConnections = connections.filter((conn) => {
    const matchType = filter === "All" || conn.type === filter;
    const matchSearch =
      conn.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      conn.status.toLowerCase().includes(searchValue.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-2">
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
        style={{ minWidth: 320 }}
      >
        {/* Header */}
<div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
  <h2 className="text-lg md:text-xl font-bold text-purple-900">
    {filteredConnections.length} {title}
  </h2>
  <button
    onClick={onClose}
    className="text-3xl text-gray-400 hover:text-purple-700 transition font-bold focus:outline-none"
    aria-label="Close"
  >
    &times;
  </button>
</div>


        {/* Search/filter */}
        <div className="px-6 pt-4 pb-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name, industry, status"
              className="w-full bg-gray-50 rounded-full py-3 pl-5 pr-12 border border-gray-200 text-sm md:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
            <svg
              className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
          </div>
          {/* Filters */}
          <div className="flex space-x-3 mt-4 overflow-x-auto no-scrollbar pb-3">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`flex-none rounded-full px-4 py-2 font-semibold whitespace-nowrap transition ${
                  filter === opt.value
                    ? "bg-purple-700 text-white shadow"
                    : "bg-purple-50 text-purple-700"
                }`}
                aria-pressed={filter === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <ul className="divide-y divide-gray-100 flex-1 overflow-y-auto px-5">
          {filteredConnections.length === 0 && (
            <li className="py-10 text-center text-gray-400">No connections found.</li>
          )}
          {filteredConnections.map((conn) => (
            <li
              key={conn.id}
              className="flex items-center py-4 justify-between gap-2"
            >
              <div className="flex items-center min-w-0 gap-4">
                <img
                  src={conn.profilePicture}
                  alt={conn.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="font-bold text-purple-900 flex items-center truncate">
                    {conn.name} {typeIcon(conn.type)}
                  </div>
                  <div className="text-sm text-purple-700 italic truncate max-w-xs">
                    {conn.status}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleFollow(conn.id)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition focus:outline-none ${
                    conn.isFollowing
                      ? "bg-purple-700 text-white shadow hover:bg-purple-800"
                      : "border-2 border-purple-700 text-purple-700 bg-white hover:bg-purple-50"
                  }`}
                  aria-pressed={conn.isFollowing}
                >
                  {conn.isFollowing ? "Following" : "Follow"}
                </button>
                <button
                  onClick={() => onStartChat && onStartChat(conn)}
                  className="px-6 py-2 bg-gray-100 rounded-full text-sm font-semibold shadow hover:bg-gray-200 focus:outline-none"
                >
                  Message
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectionsList;
