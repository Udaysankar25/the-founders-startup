import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const VerifyCode = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (!email) {
      console.warn('[VerifyCode] No email found in location state.');
      setError('Missing email. Please restart the password reset process.');
    } else {
      console.log('[VerifyCode] Loaded with email:', email);
    }
  }, [email]);

  const handleChange = (value, idx) => {
    const copy = [...code];
    copy[idx] = value;
    setCode(copy);
    console.log(`[OTP Input] Code so far: ${copy.join('')}`);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    const otp = code.join('');
    console.log('[handleVerify] Submitting:', { email, otp });

    if (!email || otp.length !== 6) {
      console.warn('[handleVerify] Invalid input:', { email, otp });
      setError('Invalid input. Ensure email and 6-digit OTP are provided.');
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password-verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log('[handleVerify] Server response:', res.status, data);

      if (!res.ok) throw new Error(data.message);
      navigate('/founder/reset-password', { state: { email } });
    } catch (err) {
      console.error('[handleVerify] Error verifying OTP:', err.message);
      setError(err.message);
    }
  };

  const handleResend = async () => {
    console.log('[handleResend] Resending OTP to:', email);
    try {
      const res = await fetch('/api/auth/forgot-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log('[handleResend] Server response:', res.status, data);

      if (!res.ok) throw new Error(data.message);

      setShowPopup(true);
      setTimer(45);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowPopup(false);
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('[handleResend] Error resending OTP:', err.message);
      setError('Failed to resend OTP. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative">
      {showPopup && (
        <div className="absolute top-10 right-10 bg-white border rounded-xl p-5 shadow-md z-50">
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowPopup(false)} className="text-primary font-bold text-lg">
              ×
            </button>
          </div>
          <div className="text-center">
            <div className="text-primary text-2xl mb-2">✔</div>
            <p className="font-semibold text-primary">Code resent to {email}</p>
            <p className="text-sm text-gray-600">
              You can request again in {timer} second{timer !== 1 && 's'}
            </p>
          </div>
        </div>
      )}
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        <div className="w-full lg:w-3/5 bg-card p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary mb-3 text-center">Password Reset</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">We sent a code to {email || 'your email'}</p>
          {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-between gap-2">
              {code.map((v, idx) => (
                <input
                  key={idx}
                  maxLength="1"
                  value={v}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  className="w-12 h-12 border rounded text-center text-xl"
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
          <p className="text-center text-sm mt-4">
            Didn’t receive the email?{' '}
            <button onClick={handleResend} className="text-primary font-medium underline">
              Click to resend
            </button>
          </p>
          <p className="text-center text-sm mt-2">
            <a href="/founder/login" className="text-primary font-medium">Back to log in</a>
          </p>
        </div>
        <div
          className="w-full lg:w-2/5 bg-cover bg-center flex items-center justify-center p-10 rounded-tr-2xl rounded-br-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-2xl p-6 text-center max-w-sm">
            <h3 className="text-xl font-bold mb-3">Password Reset</h3>
            <p className="text-base">We sent a code to {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
