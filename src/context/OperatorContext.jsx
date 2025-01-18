import React, { createContext, useContext, useState, useEffect } from 'react';
import { operatorService } from '../api/operatorService';

export const OperatorContext = createContext();

export const OperatorProvider = ({ children }) => {
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [filters, setFilters] = useState({
    country: '',
    city: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOperators = async () => {
    setLoading(true);
    try {
      const data = await operatorService.fetchOperators();
      setOperators(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching operators:', err);
      setError('Failed to load operators');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const updateFilters = (newFilters) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      
      // Reset dependent filters when parent filter changes
      if (newFilters.country !== undefined && newFilters.country !== prev.country) {
        updated.city = '';
        updated.category = '';
      }
      if (newFilters.city !== undefined && newFilters.city !== prev.city) {
        updated.category = '';
      }
      
      return updated;
    });
  };

  const filteredOperators = operators.filter(operator => {
    const matchesCountry = !filters.country || operator.country === filters.country;
    const matchesCity = !filters.city || operator.city === filters.city;
    const matchesCategory = !filters.category || operator.category === filters.category;
    
    if (filters.category) {
      return matchesCountry && matchesCity && matchesCategory;
    } else if (filters.city) {
      return matchesCountry && matchesCity;
    } else if (filters.country) {
      return matchesCountry;
    }
    return false;
  });

  const getAvailableFilters = () => {
    const availableCountries = [...new Set(operators.map(op => op.country))].filter(Boolean).sort();
    
    const availableCities = [...new Set(operators
      .filter(op => op.country === filters.country)
      .map(op => op.city))]
      .filter(Boolean)
      .sort();
    
    const availableCategories = [...new Set(operators
      .filter(op => 
        op.country === filters.country &&
        (!filters.city || op.city === filters.city)
      )
      .map(op => op.category))]
      .filter(Boolean)
      .sort();

    return {
      countries: availableCountries,
      cities: availableCities,
      categories: availableCategories
    };
  };

  return (
    <OperatorContext.Provider value={{
      operators: filteredOperators,
      allOperators: operators,
      selectedOperator,
      loading,
      error,
      filters,
      setSelectedOperator,
      updateFilters,
      fetchOperators,
      getAvailableFilters
    }}>
      {children}
    </OperatorContext.Provider>
  );
};

export const useOperator = () => useContext(OperatorContext);