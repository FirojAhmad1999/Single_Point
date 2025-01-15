import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Ship, 
  FileText, 
  Building2, 
  Users, 
  CheckSquare, 
  Users2, 
  Archive, 
  History,
  LogOut,
  User
} from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../hooks/useAuth';

const NavItem = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors ${
        isActive ? 'bg-gray-800 text-white' : ''
      }`
    }
  >
    <Icon className="w-5 h-5 mr-3" />
    <span>{children}</span>
  </NavLink>
);

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
    <div className="w-64 bg-gray-900 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo section */}
      <div className="px-4 py-5">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SP</span>
          </div>
          <span className="ml-3 text-white text-lg font-semibold">Single Point</span>
        </div>
      </div>

      {/* Navigation section */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <NavItem to="/dashboard" icon={LayoutGrid}>
          Pipelines
        </NavItem>
        <NavItem to="/fleet" icon={Ship}>
          Fleet
        </NavItem>
        <NavItem to="/invoices" icon={FileText}>
          Invoices
        </NavItem>
        <NavItem to="/companies" icon={Building2}>
          My Companies
        </NavItem>
        <NavItem to="/people" icon={Users}>
          My People
        </NavItem>
        <NavItem to="/tasks" icon={CheckSquare}>
          Tasks To Do
        </NavItem>
        <NavItem to="/operators" icon={Users}>
          Operators
        </NavItem>
        <NavItem to="/archived" icon={Archive}>
          Archived Pipelines
        </NavItem>
        <NavItem to="/history" icon={History}>
          Docs History
        </NavItem>
      </nav>

      {/* User section with dropdown */}
      <div className="relative px-4 py-4 border-t border-gray-800">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center focus:outline-none"
        >
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">{userData?.name?.charAt(0)}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{userData?.name}</p>
            <p className="text-xs text-gray-400">{userData?.email}</p>
          </div>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute bottom-full left-0 w-full mb-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={handleViewProfile}
              className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 flex items-center"
            >
              <User className="w-4 h-4 mr-2" />
              View Profile
            </button>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;