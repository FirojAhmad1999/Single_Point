import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <KanbanCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;