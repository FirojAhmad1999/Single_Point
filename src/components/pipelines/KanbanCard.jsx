import React from 'react';

const KanbanCard = ({ name, route, date, code }) => {
  return (
    <div className="bg-gray-800 p-4 mb-4 rounded-lg hover:bg-gray-700 transition-colors">
      <h3 className="font-semibold text-white mb-2">{name}</h3>
      <div className="text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <span className="truncate">{route}</span>
          <span className="text-gray-500 shrink-0">{code}</span>
        </div>
        <div className="mt-1">
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
