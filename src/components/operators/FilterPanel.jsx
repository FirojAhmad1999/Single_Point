import { useState } from 'react';
import useOperator from '../../hooks/useOperator';
import { FilterIcon } from 'lucide-react';

const FilterPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { filters, updateFilters } = useOperator();
  
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 flex items-center space-x-2"
        >
          <span>Filter</span>
          <FilterIcon size={18} />
        </button>
  
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="w-full p-2 mb-3 bg-gray-700 text-gray-200 rounded border border-gray-600"
            >
              <option value="">All Categories</option>
              <option value="helicopter">Helicopter</option>
              <option value="airplane">Airplane</option>
            </select>
  
            <select
              value={filters.country}
              onChange={(e) => updateFilters({ country: e.target.value })}
              className="w-full p-2 bg-gray-700 text-gray-200 rounded border border-gray-600"
            >
              <option value="">All Countries</option>
              {/* Add countries dynamically */}
            </select>
          </div>
        )}
      </div>
    );
  };
  
  export default FilterPanel;