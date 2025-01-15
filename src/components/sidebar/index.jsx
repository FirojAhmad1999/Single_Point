import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../hooks/useAuth';
import Logo from './Logo';
import Navigation from './Navigation';
import UserProfile from './UserProfile';

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData({
          name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
          email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/email'] || ''
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-70 bg-gray-900 h-screen flex flex-col fixed left-0 top-0 border-r border-gray-700/50">
      <Logo />
      <Navigation />
      <UserProfile 
        userData={userData}
        onSignOut={handleSignOut}
        onViewProfile={handleViewProfile}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
};

export default Sidebar;