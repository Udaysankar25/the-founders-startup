import React, { useState, useEffect } from "react";
import { FiStar } from "react-icons/fi";
import { apiCall } from "../../../utils/api.js";

const getProfilePicUrl = (pic) => {
  if (!pic) return "https://randomuser.me/api/portraits/women/44.jpg";
  if (pic.startsWith("http")) return pic;
  return `http://localhost:5000${pic}`;
};

const ProfileSummary = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile data from backend
  const fetchProfile = async () => {
    try {
      const profileData = await apiCall("/api/founder/profile", "GET");
      setUser(profileData);
      // Update localStorage with fresh data
      localStorage.setItem("user", JSON.stringify(profileData));
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || {});
      } catch {
        setUser({});
      }
    };

    const handleProfileRefresh = () => {
      fetchProfile();
    };

    // Listen for both storage events and custom profile update events
    window.addEventListener("storage", handleStorage);
    window.addEventListener("profileUpdated", handleStorage);
    window.addEventListener("refreshProfileSummary", handleProfileRefresh);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("profileUpdated", handleStorage);
      window.removeEventListener("refreshProfileSummary", handleProfileRefresh);
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-32 mb-5 animate-pulse"></div>
            <div className="flex justify-around w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
        <div className="flex flex-col items-center text-center relative">
          {/* Gradient Ring Avatar */}
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 mb-3 shadow-lg">
            <img
              src={getProfilePicUrl(user.profilePicture)}
              alt={user.name || "Founder"}
              className="w-16 h-16 rounded-full object-cover bg-white"
            />
          </div>

          {/* Info */}
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors duration-200">
            {user.name || "Founder Name"}
          </h3>
          <p className="text-xs text-gray-500 italic">
            {user.headline || "Turning ideas into impact"}
          </p>

          {/* Stats */}
          <div className="flex justify-around w-full mt-5 text-sm text-purple-800 font-semibold">
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">{user.ideasCount ?? 0}</div>
              <span className="text-xs">Ideas</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">{user.teamsCount ?? 0}</div>
              <span className="text-xs">Teams</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold">{user.startupsCount ?? 0}</div>
              <span className="text-xs">Startups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Card */}
      <div className="relative bg-white/60 backdrop-blur-xl border border-purple-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 group">
        <div className="absolute -top-3 -right-3 bg-purple-100 text-primary p-2 rounded-full shadow-md animate-bounce-slow">
          <FiStar className="text-lg" />
        </div>
        <div className="text-center">
          <h4 className="text-sm font-bold text-purple-800 mb-1 uppercase tracking-wide">
            Unlock Premium
          </h4>
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
