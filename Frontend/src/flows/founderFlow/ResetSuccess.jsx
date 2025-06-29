import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center max-w-sm w-full shadow-lg">
        <div className="text-primary text-4xl mb-4">✔</div>
        <h2 className="text-2xl font-bold text-primary mb-2">All Done!</h2>
        <p className="text-sm text-gray-600 mb-6">Your password has been reset</p>
        <button
          onClick={() => navigate('/founder/login')}
          className="bg-primary text-white py-2 px-6 rounded-full font-medium hover:bg-primary/90"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;
