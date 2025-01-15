import React from 'react';
import useOperator from '../hooks/useOperator';
import OperatorsTable from '../components/operators/OperatorsTable';

const OperatorsPage = () => {
  const { operators, loading } = useOperator();

  if (loading) {
    return <div className="text-white text-center">Loading operators...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Operators</h1>
      <OperatorsTable operators={operators} />
    </div>
  );
};

export default OperatorsPage;
