import React, { createContext, useContext, useState, useEffect } from 'react';
import { operatorService } from '../api/operatorService'; // Import the service


// Export the context so it can be imported by the hook
export const OperatorContext = createContext();

export const OperatorProvider = ({ children }) => {
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch operators using the service
  const fetchOperators = async () => {
    setLoading(true);
    try {
      const data = await operatorService.fetchOperators();
      setOperators(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching operators:', err);
      setError('Failed to load operators');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators(); // Fetch operators on component mount
  }, []);

  const selectOperator = (id) => {
    const operator = operators.find(op => op.id === id);
    setSelectedOperator(operator);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredOperators = operators.filter(operator => {
    const matchesSearch = operator.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || operator.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  const value = {
    operators: filteredOperators,
    selectedOperator,
    loading,
    error,
    filters,
    fetchOperators,
    selectOperator,
    updateFilters
  };

  return (
    <OperatorContext.Provider value={value}>
      {children}
    </OperatorContext.Provider>
  );
};