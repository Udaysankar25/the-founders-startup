// src/flows/investorFlow/LoginInvestor.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../pages/AuthLayout';

const LoginInvestor = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/investor/account-setup');
  };

  return (
    <AuthLayout
      title="Welcome back, Investor!"
      message="Let’s help you discover game-changing startups and founders."
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Login</h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" className="input" required />
        <input type="password" placeholder="Password" className="input" required />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a href="#" className="text-purple-700 font-medium">
            Forgot password?
          </a>
        </div>

        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-full mt-2">
          Login
        </button>

        <p className="text-sm mt-2">
          Don’t have an account?{' '}
          <a href="/investor/signup" className="text-purple-700 font-medium">
            Sign Up
          </a>
        </p>

        <div className="relative my-4">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-[-10px] transform -translate-x-1/2 bg-[#fceeff] px-2 text-sm text-gray-600">
            or
          </span>
        </div>

        <button className="w-full flex items-center justify-center border py-2 rounded-full gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginInvestor;
