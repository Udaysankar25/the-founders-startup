import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiPlus, FiMessageCircle, FiBell, FiUser, FiX } from 'react-icons/fi';
import IdeaModal from '../dashboard/pages/IdeaModal'; // adjust path if needed

const InvestorSidebar = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = React.useState(false);

  const menu = [
    { icon: <FiHome />, label: 'Home', path: '' },
    { icon: <FiUsers />, label: 'Teams', path: 'teams' },
    { icon: <FiMessageCircle />, label: 'Messages', path: 'messages' },
    { icon: <FiBell />, label: 'Notifications', path: 'notifications' },
    { icon: <FiUser />, label: 'Profile', path: 'profile' },
  ];

  return (
    <>
      {/* ---------- Desktop sidebar (hidden on small screens) ---------- */}
     <aside
  className="hidden sm:flex w-[80px] bg-[#f4eaff] py-6 flex-col items-center gap-6 shadow-inner
             fixed top-[64px] left-0 h-[calc(100vh-64px)] z-40"
>

        {/* optional logo / top icon */}
        <div className="w-full flex items-center justify-center mb-1">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <FiHome className="text-primary" />
          </div>
        </div>

        <nav className="flex flex-col items-center gap-3 mt-2">
          {menu.map((m, i) => (
            <NavLink
              key={i}
              to={`/investor/dashboard/${m.path}`}
              end={m.path === ''}
              className={({ isActive }) =>
                `w-12 h-12 rounded-lg flex items-center justify-center transition
                 ${isActive ? 'bg-white text-primary shadow-md' : 'text-primary/70 hover:bg-white/60'}`
              }
              title={m.label}
            >
              {m.icon}
            </NavLink>
          ))}

          {/* Create button (local modal) */}
          <button
            onClick={() => setShowModal(true)}
            className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm mt-2"
            title="Create"
          >
            <FiPlus />
          </button>
        </nav>

        <div className="flex-1" />

        <div className="pb-2">
          <NavLink to="/investor/dashboard/profile" title="Profile">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </NavLink>
        </div>
      </aside>

      {/* ---------- Mobile drawer (only visible under md) ---------- */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        aria-hidden={!isOpen}
      >
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />

        {/* sliding panel */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-64 bg-white p-6 shadow-xl transform transition-transform
                      ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
            <FiX size={20} />
          </button>

          <nav className="flex flex-col gap-4 mt-8">
            {menu.map((m, i) => (
              <NavLink
                key={i}
                to={`/investor/dashboard/${m.path}`}
                onClick={onClose}
                className="flex items-center gap-3 text-lg text-primary"
              >
                {m.icon}
                <span>{m.label}</span>
              </NavLink>
            ))}

            <button
              onClick={() => {
                setShowModal(true);
                onClose();
              }}
              className="flex items-center gap-3 text-lg text-primary mt-4"
            >
              <FiPlus />
              Create
            </button>
          </nav>
        </div>
      </div>

      {/* modal */}
      <IdeaModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default InvestorSidebar;
