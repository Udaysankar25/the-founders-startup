import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../pages/AuthLayout';
import { FaArrowRight, FaUserCircle } from 'react-icons/fa';
import { FiEdit2 } from 'react-icons/fi';

const InvestorAbout = () => {
  const navigate = useNavigate();

  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    // TODO: Validate and save data, then navigate
    navigate('/investor/onboarding/step-2'); // Navigate to next step
  };

  return (
    <AuthLayout
      title="About You"
      message="Who are you as an investor? Tell founders what you stand for."
    >
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">About You</h2>

        <form className="space-y-5" onSubmit={handleNext}>
          {/* Profile Picture Placeholder */}
          <div className="flex justify-center relative">
            <FaUserCircle className="text-purple-500 text-6xl" />
            <FiEdit2 className="absolute bottom-0 right-[42%] text-purple-600 text-sm bg-white rounded-full p-1 border border-purple-300" />
          </div>

          {/* Headline Input */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-purple-800">Headline</label>
            <input
              type="text"
              placeholder='(e.g., “AI Engineer | Building EdTech Solutions”)'
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Short Bio Input */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-purple-800">
              Short Bio <span className="text-xs text-gray-500">(max 250 characters)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={250}
              className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
              required
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-purple-700 font-medium"
            >
              Back
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-800 transition-colors"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default InvestorAbout;
