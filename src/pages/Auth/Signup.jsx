import React from 'react';
import AuthLayout from './AuthLayout';

const Signup = () => {
  return (
    <AuthLayout title="Create your account" message="Join a global network of student founders and investors.">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">SignUp</h2>

      <form className="space-y-4">
        <input type="text" placeholder="Name" className="input" />
        <input type="email" placeholder="E-mail" className="input" />
        <input type="password" placeholder="Password" className="input" />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            <span>Agree to Terms & Conditions</span>
          </label>
          <a href="#" className="text-purple-700 font-medium">Forgot password</a>
        </div>

        <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-full mt-2">SignUp</button>

        <p className="text-sm mt-2">
          Already have an account? <a href="/login" className="text-purple-700 font-medium">Login</a>
        </p>

        <div className="relative my-4">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-[-10px] transform -translate-x-1/2 bg-[#fceeff] px-2 text-sm text-gray-600">or</span>
        </div>

        <button className="w-full flex items-center justify-center border py-2 rounded-full gap-2">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
          Continue with Google
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
