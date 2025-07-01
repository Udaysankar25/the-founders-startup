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
      title="Welcome back!"
      message="Let’s build your next big thing."
    >
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#800080] mb-6 text-center">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
              required
            />
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <span
              onClick={() => navigate('/investor/forgot-password')}
              className="text-[#800080] font-medium cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#800080] hover:bg-purple-900 text-white font-semibold py-2 rounded-full transition-colors"
          >
            Login
          </button>

          {/* Signup Redirect */}
          <p className="text-sm text-center mt-2">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/investor/signup')}
              className="text-[#800080] font-medium cursor-pointer"
            >
              Sign Up
            </span>
          </p>

          {/* Divider */}
          <div className="relative my-4">
            <hr className="border-gray-300" />
            <span className="absolute left-1/2 top-[-10px] transform -translate-x-1/2 bg-[#fceeff] px-2 text-sm text-gray-600">
              or
            </span>
          </div>

          {/* Google Auth */}
          <button className="w-full flex items-center justify-center border py-2 rounded-full gap-2 hover:bg-gray-50 transition-colors">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginInvestor;
