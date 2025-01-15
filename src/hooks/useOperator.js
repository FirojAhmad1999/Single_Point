import { useContext } from 'react';
import { OperatorContext } from '../context/OperatorContext';

const useOperator = () => {
  return useContext(OperatorContext);
};

export default useOperator;
