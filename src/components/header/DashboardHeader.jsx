// components/dashboard/DashboardHeader.jsx
import React from 'react';
import { Filter, Plus } from 'lucide-react';

const DashboardHeader = () => {
    return (
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Pipelines</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            <Filter size={20} />
            <span>Filter by</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Add Pipeline</span>
          </button>
        </div>
      </div>
    );
  };

export default DashboardHeader;