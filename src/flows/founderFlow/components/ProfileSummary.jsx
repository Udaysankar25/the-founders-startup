import React from 'react';
import { FiStar } from 'react-icons/fi';

const ProfileSummary = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
        <div className="flex flex-col items-center text-center relative">
          {/* Gradient Ring Avatar */}
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 mb-3 shadow-lg">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Anna Clark"
              className="w-16 h-16 rounded-full object-cover bg-white"
            />
          </div>

          {/* Info */}
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors duration-200">Anna Clark</h3>
          <p className="text-xs text-gray-500 italic">“Turning ideas into impact”</p>

          {/* Stats */}
          <div className="flex justify-around w-full mt-5 text-sm text-purple-800 font-semibold">
            {['Ideas', 'Teams', 'Startups'].map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <div className="text-lg font-bold">
                  {[12, 3, 5][i]}
                </div>
                <span className="text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Card */}
      <div className="relative bg-white/60 backdrop-blur-xl border border-purple-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 group">
        <div className="absolute -top-3 -right-3 bg-purple-100 text-primary p-2 rounded-full shadow-md animate-bounce-slow">
          <FiStar className="text-lg" />
        </div>
        <div className="text-center">
          <h4 className="text-sm font-bold text-purple-800 mb-1 uppercase tracking-wide">Unlock Premium</h4>
          <p className="text-sm text-purple-600 mb-4 leading-snug">
            Get featured, gain insights, attract serious investors
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 px-5 rounded-full font-semibold text-sm shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
