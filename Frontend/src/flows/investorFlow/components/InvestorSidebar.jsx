import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiMessageCircle,
  FiBell,
  FiUser
} from 'react-icons/fi';

const InvestorSidebar = () => {
  const menu = [
    { icon: <FiHome />, label: 'Home', path: '' },
    { icon: <FiUsers />, label: 'Teams', path: 'teams' },
    { icon: <FiMessageCircle />, label: 'Messages', path: 'messages' },
    { icon: <FiBell />, label: 'Notifications', path: 'notifications' },
    { icon: <FiUser />, label: 'Profile', path: 'profile' },
  ];

  return (
    <aside className="w-[80px] bg-card py-6 mt-[64px] flex flex-col items-center gap-6 shadow-inner fixed top-0 left-0 h-screen z-30">
      {menu.map((item, idx) => (
        <NavLink
          key={idx}
          to={`/investor/dashboard/${item.path}`}
          end={item.path === ''}
          className={({ isActive }) =>
            `group relative flex items-center justify-center text-[22px] w-10 h-10 ${
              isActive ? 'text-primary font-bold' : 'text-primary/70 hover:text-primary'
            }`
          }
          title={item.label}
        >
          {item.icon}
          <span className="absolute left-12 bg-primary text-white text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            {item.label}
          </span>
        </NavLink>
      ))}
    </aside>
  );
};

export default InvestorSidebar;
