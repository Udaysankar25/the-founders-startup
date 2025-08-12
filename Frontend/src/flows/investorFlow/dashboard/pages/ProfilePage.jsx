import React, { useRef, useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiEdit3, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const tabs = ['Overview', 'Investments', 'Saved Ideas'];

const InvestorDashboard = () => {
  const [fundingRange, setFundingRange] = useState(60000);
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const avatarRef = useRef();
  const coverRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(URL.createObjectURL(file));
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
            onClick={() => coverRef.current.click()}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            title="Change cover"
          >
            📸
          </button>
        </div>

        {/* Avatar + Info */}
        <div className="flex flex-col items-center -mt-20">
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              ref={avatarRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
            <div
              onClick={() => avatarRef.current.click()}
              className="w-32 h-32 bg-white border-4 border-white rounded-full overflow-hidden shadow-lg cursor-pointer"
            >
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-3xl">
                  👤
                </div>
              )}
            </div>
            <FiEdit3 className="absolute bottom-2 right-2 bg-purple-600 text-white p-1 rounded-full text-xs" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mt-4">John Doe</h1>
          <span className="mt-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Highly Active</span>
          <p className="text-center text-sm text-gray-600 italic mt-2 max-w-xl">
            “Fueling innovation through capital and mentorship in emerging tech and sustainability.”
          </p>

          <div className="flex justify-center gap-8 mt-6 text-sm text-gray-700">
            <div className="text-center">
              <div className="text-xl font-bold text-purple-700">158</div>
              <div>Connections</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-700">3</div>
              <div>Ideas Followed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-700">₹250k</div>
              <div>Funds Invested</div>
            </div>
          </div>
        </div>
      </motion.div>


      {/* ------------ Tabs ------------ */}
      <Tab.Group>
        <Tab.List className="flex space-x-4 border-b mb-8 text-sm font-medium">
          {tabs.map((tab) => (
            <Tab key={tab} className={({ selected }) =>
              classNames(
                'py-2 px-4 rounded-t-lg transition-all',
                selected
                  ? 'bg-purple-100 text-purple-800 font-semibold'
                  : 'text-gray-600 hover:bg-purple-50'
              )
            }>
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* ---------- Overview Tab ---------- */}
          <Tab.Panel>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-bold text-purple-800 mb-2">About Me</h3>
                  <p className="text-sm text-gray-700">
                    I invest in student-led ventures solving real problems through AI, sustainability, and education.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-bold text-purple-800 mb-2">Expertise</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Market Analysis</li>
                    <li>Early-Stage Investing</li>
                    <li>Startup Mentorship</li>
                    <li>Financial Modeling</li>
                    <li>Exit Strategy</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-bold text-purple-800 mb-2">Investment Focus</h3>
                  <p className="text-sm text-gray-700">
                    Focused on scalable startups with social impact in education, sustainability, and AI.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-bold text-purple-800 mb-4">Funding Range</h3>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    value={fundingRange}
                    onChange={(e) => setFundingRange(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1K</span>
                    <span>{`₹${fundingRange.toLocaleString()}`}</span>
                    <span>₹100K+</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold text-purple-800 mb-4">Recent Activity</h3>
                <ul className="text-sm text-gray-700 space-y-3">
                  <li>🔗 Connected with Nicole Patel (Founder of EcoMap)</li>
                  <li>📄 Viewed 5 pitch decks this week</li>
                  <li>⭐ Added “NavFlow” to Watchlist</li>
                  <li>💸 Closed a deal with BudgetBuddy (₹100K+)</li>
                </ul>
              </div>
            </motion.div>
          </Tab.Panel>

          {/* ---------- Investments Tab ---------- */}
          <Tab.Panel>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold text-purple-800 mb-4">Your Investments</h3>
                <div className="space-y-4 text-sm">
                  {investments.map((inv) => (
                    <div
                      key={inv.name}
                      className="flex justify-between items-center border-b pb-2 last:border-none"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-800">{inv.name}</h4>
                        <p className="text-xs text-gray-500">
                          ₹{inv.amount.toLocaleString()} – {inv.stage} Stage – Industry: {inv.industry}
                        </p>
                      </div>
                      <span className={classNames(
                        'text-xs font-semibold px-2 py-1 rounded-full',
                        inv.status === 'Active' && 'bg-green-100 text-green-700',
                        inv.status === 'Exited' && 'bg-red-100 text-red-600',
                        inv.status === 'Pending' && 'bg-yellow-100 text-yellow-700'
                      )}>
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tab.Panel>

          {/* ---------- Saved Ideas Tab ---------- */}
          <Tab.Panel>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-purple-800">Saved Ideas</h3>
                  <div className="text-sm text-gray-500 space-x-3">
                    <button className="text-purple-700 hover:underline">All</button>
                    <button className="hover:underline">Pitches</button>
                    <button className="hover:underline">Investment</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {savedIdeas.map((idea) => (
                    <div key={idea.name} className="flex justify-between items-center border-b pb-3 last:border-none">
                      <div>
                        <h4 className="text-gray-800 font-semibold">{idea.name}</h4>
                        <p className="text-xs text-gray-500">
                          {idea.industry} · {idea.founder}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {idea.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200">Messages</button>
                        <button className="text-sm px-3 py-1 rounded-full bg-purple-700 text-white hover:bg-purple-800">Invest</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default InvestorDashboard;
