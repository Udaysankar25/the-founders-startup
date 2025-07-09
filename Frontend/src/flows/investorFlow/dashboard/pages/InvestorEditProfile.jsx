import React, { useState } from 'react';

const InvestorEditProfile = () => {
  const [selectedTab, setSelectedTab] = useState('Basic Profiles');
  const [formData, setFormData] = useState({
    name: 'Anna Clark',
    email: 'annaclark@gmail.com',
    role: 'Founder',
    headline: '',
    shortBio: '',
    accountPrivacy: 'Private',
    investmentRange: 50000,
    investmentCategories: ['AI', 'EdTech', 'Health'],
    lookingFor: [],
    linkedin: '',
    angellist: '',
    website: '',
  });

  const categoriesList = ['AI', 'EdTech', 'Health', 'FinTech', 'GreenTech'];
  const lookingForOptions = [
    'Investors',
    'Team members',
    'Mentorship',
    'Product Feedback',
    'Startup Accelerators',
    'Technical Co-founder',
    'Design Partner (UI/UX)',
    'Beta Testers/Early Users',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => {
      const exists = prev.investmentCategories.includes(category);
      return {
        ...prev,
        investmentCategories: exists
          ? prev.investmentCategories.filter((cat) => cat !== category)
          : [...prev.investmentCategories, category],
      };
    });
  };

  const handleLookingForToggle = (option) => {
    setFormData((prev) => {
      const exists = prev.lookingFor.includes(option);
      return {
        ...prev,
        lookingFor: exists
          ? prev.lookingFor.filter((item) => item !== option)
          : [...prev.lookingFor, option],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 p-4 md:p-8 bg-white rounded-lg shadow-md space-y-6 md:space-y-0 md:space-x-10">
      {/* Sidebar */}
      <div className="md:w-1/4 border-r">
        {['Basic Profiles', 'Investor preferences', 'Social & Web Links'].map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`p-4 cursor-pointer font-medium ${
              selectedTab === tab
                ? 'border-l-4 bg-purple-50'
                : 'text-gray-700'
            }`}
            style={{
              color: selectedTab === tab ? '#800080' : '',
              borderColor: selectedTab === tab ? '#800080' : '',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="md:w-3/4">
        {/* ----------------- Basic Profiles ----------------- */}
        {selectedTab === 'Basic Profiles' && (
          <>
            <h2 className="text-2xl font-bold text-center" style={{ color: '#800080' }}>
              Edit Profile
            </h2>
            <div className="flex justify-center my-6">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4"
                style={{ borderColor: '#800080' }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: '#800080' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full mt-1 border rounded px-3 py-2"
                    style={{ borderColor: '#800080' }}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: '#800080' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full mt-1 border rounded px-3 py-2"
                    style={{ borderColor: '#800080' }}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: '#800080' }}>
                    Role
                  </label>
                  <select
                    name="role"
                    className="w-full mt-1 border rounded px-3 py-2"
                    style={{ borderColor: '#800080' }}
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option>Founder</option>
                    <option>Investor</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: '#800080' }}>
                    Headline
                  </label>
                  <input
                    type="text"
                    name="headline"
                    className="w-full mt-1 border rounded px-3 py-2"
                    style={{ borderColor: '#800080' }}
                    value={formData.headline}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium" style={{ color: '#800080' }}>
                    Short Bio
                  </label>
                  <textarea
                    name="shortBio"
                    rows={3}
                    className="w-full mt-1 border rounded px-3 py-2"
                    style={{ borderColor: '#800080' }}
                    value={formData.shortBio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-medium" style={{ color: '#800080' }}>
                    Account Privacy
                  </label>
                  <select
                    name="accountPrivacy"
                    className="w-full mt-1 border rounded px-3 py-2"
                    style={{ borderColor: '#800080' }}
                    value={formData.accountPrivacy}
                    onChange={handleInputChange}
                  >
                    <option>Private</option>
                    <option>Public</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white py-2 rounded"
                style={{ backgroundColor: '#800080' }}
              >
                Save Changes
              </button>
            </form>
          </>
        )}

        {/* ----------------- Investor Preferences ----------------- */}
        {selectedTab === 'Investor preferences' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold text-center" style={{ color: '#800080' }}>
              Investor Preferences
            </h3>

            <div>
              <label className="text-sm font-medium" style={{ color: '#800080' }}>
                Investment Categories
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categoriesList.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      formData.investmentCategories.includes(cat)
                        ? 'bg-[#8000801A] text-[#800080] border-[#800080]'
                        : 'bg-white text-gray-500 border-gray-300'
                    }`}
                  >
                    #{cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium" style={{ color: '#800080' }}>
                Investment Range
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                value={formData.investmentRange}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: 'investmentRange', value: e.target.value },
                  })
                }
                className="w-full mt-2 accent-[#800080]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹1K</span>
                <span>₹{parseInt(formData.investmentRange).toLocaleString()}</span>
                <span>₹100K+</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2" style={{ color: '#800080' }}>
                Looking for
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm" style={{ color: '#800080' }}>
                {lookingForOptions.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.lookingFor.includes(item)}
                      onChange={() => handleLookingForToggle(item)}
                      className="accent-[#800080]"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2 rounded"
              style={{ backgroundColor: '#800080' }}
            >
              Save Changes
            </button>
          </form>
        )}

        {/* ----------------- Social & Web Links ----------------- */}
        {selectedTab === 'Social & Web Links' && (
          <>
            <h3 className="text-2xl font-semibold text-center mb-6" style={{ color: '#800080' }}>
              Social & Web Links
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium" style={{ color: '#800080' }}>
                  Linkedin
                </label>
                <input
                  type="text"
                  name="linkedin"
                  className="w-full border rounded px-3 py-2 mt-1"
                  style={{ borderColor: '#800080' }}
                  placeholder="Anna Clark"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: '#800080' }}>
                  Angellist / Portfolio
                </label>
                <input
                  type="text"
                  name="angellist"
                  className="w-full border rounded px-3 py-2 mt-1"
                  style={{ borderColor: '#800080' }}
                  placeholder="annaclark@gmail.com"
                  value={formData.angellist}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium" style={{ color: '#800080' }}>
                  Personal Website <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  name="website"
                  className="w-full border rounded px-3 py-2 mt-1"
                  style={{ borderColor: '#800080' }}
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white py-2 rounded"
                style={{ backgroundColor: '#800080' }}
              >
                Save Changes
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorEditProfile;
