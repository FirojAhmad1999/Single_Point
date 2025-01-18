
import React from 'react';
import { useOperator } from '../../context/OperatorContext';
import Dropdown from './Dropdown';

const CityDropdown = () => {
  const { operators, filters, updateFilters } = useOperator();

  const cities = [...new Set(operators
    .filter(op => op.country === filters.country)
    .map(op => op.city))]
    .filter(Boolean)
    .sort();

  const handleCityChange = (city) => {
    updateFilters({ city, category: '' });
  };

  return (
    <Dropdown
      label="City"
      options={cities}
      value={filters.city}
      onChange={handleCityChange}
      placeholder="Select city"
      disabled={!filters.country}
      className="w-64"
    />
  );
};

export default CityDropdown;