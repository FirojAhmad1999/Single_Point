import React from 'react';

export const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center">
    <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-white text-lg">Loading operator details...</p>
    </div>
  </div>
);