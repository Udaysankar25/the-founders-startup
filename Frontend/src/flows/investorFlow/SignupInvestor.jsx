import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../pages/AuthLayout';

const SignupInvestor = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/investor/verify-email');
  };

  return (
    <AuthLayout
      title="Create your account"
      message="Join a global network of student founders and investors."
    >
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#800080] mb-6 text-center">SignUp</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
              required
            />
          </div>

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

          {/* Terms */}
          <div className="flex items-center text-sm">
            <input type="checkbox" required className="mr-2" />
            <span>Agree to Terms & Conditions</span>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#800080] hover:bg-purple-900 text-white font-semibold py-2 rounded-full transition-colors"
          >
            SignUp
          </button>
        </form>

        {/* Login Redirect */}
       <p className="text-sm mt-2 text-center">
                Already have an account?{' '}
                <a href="/investor/login" className="text-primary font-medium">
                  Login
                </a>
              </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signin */}
        <button className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-full hover:bg-gray-50 transition-colors">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </AuthLayout>
  );
};

export default SignupInvestor;
