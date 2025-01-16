import React from 'react';

const PipelineHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
      <h1 className="text-xl font-semibold text-white">Pipelines</h1>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
          Filter by
        </button>
        <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
          Add Pipeline
        </button>
      </div>
    </div>
  );
};

export default PipelineHeader;