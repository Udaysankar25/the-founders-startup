import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const LoginFounder = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/founder/account-setup');
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">

        {/* Right Panel (Form) */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
rounded-b-[24px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[24px] lg:rounded-bl-[24px]">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Login</h2>

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Email Field */}
              <div>
                <label className="block text-primary font-semibold mb-1">E-mail</label>
                <input type="email" placeholder="you@example.com" className="input h-[40px]" required />
              </div>

              {/* Password Field with Eye Toggle */}
              <div>
                <label className="block text-primary font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="input h-[40px] pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {password && (
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  )}
                </div>
              </div>


              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm text-primary">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
                <a href="#" className="font-medium">Forgot password?</a>
              </div>

              {/* Login Button */}
              <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90">
                Login
              </button>

              {/* Sign Up Link */}
              <p className="text-sm mt-2 text-center">
                Don’t have an account?{' '}
                <a href="/founder/signup" className="text-primary font-medium">
                  Sign Up
                </a>
              </p>

              {/* OR Divider */}
              <div className="relative my-4">
                <hr className="border-gray-300" />
                <span className="absolute left-1/2 -top-2 transform -translate-x-1/2 bg-[#f4eaff] px-2 text-sm text-gray-600">
                  or
                </span>
              </div>

              {/* Google Login */}
              <button className="w-full flex items-center justify-center border border-gray-300 py-2.5 rounded-full gap-2 bg-white hover:bg-gray-50">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </form>
          </div>
        </div>

        {/* Left Panel (Image + Message) */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10 
rounded-t-[24px] lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-[24px] lg:rounded-br-[24px]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Welcome back, Founder!</h2>
            <p className="text-sm md:text-base">
              Let’s build your next big thing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginFounder;
