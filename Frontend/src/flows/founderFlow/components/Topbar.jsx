import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import logo from '../../../../src/assets/images/main-logo.png';

const Topbar = ({ onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/founder/login');
  };

  const handleProfile = () => {
    navigate('profile/edit');
  };

  return (
    <div className="flex justify-between items-center h-[72px] px-4 md:px-6 border-b border-purple-200 bg-white shadow-sm relative">
      {/* Hamburger menu for mobile */}
      <div className="md:hidden">
        <button onClick={onToggleSidebar} className="text-purple-700">
          <FiMenu size={24} />
        </button>
      </div>

      {/* Logo */}
      <img src={logo} alt="The Founders Startup Logo" className="h-12 md:h-16 w-auto object-contain" />

      {/* Right Menu */}
      <div className="flex items-center gap-3 md:gap-4 relative" ref={menuRef}>
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-2 border border-purple-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full border border-purple-200 cursor-pointer"
          onClick={() => setIsMenuOpen(prev => !prev)}
        />

        {isMenuOpen && (
          <div className="absolute right-0 top-16 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">Anna Clark</p>
              <p className="text-xs text-gray-500">annaclark@gmail.com</p>
            </div>
            <ul className="py-2">
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  onClick={handleProfile}
                >
                  View Profile
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
