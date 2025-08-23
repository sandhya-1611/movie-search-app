import React from 'react';

const LoadingPlaceholder = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 min-h-[400px] flex flex-col animate-pulse"
        >
          <div className="aspect-[2/3] bg-gray-600 flex-shrink-0 relative">
            <div className="absolute top-2 left-2 w-8 h-8 bg-gray-500 rounded-full"></div>
            
            <div className="absolute top-2 right-2 w-12 h-6 bg-gray-500 rounded-full"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-8 bg-gray-500 rounded-lg"></div>
            </div>
          </div>

          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <div className="h-6 bg-gray-600 rounded mb-2"></div>
              <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="h-4 bg-gray-600 rounded w-16"></div>
              
              <div className="h-6 bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingPlaceholder;