// components/kanban/KanbanCard.jsx

const KanbanCard = ({ name, route, date, code }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <h3 className="text-white font-medium">{name}</h3>
      <div className="text-gray-400 text-sm">
        {route} / {date}
      </div>
      <div className="text-gray-500 text-sm">{code}</div>
    </div>
  );
};

export default KanbanCard;