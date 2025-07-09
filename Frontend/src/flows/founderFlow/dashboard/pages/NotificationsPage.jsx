import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      // Simulated API response
      const mockData = [
        {
          id: 1,
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
          name: 'Jason Lee',
          message: 'commented on your idea',
          detail: 'Love this! Let’s talk funding.',
          time: '2h ago',
          read: false,
        },
        {
          id: 2,
          avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
          name: 'Sara Thomas',
          message: 'invited you to join her team',
          time: '1 day ago',
          read: false,
        },
        {
          id: 3,
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          name: 'David N.',
          message: 'started following you.',
          time: '3 days ago',
          read: true,
        },
        {
          id: 4,
          icon: '💰',
          message: 'Your idea “Pitch Deck AI” received a new investment.',
          time: '5 days ago',
          read: true,
        },
        {
          id: 5,
          icon: '👀',
          message: '1 person viewed your profile. See full view list',
          time: '5 days ago',
          read: false,
        },
        {
          id: 6,
          avatar: 'https://randomuser.me/api/portraits/women/47.jpg',
          name: 'System update:',
          message: '“New premium feature unlocked”',
          time: '6 days ago',
          read: true,
        },
      ];

      setNotifications(mockData);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setActiveMenu(null);
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setActiveMenu(null);
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-3 flex-wrap mb-6">
        {['All', 'Mentions', 'My Posts', 'Comments', 'Investment'].map((tab) => (
          <button
            key={tab}
            className="px-4 py-2 rounded-full bg-[#f9eaff] text-[#800080] border border-[#d8b4ef] text-sm font-medium hover:bg-[#f3d9ff] transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {loading ? (
        <div className="text-center text-sm text-gray-500">Loading notifications...</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`relative flex items-start justify-between p-4 rounded-xl border shadow-sm transition ${
                n.read
                  ? 'bg-[#fff7fd] border-gray-200'
                  : 'bg-[#fdeaff] border-[#e0b3ff]'
              }`}
            >
              <div className="flex items-start gap-4">
                {n.avatar ? (
                  <img src={n.avatar} alt={n.name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#f3d9ff] flex items-center justify-center text-xl">
                    {n.icon}
                  </div>
                )}
                <div className="flex flex-col text-sm text-gray-700">
                  <span className={n.read ? 'text-gray-800' : 'font-semibold text-[#800080]'}>
                    <span className={n.name ? 'font-semibold' : ''}>{n.name} </span>
                    {n.message}
                    {n.detail && (
                      <span className="text-gray-500"> — {n.detail}</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">{n.time}</span>
                </div>
              </div>

              {/* 3-dot menu */}
              <div className="relative">
                <button
                  className="p-1 text-gray-500 hover:text-[#800080]"
                  onClick={() => setActiveMenu(activeMenu === n.id ? null : n.id)}
                >
                  <FiMoreHorizontal size={18} />
                </button>

                {activeMenu === n.id && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md z-10 w-40">
                    {!n.read && (
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
      {!loading && (
        <div className="text-center mt-8">
          <button className="border border-[#800080] text-[#800080] px-6 py-2 rounded-full hover:bg-[#f3d9ff] transition text-sm font-medium">
            View more notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
