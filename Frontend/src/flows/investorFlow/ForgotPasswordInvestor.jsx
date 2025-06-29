import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const ForgotPasswordInvestor = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: trigger backend forgot password API for investor
    navigate('/investor/verify-code', { state: { email } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">

        {/* Left Panel (Form) */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[24px] lg:rounded-bl-[24px]">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-[#800080] mb-6 text-center">Forgot Your Password</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label className="block font-semibold mb-1 text-[#800080]">E-mail</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input h-[40px] w-full border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-2.5 rounded-full font-semibold hover:bg-purple-900 transition-colors"
              >
                Reset
              </button>
            </form>

            {/* Back to login */}
            <p className="text-sm mt-4 text-center text-[#800080]">
              <span
                className="font-medium cursor-pointer"
                onClick={() => navigate('/investor/login')}
              >
                Back to log in
              </span>
            </p>
          </div>
        </div>

        {/* Right Panel (Image + Message) */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-center items-center p-6 md:p-10 
          rounded-t-[24px] lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-[24px] lg:rounded-br-[24px]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Forgot Password</h3>
            <p className="text-sm md:text-base">
              Don’t worry, investor. We’ll help you securely reset your password and get back to discovering startups.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPasswordInvestor;
