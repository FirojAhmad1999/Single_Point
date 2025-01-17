import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const OperatorDetailsHeader = ({ operator }) => {
  const navigate = useNavigate();

  const handleMapClick = (e) => {
    e.preventDefault();
    navigate('/operators');
  };

  return (
    <div className="bg-gray-900">
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex space-x-2 text-sm text-gray-400">
            <Link to="/operators" className="hover:text-white">
              Operators
            </Link>
            <span>›</span>
            <button
              onClick={handleMapClick}
              className="hover:text-white bg-transparent border-none p-0 text-gray-400 text-sm cursor-pointer"
            >
              Map
            </button>
            <span>›</span>
            <span className="text-white">{operator?.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="h-14 w-36 flex items-center">
              <img
                src={operator?.logo || "/api/placeholder/144/56"}
                alt={`${operator?.name} logo`}
                className="object-contain max-h-full"
              />
            </div>
            <div>
              <div className="text-sm text-blue-400 uppercase font-medium">
                {operator?.region}
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                {operator?.name}
              </h1>
              <div className="text-gray-400 text-sm mt-2">
                {operator?.email}<br />
                {operator?.phone}
              </div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            Add to My Companies
          </button>
        </div>
      </div>
    </div>
  );
};