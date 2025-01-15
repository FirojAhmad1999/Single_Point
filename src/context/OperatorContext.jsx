import React, { createContext, useContext, useState } from 'react';

// Mock data
const mockOperators = [
  {
    id: '1',
    name: 'A2B Heli Charters',
    latitude: 50.8335048,
    longitude: -0.2906166,
    category: 'Helicopter',
    type: 'Operator,Broker',
    fleetSize: 5
  },
  {
    id: '2',
    name: 'Sky Aviation',
    latitude: 40.7128,
    longitude: -74.0060,
    category: 'Airplane',
    type: 'Operator',
    fleetSize: 8
  }
];

// Export the context so it can be imported by the hook
export const OperatorContext = createContext();

export const OperatorProvider = ({ children }) => {
  const [operators, setOperators] = useState(mockOperators);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOperators = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setOperators(mockOperators);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load operators');
      setLoading(false);
    }
  };

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