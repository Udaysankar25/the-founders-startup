import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const SetNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    // TODO: API call to update password
    navigate('/founder/reset-success');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">

        {/* Left Panel */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[24px] lg:rounded-bl-[24px]">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Set new password</h2>

            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-primary font-semibold mb-1">Password</label>
                <input
                  type="password"
                  className="input h-[40px] w-full"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  className="input h-[40px] w-full"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90"
              >
                Reset Password
              </button>
            </form>

            <p className="text-sm mt-4 text-center text-primary">
              <a href="/founder/login" className="font-medium">Back to log in</a>
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-center items-center p-6 md:p-10 
          rounded-t-[24px] lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-[24px] lg:rounded-br-[24px]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Set new Password</h3>
            <p className="text-sm md:text-base">
              Your password must be at least 8 characters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
