import React from 'react';
import KanbanColumn from './KanbanColumn';
const KanbanBoard = () => {
  const columns = [
    {
      title: "QUOTE",
      tasks: [
        { name: "Kamaru Usman", route: "KTEB > KLAS", date: "Jan 22, 2025", code: "XAFHQ" },
        { name: "Test", route: "KMIA > KLAS", date: "Jan 16, 2025", code: "XAFHQ" }
      ]
    },
    {
      title: "BOOK",
      tasks: [
        { name: "Jane Doe", route: "VIDP > VECC", date: "Jan 9, 2025", code: "XAFHQ" }
      ]
    },
    {
      title: "EXECUTE",
      tasks: [
        { name: "Khaled", route: "OBBI > OMDW", date: "Jan 1, 2025", code: "XGDRTE" }
      ]
    },
    {
      title: "POST FLIGHT",
      tasks: [
        { name: "Kamaru Usman", route: "LFPB > LSGG", date: "Jan 16, 2025", code: "XAFHQ" }
      ]
    }
  ];

  return (
    <div className="flex-1 p-3">
      <div className="grid grid-cols-4 gap-3">
        {columns.map((column, index) => (
          <KanbanColumn key={index} {...column} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
