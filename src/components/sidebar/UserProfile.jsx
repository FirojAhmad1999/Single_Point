import React from 'react';
import { User, LogOut } from 'lucide-react';

const UserProfile = ({ userData, onSignOut, onViewProfile, isDropdownOpen, setIsDropdownOpen }) => {
  return (
    <div className="relative px-6 py-4 border-t border-gray-700/50 bg-gray-800/50">
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center focus:outline-none group"
      >
        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {userData?.name?.charAt(0)}
          </span>
        </div>
        <div className="ml-3 flex-1 text-left">
          <p className="text-sm font-medium text-white truncate">
            {userData?.name}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {userData?.email}
          </p>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute bottom-full left-0 w-full mb-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <button
            onClick={onViewProfile}
            className="w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-700/50 flex items-center transition-colors"
          >
            <User className="w-4 h-4 mr-3" />
            View Profile
          </button>
          <button
            onClick={onSignOut}
            className="w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-700/50 flex items-center transition-colors border-t border-gray-700/50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;