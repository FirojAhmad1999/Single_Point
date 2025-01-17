import React from 'react';
import Sidebar from '../sidebar/index';
import KanbanBoard from '../pipelines/KanbanBoard';
import PipelineHeader from '../pipelines/PipelineHeader';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300">
      <Sidebar />
      <div className="flex-1 ml-60">
        <div className="h-full flex flex-col mt-2">
          <PipelineHeader />
          <div className="flex-1">
            <KanbanBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;