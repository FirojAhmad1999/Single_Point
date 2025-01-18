import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select...", 
  error,
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className={`block text-sm font-medium mb-1 ${disabled ? 'text-gray-500' : 'text-gray-300'}`}>
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-9 px-3 py-1.5 text-left border rounded-md shadow-sm focus:outline-none focus:ring-1 
            focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between transition-colors
            ${disabled 
              ? 'bg-gray-700 border-gray-600 cursor-not-allowed' 
              : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
            }
          `}
        >
          <span className={`text-sm truncate ${value ? 'text-gray-200' : 'text-gray-400'}`}>
            {value || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 ${disabled ? 'text-gray-500' : 'text-gray-400'}`} />
        </button>

        {error && (
          <p className="mt-1 text-xs text-red-400">{error}</p>
        )}

        {isOpen && !disabled && (
          <div className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
            <div className="p-2">
              <input
                type="text"
                className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm text-gray-200"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                >
                  {option}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-400">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
