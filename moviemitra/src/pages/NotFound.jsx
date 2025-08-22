import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      <div className="text-8xl mb-6">🎬</div>
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-gray-300 mb-8 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 border border-white/20"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;