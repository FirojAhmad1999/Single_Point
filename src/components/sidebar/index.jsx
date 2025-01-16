import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from './Logo';
import Navigation from './Navigation';
import UserProfile from '../profile/UserProfile';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-60 bg-gray-900 h-screen flex flex-col fixed left-0 top-0 border-r border-gray-700/50">
      <Logo />
      <Navigation />
      <UserProfile
        user={user}
        onSignOut={handleSignOut}
        onViewProfile={handleViewProfile}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
};

export default Sidebar;