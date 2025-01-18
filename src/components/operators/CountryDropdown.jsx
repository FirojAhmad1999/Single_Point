import React from 'react';
import { useOperator } from '../../context/OperatorContext';
import Dropdown from './Dropdown';

const CountryDropdown = () => {
  const { filters, updateFilters, getAvailableFilters } = useOperator();
  const { countries } = getAvailableFilters();

  return (
    <Dropdown
      label="Country"
      options={countries}
      value={filters.country}
      onChange={(country) => updateFilters({ country })}
      placeholder="Select country"
      className="w-64"
    />
  );
};

export default CountryDropdown;