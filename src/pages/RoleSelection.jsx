import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/main-logo.png';
import founderIcon from '../assets/images/founder-icon.png';
import investorIcon from '../assets/images/investor-icon.png';

const RoleSelection = () => {
  const navigate = useNavigate();

 const handleSelect = (role) => {
  const url = `${window.location.origin}/${role}/login`;
  window.open(url, '_blank');
};


  return (
    <div className="min-h-screen bg-[#fceeff] flex flex-col items-center justify-center px-4 text-center">
      <img src={logo} alt="The Founders Startup Logo" className="w-40 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
        Welcome to The Founders Startup
      </h1>
      <p className="text-md md:text-lg text-purple-700 mb-10 max-w-xl">
        Connect with student innovators and real investors. Pitch your idea or discover the next big thing!
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Founder Card */}
        <div
          onClick={() => handleSelect('founder')}
          className="cursor-pointer w-42 rounded-xl p-[2px] bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 shadow-lg hover:scale-105 transition"
        >
          <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center h-full">
            <img src={founderIcon} alt="Founder Icon" className="w-12 h-12 mb-4" />
            <span className="text-lg font-semibold text-gray-800">As a Founder</span>
          </div>
        </div>

        {/* Investor Card */}
        <div
          onClick={() => handleSelect('investor')}
          className="cursor-pointer w-42 rounded-xl p-[2px] bg-gradient-to-br from-green-500 via-yellow-400 to-purple-500 shadow-lg hover:scale-105 transition"
        >
          <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center h-full">
            <img src={investorIcon} alt="Investor Icon" className="w-12 h-12 mb-4" />
            <span className="text-lg font-semibold text-gray-800">As an Investor</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
