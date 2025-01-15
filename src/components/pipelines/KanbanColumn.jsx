// components/kanban/KanbanColumn.jsx
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, cards = [] }) => {
  return (
    <div className="flex-1 min-w-[300px]">
      <h2 className="text-white text-lg mb-4">{title}</h2>
      <div className="space-y-3">
        {cards.map((card, index) => (
          <KanbanCard key={`${card.code}-${index}`} {...card} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;