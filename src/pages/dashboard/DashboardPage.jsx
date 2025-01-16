import React from 'react';
import { PipelineProvider } from '../../context/PipelineContext';
import PipelineHeader from '../../components/pipelines/PipelineHeader';
import KanbanBoard from '../../components/pipelines/KanbanBoard';

const DashboardPage = () => {
  return (
    <PipelineProvider>
      <div className="flex flex-col h-screen">
        <PipelineHeader />
        <div className="relative flex-1">
          <KanbanBoard />
        </div>
      </div>
    </PipelineProvider>
  );
};

export default DashboardPage;