import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../../assets/images/bg-auth.png";

const SetNewPasswordInvestor = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to reset password");
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        {/* Left Panel */}
        <div
          className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-tr-none lg:rounded-br-none lg:rounded-tl-[24px] lg:rounded-bl-[24px]"
        >
          <div className="w-full max-w-[530px]">
            {!isSuccess ? (
              <>
                <h2 className="text-2xl font-bold text-[#800080] mb-6 text-center">
                  Set New Password
                </h2>

                <form onSubmit={handleReset} className="space-y-5">
                  <div>
                    <label className="block text-[#800080] font-semibold mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      className="input h-[40px] w-full border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[#800080] font-semibold mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="input h-[40px] w-full border border-[#800080] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800080]"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <p className="text-red-600 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#800080] text-white py-2.5 rounded-full font-semibold hover:bg-purple-900 transition-colors"
                    disabled={loading}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center mt-10">
                <div className="text-[#800080] text-4xl mb-4">✔</div>
                <h2 className="text-2xl font-bold text-[#800080] mb-2">
                  All Done!
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Your password has been reset
                </p>
                <button
                  onClick={() => navigate("/investor/login")}
                  className="bg-[#800080] text-white py-2 px-6 rounded-full font-medium hover:bg-purple-900"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-center items-center p-6 md:p-10 
          rounded-t-[24px] lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-[24px] lg:rounded-br-[24px]"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              {isSuccess ? "Success" : "Set New Password"}
            </h3>
            <p className="text-sm md:text-base">
              {isSuccess
                ? "Your password was successfully updated."
                : "Your password must be at least 8 characters long."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPasswordInvestor;
