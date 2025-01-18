import React from 'react';
import { useOperator } from '../../context/OperatorContext';
import Dropdown from './Dropdown';

const CategoryDropdown = () => {
  const { operators, filters, updateFilters } = useOperator();

  const categories = [...new Set(operators
    .filter(op => 
      op.country === filters.country && 
      op.city === filters.city
    )
    .map(op => op.category))]
    .filter(Boolean)
    .sort();

  return (
    <Dropdown
      label="Category"
      options={categories}
      value={filters.category}
      onChange={(category) => updateFilters({ category })}
      placeholder="Select category"
      disabled={!filters.city}
      className="w-64"
    />
  );
};

export default CategoryDropdown;