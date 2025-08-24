import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { FiEdit3, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const tabs = ['Overview', 'Investments', 'Saved Ideas'];

const InvestorDashboard = () => {
  const [fundingRange, setFundingRange] = useState(60000);
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  
  const navigate = useNavigate();
  const avatarRef = useRef();
  const coverRef = useRef();

  // Mock connections data
  const userFollowers = [
    {
      id: 1,
      name: "Swathi",
      type: "Founder",
      status: "Building innovative health tech solutions",
      profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
      isFollowing: true,
    },
    {
      id: 2,
      name: "Ravi",
      type: "Investor",
      status: "Investing in next-gen AI startups",
      profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
      isFollowing: false,
    },
  ];

  const userFollowing = [
    {
      id: 3,
      name: "Priya",
      type: "Founder",
      status: "Revolutionizing logistics with AI",
      profilePicture: "https://randomuser.me/api/portraits/women/32.jpg",
      isFollowing: true,
    },
    {
      id: 4,
      name: "Alex",
      type: "Investor",
      status: "Focus on sustainable tech investments",
      profilePicture: "https://randomuser.me/api/portraits/men/45.jpg",
      isFollowing: true,
    },
  ];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  // Navigation handlers
  const handleShowFollowers = () => {
    // Navigate to a followers page or show in a different way
    navigate('/investor/dashboard/connections?type=followers');
  };
  
  const handleShowFollowing = () => {
    // Navigate to a following page or show in a different way
    navigate('/investor/dashboard/connections?type=following');
  };
  
  const handleStartChat = (user) => {
    // Navigate to messages page with this user
    navigate(`/investor/dashboard/messages?user=${user.id}&name=${user.name}`);
  };

  const investments = [
    {
      name: 'EcoMap',
      amount: 25000,
      stage: 'Seed',
      industry: 'Sustainability',
      status: 'Active',
    },
    {
      name: 'BudgetBuddy',
      amount: 10000,
      stage: 'Pre-seed',
      industry: 'FinTech',
      status: 'Active',
    },
    {
      name: 'ShopSavvy',
      amount: 50000,
      stage: 'Seed',
      industry: 'E-commerce',
      status: 'Exited',
    },
    {
      name: 'NavFlow',
      amount: 15000,
      stage: 'Due Diligence',
      industry: 'Logistics',
      status: 'Pending',
    },
  ];

  const savedIdeas = [
    {
      name: 'NavFlow',
      industry: 'Logistics',
      founder: 'Priya Mehta',
      tags: ['logistics', 'AI', 'SupplyChain'],
    },
    {
      name: 'MentorLoop',
      industry: 'Education',
      founder: 'Nicole Patel',
      tags: ['mentorship', 'HRTech', 'Education'],
    },
    {
      name: 'GreenHive',
      industry: 'AgriTech',
      founder: 'Jason Lee',
      tags: ['AgTech', 'Green', 'SmartFarming'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-10">
      {/* ------------ New Profile Header (Professional Layout) ------------ */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cover Upload */}
        <div className="relative h-44 rounded-xl overflow-hidden mb-20 bg-gradient-to-r from-purple-600 to-pink-500">
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={coverRef}
            onChange={handleCoverChange}
            className="hidden"
          />
          <button
            onClick={() => coverRef.current?.click()}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
          >
            Change Cover
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="absolute top-32 left-6">
          <div className="relative">
            <img
              src={avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <input
              type="file"
              accept="image/*"
              ref={avatarRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-all shadow-lg"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="ml-40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Alex Johnson</h1>
              <p className="text-lg text-gray-600">Angel Investor & Startup Mentor</p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2">
              <FiEdit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-4">
            {/* Followers */}
            <div
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handleShowFollowers}
            >
              <span className="text-2xl font-bold text-purple-900">
                {userFollowers.length}
              </span>
              <span className="text-sm text-purple-700">Followers</span>
            </div>

            {/* Following */}
            <div
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handleShowFollowing}
            >
              <span className="text-2xl font-bold text-purple-900">
                {userFollowing.length}
              </span>
              <span className="text-sm text-purple-700">Following</span>
            </div>

            {/* Investments */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-900">
                {investments.length}
              </span>
              <span className="text-sm text-purple-700">Investments</span>
            </div>

            {/* Portfolio Value */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-purple-900">
                ₹1.2M
              </span>
              <span className="text-sm text-purple-700">Portfolio Value</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ------------ Tabs Section ------------ */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-purple-50 p-1 mb-6">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-purple-700 shadow'
                      : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-800'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {/* Overview Tab */}
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Passionate angel investor with 8+ years of experience in early-stage startups. 
                    Focus on FinTech, HealthTech, and AI sectors. Committed to supporting founders 
                    who are building solutions for tomorrow's challenges.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Focus</h3>
                  <div className="flex flex-wrap gap-2">
                    {['FinTech', 'HealthTech', 'AI/ML', 'SaaS', 'Sustainability'].map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">₹10K - ₹1M</span>
                      <span className="text-purple-600 font-semibold">₹{fundingRange.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={fundingRange}
                      onChange={(e) => setFundingRange(Number(e.target.value))}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>

            {/* Investments Tab */}
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="space-y-4">
                {investments.map((investment, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{investment.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        investment.status === 'Active' ? 'bg-green-100 text-green-800' :
                        investment.status === 'Exited' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {investment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Amount:</span> ₹{investment.amount.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Stage:</span> {investment.stage}
                      </div>
                      <div>
                        <span className="font-medium">Industry:</span> {investment.industry}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>

            {/* Saved Ideas Tab */}
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div className="space-y-4">
                {savedIdeas.map((idea, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{idea.name}</h4>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Industry:</span> {idea.industry}
                      </div>
                      <div>
                        <span className="font-medium">Founder:</span> {idea.founder}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {idea.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </div>
  );
};

export default InvestorDashboard;
