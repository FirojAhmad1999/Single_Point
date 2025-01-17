import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors ${
        isActive ? 'bg-gray-800 text-white' : ''
      }`
    }
  >
    <Icon className="w-5 h-5 min-w-[20px] mr-3" />
    <span className="truncate">{children}</span>
  </NavLink>
);