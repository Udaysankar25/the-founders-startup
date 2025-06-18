import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role'); // 'founder' or 'investor'

  const title = role === 'investor' ? 'Welcome back, Investor!' : 'Welcome back!';
  const message =
    role === 'investor'
      ? "Let's help you discover game-changing ideas."
      : "Let’s build your next big thing.";

  return (
    <AuthLayout title={title} message={message}>
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Login</h2>

      <form className="space-y-4">
        <input type="email" placeholder="E-mail" className="input" />
        <input type="password" placeholder="Password" className="input" />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a href="#" className="text-purple-700 font-medium">Forgot password</a>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-full mt-2"
        >
          Login
        </button>

        <p className="text-sm mt-2">
          Don’t have an account?{' '}
          <a href={`/signup?role=${role || 'founder'}`} className="text-purple-700 font-medium">
            Signup
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

export default Login;
