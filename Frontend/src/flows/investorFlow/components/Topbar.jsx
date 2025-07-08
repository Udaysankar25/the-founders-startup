import React from 'react';
import logo from '../../../assets/images/main-logo.png'; // adjust path as needed

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-[72px] px-6 border-b border-purple-200 bg-white shadow-sm">
      {/* Logo */}
      <img
        src={logo}
        alt="The Founders Startup Logo"
        className="h-20 w-auto object-contain"
      />

      {/* Search + Profile */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search startups..."
          className="px-4 py-2 border border-purple-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="Investor Avatar"
          className="w-9 h-9 rounded-full border border-purple-200"
        />
      </div>
    </div>
  );
};

export default Topbar;
