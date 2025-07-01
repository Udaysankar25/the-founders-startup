import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const SetNewPassword = () => {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate('/founder/reset-success');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        <div className="w-full lg:w-3/5 bg-card p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Set New Password</h2>
            {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-primary font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input h-10 w-full"
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="input h-10 w-full"
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90">
                Reset Password
              </button>
            </form>
            <p className="text-center text-primary mt-4">
              <a href="/founder/login" className="font-medium">Back to log in</a>
            </p>
          </div>
        </div>
        <div
          className="w-full lg:w-2/5 bg-cover bg-center flex items-center justify-center p-10 rounded-tr-2xl rounded-br-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-2xl p-6 text-center max-w-sm">
            <h3 className="text-xl font-bold mb-3">Set New Password</h3>
            <p className="text-base">Your password must be at least 8 characters.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
