import React from 'react';
import OperatorsMap from '../../components/operators/OperatorsMap';
import OperatorsHeader from '../../components/operators/OperatorsHeader';

const OperatorsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <OperatorsHeader />
      <div className="">
        <OperatorsMap />
      </div>
    </div>
  );
};

export default OperatorsPage;