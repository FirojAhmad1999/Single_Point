import React from 'react';
import { OperatorProvider } from '../../context/OperatorContext';
import OperatorsMap from '../../components/operators/OperatorsMap';
import OperatorsHeader from '../../components/operators/OperatorsHeader';

const OperatorsPage = () => {
  return (
    <OperatorProvider>
          <OperatorsHeader />
          <OperatorsMap />
    </OperatorProvider>
  );
};
export default OperatorsPage;