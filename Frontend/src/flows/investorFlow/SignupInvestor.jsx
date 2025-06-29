// src/flows/investorFlow/SignupInvestor.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../pages/AuthLayout';

const SignupInvestor = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/investor/account-setup');
  };

  return (
    <AuthLayout
      title="Create your investor account"
      message="Join a network of visionary investors and discover bold ideas."
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Sign Up</h2>

      <form className="space-y-4" onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" className="input" required />
        <input type="email" placeholder="E-mail" className="input" required />
        <input type="password" placeholder="Password" className="input" required />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" required />
            <span>Agree to Terms & Conditions</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-full mt-2">
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignupInvestor;
