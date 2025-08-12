import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../pages/AuthLayout";

const LoginInvestor = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleError, setGoogleError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "investor" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/investor/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login Logic
  const completeGoogleLogin = async (token) => {
    try {
      const res = await fetch("/api/auth/google-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, role: "investor" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Google login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/investor/dashboard");
    } catch (err) {
      setGoogleError(err.message);
    }
  };

  const handleGoogleCallbackResponse = (response) => {
    const token = response.credential;
    completeGoogleLogin(token);
  };

  useEffect(() => {
    if (
      !window.google &&
      !document.getElementById("google-script-investor-login")
    ) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-script-investor-login";
      document.body.appendChild(script);
      script.onload = () => {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallbackResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDivInvestorLogin"),
          { theme: "outline", size: "large", width: "100%" }
        );
      };
    }
  }, []);

  return (
    <AuthLayout
      title="Welcome back!"
      message="Let’s build your next big thing."
    >
      <div className="w-full max-w-md mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#800080] mb-6 text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
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

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <span
              onClick={() => navigate("/investor/forgot-password")}
              className="text-[#800080] font-medium cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#800080] hover:bg-purple-900 text-white font-semibold py-2 rounded-full transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Redirect */}
          <p className="text-sm text-center mt-2">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/investor/signup")}
              className="text-[#800080] font-medium cursor-pointer"
            >
              Sign Up
            </span>
          </p>

          {/* Divider */}
          <div className="relative my-4">
            <hr className="border-gray-300" />
            <span className="absolute left-1/2 top-[-10px] transform -translate-x-1/2 bg-[#fceeff] px-2 text-sm text-gray-600">
              or
            </span>
          </div>

          {/* Google Auth */}
          <div
            id="googleSignInDivInvestorLogin"
            className="w-full flex items-center justify-center mb-2"
          ></div>
          {googleError && (
            <p className="text-red-600 text-sm text-center">{googleError}</p>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginInvestor;
