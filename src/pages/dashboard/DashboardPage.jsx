import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardHeader from '../../components/header/DashboardHeader';
import KanbanBoard from '../../components/pipelines/KanbanBoard';


const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <KanbanBoard />
    </DashboardLayout>
  );
};

export default DashboardPage;