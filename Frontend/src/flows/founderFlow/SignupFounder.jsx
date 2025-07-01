import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const SignupFounder = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // ✅ UPDATED: Send only token
  const completeGoogleSignup = async (token) => {
    try {
      const res = await fetch('/api/auth/google-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('signupEmail', data.user.email);
      localStorage.setItem('token', data.token);
      navigate('/founder/dashboard');
    } catch (err) {
      console.error('Google Signup Error:', err);
      setError(err.message);
    }
  };

  // ✅ Ensure correct token is passed
  const handleGoogleCallbackResponse = (response) => {
    const token = response.credential;
    completeGoogleSignup(token);
  };

  useEffect(() => {
    if (!window.google && !document.getElementById('google-script')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.id = 'google-script';
      document.body.appendChild(script);

      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallbackResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv'),
          { theme: 'outline', size: 'large', width: '100%' }
        );
      };
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreedToTerms) {
      setError('You must agree to the Terms & Conditions to continue.');
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      setError(
        'Password must include uppercase, lowercase, number, special character and be at least 8 characters long.'
      );
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      localStorage.setItem('signupEmail', email.trim());
      navigate('/founder/verify-email', { state: { email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        {/* Right Panel */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center rounded-b-[24px] lg:rounded-l-[24px]">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Sign Up</h2>

            <form className="space-y-5" onSubmit={handleSignup}>
              {/* Name */}
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

              {/* Email */}
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

              {/* Password */}
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

              {/* Terms */}
              <div className="text-sm text-primary">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    required
                  />
                  <span>Agree to Terms & Conditions</span>
                </label>
              </div>

              {/* Error */}
              {error && <p className="text-red-600 text-sm">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-full font-semibold hover:bg-primary/90 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Sign Up'}
              </button>

              {/* Login */}
              <p className="text-sm mt-2 text-center">
                Already have an account?{' '}
                <a href="/founder/login" className="text-primary font-medium">
                  Login
                </a>
              </p>

              {/* Divider */}
              <div className="relative my-4">
                <hr className="border-gray-300" />
                <span className="absolute left-1/2 -top-2 transform -translate-x-1/2 bg-[#f4eaff] px-2 text-sm text-gray-600">
                  or
                </span>
              </div>

              {/* Google Auth */}
              <div id="googleSignInDiv" className="w-full" />
            </form>
          </div>
        </div>

        {/* Left Panel */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10 rounded-t-[24px] lg:rounded-tr-[24px] lg:rounded-br-[24px] lg:rounded-tl-none lg:rounded-bl-none"
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
