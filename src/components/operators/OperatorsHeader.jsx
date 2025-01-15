import React from 'react';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';

const OperatorsHeader = () => {
  return (
    <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900 z-10">
      <div className="flex items-center text-gray-400">
        <span>Operators</span>
        <span className="mx-2">/</span>
        <span>Map</span>
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar />
        <FilterPanel />
      </div>
    </div>
  );
};

export default OperatorsHeader;
