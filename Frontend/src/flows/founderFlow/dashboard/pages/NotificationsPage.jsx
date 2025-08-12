import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { apiCall } from "../../../../utils/api.js";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
  });

  const fetchNotifications = async (page = 1, type = activeTab) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 20,
        ...(type !== "all" && { type }),
      });

      const response = await apiCall(`/api/notifications?${params}`, "GET");
      setNotifications(response.notifications);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const handleMarkAsRead = async (id) => {
    try {
      await apiCall(`/api/notifications/${id}/read`, "PUT");
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setActiveMenu(null);
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiCall(`/api/notifications/${id}`, "DELETE");
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setActiveMenu(null);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    fetchNotifications(1, tab);
  };

  const handleLoadMore = () => {
    if (pagination.hasMore) {
      fetchNotifications(pagination.currentPage + 1, activeTab);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      comment: "💬",
      like: "❤️",
      follow: "👥",
      team_invite: "🤝",
      investment: "💰",
      profile_view: "👀",
      message: "📨",
      system: "🔔",
      idea_mention: "📝",
      funding_update: "📈",
    };
    return icons[type] || "🔔";
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-3 flex-wrap mb-6">
        {[
          { key: "all", label: "All" },
          { key: "comment", label: "Comments" },
          { key: "like", label: "Likes" },
          { key: "follow", label: "Follows" },
          { key: "team_invite", label: "Team Invites" },
          { key: "investment", label: "Investment" },
          { key: "message", label: "Messages" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-[#800080] text-white"
                : "bg-[#f9eaff] text-[#800080] border border-[#d8b4ef] hover:bg-[#f3d9ff]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {loading ? (
        <div className="text-center text-sm text-gray-500">
          Loading notifications...
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`relative flex items-start justify-between p-4 rounded-xl border shadow-sm transition ${
                n.isRead
                  ? "bg-[#fff7fd] border-gray-200"
                  : "bg-[#fdeaff] border-[#e0b3ff]"
              }`}
            >
              <div className="flex items-start gap-4">
                {n.sender?.profilePicture ? (
                  <img
                    src={n.sender.profilePicture}
                    alt={n.sender.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#f3d9ff] flex items-center justify-center text-xl">
                    {getNotificationIcon(n.type)}
                  </div>
                )}
                <div className="flex flex-col text-sm text-gray-700">
                  <span
                    className={
                      n.isRead
                        ? "text-gray-800"
                        : "font-semibold text-[#800080]"
                    }
                  >
                    {n.sender && (
                      <span className="font-semibold">{n.sender.name} </span>
                    )}
                    {n.message}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {n.timeAgo}
                  </span>
                </div>
              </div>

              {/* 3-dot menu */}
              <div className="relative">
                <button
                  className="p-1 text-gray-500 hover:text-[#800080]"
                  onClick={() =>
                    setActiveMenu(activeMenu === n.id ? null : n.id)
                  }
                >
                  <FiMoreHorizontal size={18} />
                </button>

                {activeMenu === n.id && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-10 w-40">
                    {!n.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(n.id)}
                        className="block w-full px-4 py-2 text-sm text-left hover:bg-purple-50 text-gray-700"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {!loading && pagination.hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="border border-[#800080] text-[#800080] px-6 py-2 rounded-full hover:bg-[#f3d9ff] transition text-sm font-medium"
          >
            Load more notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
