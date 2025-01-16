import React, { useState, useRef, useEffect } from 'react';
import { FilterIcon } from 'lucide-react';

const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 flex items-center space-x-2"
      >
        <span>Filter</span>
        <FilterIcon size={18} />
      </button>

      {isOpen && (
        <div
          className="absolute top-12 right-0 w-64 bg-gray-600 rounded-lg shadow-lg border border-gray-700 p-4"
          style={{ zIndex: 1000 }}
        >
          <select className="w-full p-2 mb-3 bg-gray-700 text-gray-200 rounded border border-gray-600">
            <option value="">All Categories</option>
            <option value="helicopter">Helicopter</option>
            <option value="airplane">Airplane</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterPanel