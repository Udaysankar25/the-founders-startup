import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/images/bg-auth.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/forgot-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate('/founder/verify-code', { state: { email } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        <div className="w-full lg:w-3/5 bg-card p-10 flex items-center justify-center rounded-b-2xl lg:rounded-tr-none lg:rounded-br-none">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">
              Forgot Your Password
            </h2>
            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-primary font-semibold mb-1">E‑mail</label>
                <input
                  type="email"
                  className="input h-10 w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90">
                Reset
              </button>
            </form>
            <p className="text-center text-primary mt-4">
              <a href="/founder/login" className="font-medium">Back to log in</a>
            </p>
          </div>
        </div>
        <div
          className="w-full lg:w-2/5 bg-cover bg-center text-white flex items-center justify-center p-10 rounded-t-2xl lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-2xl p-6 text-center max-w-sm">
            <h3 className="text-xl font-bold mb-3">Forgot Password</h3>
            <p className="text-base">
              No worries. We’ve got your back — let’s help you get back in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
