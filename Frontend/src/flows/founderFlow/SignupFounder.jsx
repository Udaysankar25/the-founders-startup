import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const SignupFounder = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Optional: Save token if needed
      // localStorage.setItem('token', data.token);

      navigate('/founder/account-setup');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">

        {/* Right Panel (Form) */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-tl-[24px] lg:rounded-bl-[24px] lg:rounded-tr-none lg:rounded-br-none">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Sign Up</h2>

            <form className="space-y-5" onSubmit={handleSignup}>
              {/* Name Field */}
              <div>
                <label className="block text-primary font-semibold mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input h-[40px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-primary font-semibold mb-1">E-mail</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input h-[40px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-primary font-semibold mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
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

              {/* Terms Checkbox */}
              <div className="text-sm text-primary">
                <label className="flex items-center gap-2">
                  <input type="checkbox" required />
                  <span>Agree to Terms & Conditions</span>
                </label>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {/* Submit Button */}
              <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90">
                Sign Up
              </button>

              {/* Login Link */}
              <p className="text-sm mt-2 text-center">
                Already have an account?{' '}
                <a href="/founder/login" className="text-primary font-medium">
                  Login
                </a>
              </p>

              {/* OR Divider */}
              <div className="relative my-4">
                <hr className="border-gray-300" />
                <span className="absolute left-1/2 -top-2 transform -translate-x-1/2 bg-[#f4eaff] px-2 text-sm text-gray-600">
                  or
                </span>
              </div>

              {/* Google Sign Up */}
              <button type="button" className="w-full flex items-center justify-center border border-gray-300 py-2.5 rounded-full gap-2 bg-white hover:bg-gray-50">
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

        {/* Left Panel (Image + Text) */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10 
          rounded-t-[24px] lg:rounded-tr-[24px] lg:rounded-br-[24px] lg:rounded-tl-none lg:rounded-bl-none"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Create your founder account</h2>
            <p className="text-sm md:text-base">
              Join a global network of student founders and pitch your ideas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFounder;
