import React from 'react';
import useOperator from '../../hooks/useOperator';

const OperatorCard = () => {
    const { selectedOperator } = useOperator();
  
    if (!selectedOperator) return null;
  
    return (
      <div className="absolute top-4 right-4 w-80 bg-gray-900 rounded-lg border border-gray-800 shadow-xl p-4">
        <h2 className="text-xl font-semibold text-white mb-2">{selectedOperator.name}</h2>
        <p className="text-gray-400 text-sm mb-4">{selectedOperator.id}</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Category:</span>
            <span className="text-white">{selectedOperator.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white">{selectedOperator.type}</span>
          </div>
          {selectedOperator.fleetSize && (
            <div className="flex justify-between">
              <span className="text-gray-400">Fleet Size:</span>
              <span className="text-white">{selectedOperator.fleetSize}</span>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default OperatorCard;