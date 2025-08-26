import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUsers, FiPlus, FiMessageCircle, FiBell, FiUser, FiX
} from 'react-icons/fi';
import IdeaModal from '../../founderFlow/dashboard/pages/IdeaModal';

const Sidebar = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = React.useState(false);

  const menu = [
    { icon: <FiHome />, label: 'Home', path: '' },
    { icon: <FiUsers />, label: 'Teams', path: 'teams' },
    {
      icon: <FiPlus />, label: 'Create', path: '#',
      onClick: () => setShowModal(true),
    },
    { icon: <FiMessageCircle />, label: 'Messages', path: 'messages' },
    { icon: <FiBell />, label: 'Notifications', path: 'notifications' },
    { icon: <FiUser />, label: 'Profile', path: 'profile' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[80px] bg-[#f4eaff] py-6 flex-col items-center gap-6 shadow-inner fixed top-[72px] left-0 h-[calc(100vh-72px)] z-30">
        {menu.map((item, idx) =>
          item.path === '#' ? (
            <button
              key={idx}
              onClick={item.onClick}
              className="text-[22px] text-primary/70 hover:text-primary transition"
            >
              {item.icon}
            </button>
          ) : (
            <NavLink
              key={idx}
              to={`/founder/dashboard/${item.path}`}
              end={item.path === ''}
              className={({ isActive }) =>
                `text-[22px] ${
                  isActive ? 'text-primary font-bold' : 'text-primary/70 hover:text-primary'
                }`
              }
              title={item.label}
            >
              {item.icon}
            </NavLink>
          )
        )}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden">
          <div className="bg-white w-64 h-full shadow-xl p-6 relative z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
              <FiX size={22} />
            </button>
            <div className="flex flex-col gap-5 mt-10">
              {menu.map((item, idx) =>
                item.path === '#' ? (
                  <button
                    key={idx}
                    onClick={() => {
                      item.onClick();
                      onClose();
                    }}
                    className="flex items-center gap-3 text-lg text-primary"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    key={idx}
                    to={`/founder/dashboard/${item.path}`}
                    className="flex items-center gap-3 text-lg text-primary"
                    onClick={onClose}
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <IdeaModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Sidebar;