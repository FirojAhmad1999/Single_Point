import React from 'react';
import useOperator from '../../hooks/useOperator';

const OperatorCard = ({ operator }) => {
  if (!operator) return null;

  return (
    <div className="absolute top-4 right-4 w-72 bg-white rounded-lg shadow-lg p-4 z-[1000]">
      <h2 className="text-lg font-semibold text-gray-900">{operator.name}</h2>
      <p className="text-sm text-gray-500 mb-3">{operator.id}</p>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Category:</span>
          <span className="text-gray-900 font-medium">{operator.category}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="text-gray-900 font-medium">{operator.type}</span>
        </div>
        {operator.fleetSize && (
          <div className="flex justify-between">
            <span className="text-gray-600">Fleet Size:</span>
            <span className="text-gray-900 font-medium">{operator.fleetSize}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OperatorCard;