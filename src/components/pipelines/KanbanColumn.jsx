import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tasks }) => {
  return (
    <div className="flex-1">
      <div className="p-2">
        <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <KanbanCard key={index} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default KanbanColumn;
