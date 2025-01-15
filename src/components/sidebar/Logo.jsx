import React from 'react';

const Logo = () => {
  return (
    <div className="px-6 py-6 border-b border-gray-700/50">
      <div className="flex items-center">
        <img
          src="https://blobcntainerinstacharter.blob.core.windows.net/instacharter-az-0125-container/Instacharter_Images/logo/image4.png"
          alt="Single Point"
          className="w-8 h-8 object-contain"
        />
        <span className="ml-3 text-white text-lg font-semibold">
          Single Point
        </span>
      </div>
    </div>
  );
};
export default Logo;