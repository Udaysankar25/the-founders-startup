import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { FiMenu } from 'react-icons/fi';
import logo from '../../../assets/images/main-logo.png';

const Topbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('investorData');
    navigate('/investor/login');
  };

  return (
    <div className="flex justify-between items-center h-[64px] px-4 border-b border-purple-200 bg-white shadow-sm">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger (mobile only) */}
        <button
          className="text-2xl text-purple-700 lg:hidden"
          onClick={onToggleSidebar}
        >
          <FiMenu />
        </button>

        <img
          src={logo}
          alt="The Founders Startup Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Search + Profile Dropdown */}
      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          placeholder="Search startups..."
          className="hidden sm:block px-4 py-2 border border-purple-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <Menu as="div" className="relative">
          <Menu.Button className="focus:outline-none">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Investor Avatar"
              className="w-9 h-9 rounded-full border border-purple-200 cursor-pointer"
            />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-44 bg-white border border-purple-200 rounded-md shadow-lg z-50">
            <div className="py-1 text-sm text-gray-700">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 ${
                      active ? 'bg-purple-100' : ''
                    }`}
                    onClick={() => navigate('profile/edit')}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`w-full text-left px-4 py-2 ${
                      active ? 'bg-purple-100' : ''
                    }`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default Topbar;
