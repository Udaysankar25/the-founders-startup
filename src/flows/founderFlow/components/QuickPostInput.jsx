import React from 'react';

const QuickPostInput = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder="Post your ideas!"
          className="flex-1 border border-purple-200 px-4 py-2 rounded-full"
        />
      </div>
      <div className="flex gap-4 text-sm text-purple-600 mt-3 ml-12">
        <button>🎤 asdfghjk</button>
        <button>📹 Video</button>
        <button>🖼️ Image</button>
      </div>
    </div>
  );
};

export default QuickPostInput;
