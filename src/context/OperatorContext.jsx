import React, { createContext, useState, useEffect } from 'react';
import { fetchOperators } from '../api/operator.api';

export const OperatorContext = createContext();

export const OperatorProvider = ({ children }) => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOperators = async () => {
      try {
        const data = await fetchOperators();
        setOperators(data);
      } catch (error) {
        console.error('Failed to fetch operators', error);
      } finally {
        setLoading(false);
      }
    };

    loadOperators();
  }, []);

  return (
    <OperatorContext.Provider value={{ operators, loading }}>
      {children}
    </OperatorContext.Provider>
  );
};
