import React from 'react';

const ProfileSummary = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="Investor"
          className="w-20 h-20 rounded-full border border-purple-300"
        />
        <h2 className="font-semibold text-lg mt-2">John Investor</h2>
        <p className="text-sm text-gray-600">Angel Investor · FinTech & AI</p>
      </div>

      <div className="border-t border-purple-100 pt-3 text-sm">
        <p><strong>158</strong> Connections</p>
        <p><strong>3</strong> Ideas Followed</p>
        <p><strong>$250k</strong> Invested</p>
      </div>
    </div>
  );
};

export default ProfileSummary;
