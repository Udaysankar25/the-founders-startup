import React, { useState } from 'react';

// --- Tab Form Components ---
const BasicProfileForm = () => (
  <>
    <h2 className="text-2xl font-bold text-purple-700 mb-6">Edit Profile</h2>
    <div className="flex justify-center mb-4">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-purple-300"
      />
    </div>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-purple-700">Name</label>
        <input type="text" defaultValue="Anna Clark" className="input" />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Email</label>
        <input type="email" defaultValue="annaclark@gmail.com" className="input" />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Role</label>
        <select className="input">
          <option>Founder</option>
          <option>Investor</option>
          <option>Mentor</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Headline</label>
        <input type="text" defaultValue="AI Specialist" className="input" />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-purple-700">Short Bio</label>
        <input type="text" placeholder="Type your bio" className="input" />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-purple-700">Account Privacy</label>
        <select className="input">
          <option>Private</option>
          <option>Public</option>
        </select>
      </div>
      <div className="md:col-span-2 flex justify-center">
        <button type="submit" className="btn">Save Changes</button>
      </div>
    </form>
  </>
);

const InterestForm = () => (
  <>
    <h2 className="text-2xl font-bold text-purple-700 mb-6">Areas of Interest</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-purple-700">Areas of Interest</label>
        <input type="text" defaultValue="Anna Clark" className="input" />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Skills</label>
        <input type="text" defaultValue="annaclark@gmail.com" className="input" />
      </div>
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 text-sm text-purple-800 font-medium">
        {[
          'Investors', 'Team members', 'Mentorship', 'Product Feedback',
          'Startup Accelerators', 'Technical Co-founder', 'Design Partner (UI/UX)', 'Beta Testers/Early Users'
        ].map((option, i) => (
          <label key={i} className="flex items-center gap-2">
            <input type="checkbox" className="accent-purple-600" />
            {option}
          </label>
        ))}
      </div>
      <div className="md:col-span-2 flex justify-center mt-6">
        <button type="submit" className="btn">Save Changes</button>
      </div>
    </form>
  </>
);

const SocialLinksForm = () => (
  <>
    <h2 className="text-2xl font-bold text-purple-700 mb-6">Social & Web Links</h2>
    <form className="grid grid-cols-1 gap-4">
      <div>
        <label className="text-sm font-medium text-purple-700">LinkedIn</label>
        <input type="text" defaultValue="Anna Clark" className="input" />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">GitHub / Portfolio</label>
        <input type="text" defaultValue="annaclark@gmail.com" className="input" />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Personal Website (optional)</label>
        <input type="text" className="input" />
      </div>
      <div className="flex justify-center mt-4">
        <button type="submit" className="btn">Save Changes</button>
      </div>
    </form>
  </>
);

// --- Main Profile Component ---
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic': return <BasicProfileForm />;
      case 'interest': return <InterestForm />;
      case 'social': return <SocialLinksForm />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
      {/* Left Tab Menu */}
      <div className="w-full md:w-64 border-r border-purple-100 bg-purple-50">
        {[
          { key: 'basic', label: 'Basic Profiles' },
          { key: 'interest', label: 'Areas of Interest' },
          { key: 'social', label: 'Social & Web Links' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-left px-6 py-4 border-l-4 ${
              activeTab === tab.key
                ? 'border-purple-600 text-purple-700 font-semibold bg-white'
                : 'border-transparent text-gray-700 hover:bg-purple-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right Tab Content */}
      <div className="flex-1 p-6 md:p-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UpdateProfile;
