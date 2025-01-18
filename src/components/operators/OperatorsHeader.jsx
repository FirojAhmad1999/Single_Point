import React from 'react';
import CountryDropdown from './CountryDropdown';
import CityDropdown from './CityDropdown';
import CategoryDropdown from './CategoryDropdown';

const OperatorsHeader = () => {
  return (
    <div className="flex items-start gap-8 px-6 py-1 bg-gray-900 border-b border-gray-800">
      <CountryDropdown />
      <CityDropdown />
      <CategoryDropdown />
    </div>
  );
};

export default OperatorsHeader;