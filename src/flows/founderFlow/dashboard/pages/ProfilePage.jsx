import React, { useState, useRef } from 'react';
import {
  FiThumbsUp,
  FiMessageCircle,
  FiShare2,
  FiTrendingUp
} from 'react-icons/fi';
import { FaThumbsUp } from 'react-icons/fa';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const [liked, setLiked] = useState({});
  const avatarInputRef = useRef();
  const bgInputRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) setBgImage(URL.createObjectURL(file));
  };

  const toggleLike = (idx) => {
    setLiked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleShare = () => {
    alert('Shared!');
  };

  const ActionButton = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1 font-medium text-gray-500 hover:text-purple-600 transition"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );

  const mockIdeas = [
    {
      title: 'Pitch Deck AI',
      description: 'Auto-generate pitch decks tailored to investors.',
      tags: ['AI', 'StartupTools'],
      timeAgo: '2 hours ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEyFJe21gTuIRWSG9GFUkAfKZinNITpLtldQ&s',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwZ4x8MnwdIGWxzXOeo9VROZLVAqiYY2-MQ&s',
      },
    },
    {
      title: 'Startup Vault',
      description: 'Securely document, timestamp, and validate startup ideas.',
      tags: ['Security', 'Founders'],
      timeAgo: '1 week ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4c1y_7gy2crn2Ll_ZSWzcqb0WDZFuBnFTeQ&s',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_O_FmLwtxhqhCfThJBk3_aZR1Vl6r1NCGA&s',
      },
    },
    {
      title: 'CoFounder Connect',
      description: 'Find cofounders who share your vision and complement your skills.',
      tags: ['Matching', 'Networking'],
      timeAgo: '3 days ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUIAcXgRaNDVvwWAkLcM5twP2KbyCMjPaqg&s',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUT8AUnmycKnS1gZjEb7XTCx-mDAB_zGrrSQ&s',
      },
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans space-y-8">
      {/* Header */}
      <div className="rounded-xl shadow-md bg-white overflow-hidden">
        <div
          className="relative min-h-[220px] flex items-end text-white bg-cover bg-center"
          style={{
            backgroundImage: bgImage
              ? `url(${bgImage})`
              : 'linear-gradient(to right, #fb923c, #8b5cf6)',
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

          <button
            onClick={() => bgInputRef.current.click()}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            title="Change background"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 4a3 3 0 100 6 3 3 0 000-6z"
              />
            </svg>
          </button>
          <input type="file" accept="image/*" ref={bgInputRef} onChange={handleBgChange} className="hidden" />

          <div className="relative z-10 w-full flex items-end gap-6 p-6 sm:p-8">
            <label className="cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md group-hover:shadow-xl transition">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a4 4 0 100-8 4 4 0 000 8zm0 2c-3.315 0-6 2.239-6 5v1h12v-1c0-2.761-2.685-5-6-5z" />
                    </svg>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" ref={avatarInputRef} onChange={handleAvatarChange} className="hidden" />
            </label>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold">Anna Clark</h2>
              <p className="italic text-sm text-gray-200 mt-1">“Turning ideas into impact”</p>
              <div className="flex gap-6 mt-4 text-sm">
                <div><span className="block font-semibold text-white text-lg">12</span><span className="text-gray-300">Ideas</span></div>
                <div><span className="block font-semibold text-white text-lg">3</span><span className="text-gray-300">Teams</span></div>
                <div><span className="block font-semibold text-white text-lg">5</span><span className="text-gray-300">Startups</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas */}
      <div className="rounded-xl shadow-md bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Your Ideas</h3>
            <p className="text-sm text-gray-500">All the concepts you're nurturing</p>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Idea
          </button>
        </div>

        {/* Scrollable Cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>

          {mockIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-xs bg-gray-50 rounded-xl shadow hover:shadow-lg transition snap-start flex-shrink-0 flex flex-col"
            >
              <div className="h-40 overflow-hidden rounded-t-xl">
                <img
                  src={idea.coverImage}
                  alt={idea.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={idea.user.avatar}
                    alt={idea.user.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{idea.user.name}</div>
                    <div className="text-xs text-gray-500">{idea.timeAgo}</div>
                  </div>
                </div>

                <h4 className="font-semibold text-base text-gray-900 mb-1">{idea.title}</h4>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{idea.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto mb-3">
                  {idea.tags.map((tag, i) => (
                    <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs shadow-sm">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-purple-100 text-sm">
                  <button
                    onClick={() => toggleLike(idx)}
                    className="flex items-center gap-1 font-medium text-gray-500 hover:text-purple-600 transition"
                  >
                    <span className="text-lg transition-transform hover:scale-110">
                      {liked[idx] ? <FaThumbsUp /> : <FiThumbsUp />}
                    </span>
                    Like
                  </button>

                  <ActionButton icon={<FiMessageCircle />} label="Comment" />
                  <ActionButton icon={<FiShare2 />} label="Share" onClick={handleShare} />
                  <ActionButton icon={<FiTrendingUp />} label="Invest" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
