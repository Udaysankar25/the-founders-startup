import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [code, setCode] = useState(Array(6).fill(''));
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(45);

  const handleChange = (value, idx) => {
    const updated = [...code];
    updated[idx] = value;
    setCode(updated);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/founder/reset-password', { state: { email } });
  };

  const handleResend = () => {
    // Trigger API resend code here
    setShowPopup(true);
    setTimer(45);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowPopup(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative">
      {/* Popup */}
      {showPopup && (
        <div className="absolute top-10 right-10 bg-white border border-gray-200 rounded-xl p-5 w-[320px] shadow-md z-50">
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowPopup(false)} className="text-primary font-bold text-lg">×</button>
          </div>
          <div className="text-center">
            <div className="text-primary text-2xl mb-2">✔</div>
            <p className="font-semibold text-primary">Code resent to {email}</p>
            <p className="text-sm text-gray-600">You can request again in {timer} second{timer !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        
        {/* Left Panel */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[24px] lg:rounded-bl-[24px]">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-primary mb-3 text-center">Password Reset</h2>
            <p className="text-sm text-center mb-6 text-gray-600">We sent a code to {email}</p>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-between gap-2">
                {code.map((value, idx) => (
                  <input
                    key={idx}
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    className="w-12 h-12 border border-gray-300 rounded text-center text-xl"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90"
              >
                Continue
              </button>
            </form>

            <p className="text-sm mt-4 text-center">
              Didn’t receive the email?{' '}
              <button onClick={handleResend} className="text-primary font-medium underline">Click to resend</button>
            </p>

            <p className="text-sm mt-2 text-center">
              <a href="/founder/login" className="text-primary font-medium">Back to log in</a>
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
            <h3 className="text-xl md:text-2xl font-bold mb-3">Password Reset</h3>
            <p className="text-sm md:text-base">
              We sent a code to {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
