import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../pages/AuthLayout";

const SignupInvestor = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!agreedToTerms) {
      setError("You must agree to the Terms & Conditions to continue.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "investor" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");
      localStorage.setItem("signupEmail", email);
      navigate("/investor/verify-email", { state: { email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Signup Logic
  const completeGoogleSignup = async (token) => {
    try {
      const res = await fetch("/api/auth/google-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, role: "investor" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google signup failed");
      localStorage.setItem("signupEmail", data.user.email);
      localStorage.setItem("token", data.token);
      navigate("/investor/dashboard");
    } catch (err) {
      setGoogleError(err.message);
    }
  };

  const handleGoogleCallbackResponse = (response) => {
    const token = response.credential;
    completeGoogleSignup(token);
  };

  useEffect(() => {
    if (!window.google && !document.getElementById("google-script-investor")) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-script-investor";
      document.body.appendChild(script);
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallbackResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDivInvestor"),
          { theme: "outline", size: "large", width: "100%" }
        );
      };
    }
  }, []);

  return (
    <AuthLayout
      title="Create your account"
      message="Join a global network of student founders and investors."
    >
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#800080] mb-6 text-center">
          SignUp
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-1">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Terms */}
          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              required
              className="mr-2"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span>Agree to Terms & Conditions</span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-[#800080] hover:bg-purple-900 text-white font-semibold py-2 rounded-full transition-colors"
            disabled={loading}
          >
            {loading ? "Signing up..." : "SignUp"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-sm mt-2 text-center">
          Already have an account?{" "}
          <a href="/investor/login" className="text-primary font-medium">
            Login
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signin */}
        <div
          id="googleSignInDivInvestor"
          className="w-full flex items-center justify-center mb-2"
        ></div>
        {googleError && (
          <p className="text-red-600 text-sm text-center">{googleError}</p>
        )}
      </div>
    </AuthLayout>
  );
};

export default SignupInvestor;
