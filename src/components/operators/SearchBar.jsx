import React from 'react';
import { SearchIcon } from 'lucide-react';
import {useOperator} from '../../hooks/useOperator';

const SearchBar = () => {
  const { filters, updateFilters } = useOperator();

  return (
    <div className="relative">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => updateFilters({ search: e.target.value })}
        placeholder="Search operators..."
        className="bg-gray-800 text-gray-200 pl-4 pr-10 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 w-64"
      />
      <SearchIcon className="absolute right-3 top-2.5 text-gray-400" size={18} />
    </div>
  );
};

export default SearchBar;