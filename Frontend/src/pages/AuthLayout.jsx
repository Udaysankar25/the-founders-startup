import React from 'react';
import bg from '../assets/images/bg-auth.png';

const AuthLayout = ({ children, title, message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fceeff] px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg bg-white">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 bg-[#fceeff] flex flex-col justify-center">
          {children}
        </div>

        {/* Right Side - Background Image + Message */}
        <div className="hidden md:flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})` }}>
          <div className="bg-white/10 rounded-xl border border-white p-6 text-center backdrop-blur-sm text-white mx-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
