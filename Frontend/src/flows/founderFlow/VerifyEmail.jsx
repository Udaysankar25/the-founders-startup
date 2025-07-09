import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your@email.com';

  const [code, setCode] = useState(Array(6).fill(''));
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(0);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, idx) => {
    if (!/^[0-9a-zA-Z]*$/.test(value)) return;

    const updated = [...code];
    updated[idx] = value;
    setCode(updated);

    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const enteredOtp = code.join('');

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      setVerified(true);
      setTimeout(() => {
        navigate('/founder/onboarding/step-1');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleResend = async () => {
    setShowPopup(true);
    setTimer(45);

    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      console.log('✅ Resent OTP:', data.message);
    } catch (err) {
      setErrorMessage(err.message);
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowPopup(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">

        {/* Left Panel */}
        <div className="relative w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-tl-[24px] lg:rounded-bl-[24px] lg:rounded-tr-none lg:rounded-br-none">

          {/* Resend Popup */}
          {showPopup && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            bg-white border border-gray-200 rounded-2xl p-6 w-[340px] z-50 shadow-xl text-center">
              <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-[#800080] text-lg font-bold">×</button>
              <div className="text-[#800080] text-3xl mb-3">✔</div>
              <p className="font-semibold text-[#800080]">Code resent to {email}</p>
              <p className="text-sm text-gray-600 mt-1">You can request again in {timer} second{timer !== 1 ? 's' : ''}</p>
            </div>
          )}

          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-[#800080] mb-6 text-center">Verify Email</h2>

            <form onSubmit={handleVerify} className="space-y-6">
              <label className="block text-[#800080] font-semibold mb-1">Enter 6-digit Code</label>
              <div className="flex justify-between gap-2">
                {code.map((value, idx) => (
                  <input
                    key={idx}
                    maxLength="1"
                    ref={(el) => (inputRefs.current[idx] = el)}
                    value={value}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="w-12 h-12 border border-[#800080] rounded text-center text-xl text-[#800080] focus:outline-none focus:ring-2 focus:ring-[#800080]"
                  />
                ))}
              </div>

              {errorMessage && (
                <p className="text-red-600 text-sm text-center">{errorMessage}</p>
              )}

              {verified && (
                <p className="text-green-600 text-sm text-center">✅ Email verified successfully!</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#800080] text-white py-2.5 rounded-full font-semibold hover:bg-purple-900 transition-colors"
              >
                Verify
              </button>
            </form>

            <p className="text-sm mt-4 text-center">
              Didn’t receive the email?{' '}
              <button
                onClick={handleResend}
                className="text-[#800080] font-medium underline disabled:opacity-50"
                disabled={timer !== 0 && showPopup}
              >
                Click to resend
              </button>
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-center items-center p-6 md:p-10 
          rounded-t-[24px] lg:rounded-tr-[24px] lg:rounded-br-[24px] lg:rounded-tl-none lg:rounded-bl-none"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Verify Email</h3>
            <p className="text-sm md:text-base">
              Thank you for signing up! We’ve sent a code to <strong>{email}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
