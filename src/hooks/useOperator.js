import { useContext } from 'react';
import { OperatorContext } from '../context/OperatorContext';

export const useOperator = () => {
  const context = useContext(OperatorContext);
  
  if (!context) {
    throw new Error('useOperator must be used within an OperatorProvider');
  }
  
  return context;
};

