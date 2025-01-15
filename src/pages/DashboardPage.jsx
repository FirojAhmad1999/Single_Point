import React from "react";
import { PipelineProvider } from '../context/PipelineContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import KanbanBoard from '../components/pipelines/KanbanBoard';
import Button from '../components/shared/Button';
import { Plus, Filter } from 'lucide-react';

const DashboardPage = () => {
  return (
    <PipelineProvider>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Pipelines</h1>
            <div className="flex space-x-4">
              <Button variant="secondary">
                <Filter className="w-5 h-5 mr-2" />
                Filter by
              </Button>
              <Button variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Add Pipeline
              </Button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <KanbanBoard />
          </div>
        </div>
      </DashboardLayout>
    </PipelineProvider>
  );
};

export default DashboardPage;
