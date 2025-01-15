import React from 'react';
import { OperatorProvider } from '../../context/OperatorContext';
import OperatorsMap from '../../components/operators/OperatorsMap';
import OperatorsHeader from '../../components/operators/OperatorsHeader';

const OperatorsPage = () => {
  return (
    <OperatorProvider>
      <div className="flex flex-col h-screen bg-gray-900">
        <OperatorsHeader />
        <div className="relative flex-1">
          <OperatorsMap />
        </div>
      </div>
    </OperatorProvider>
  );
};

export default OperatorsPage;
