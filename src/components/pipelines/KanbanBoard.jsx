import React from "react";

const KanbanBoard = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Column 1 */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h2 className="text-white font-semibold mb-4">To Do</h2>
        <div className="space-y-4">
          <div className="bg-gray-600 p-3 rounded-lg text-white">Task 1</div>
          <div className="bg-gray-600 p-3 rounded-lg text-white">Task 2</div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h2 className="text-white font-semibold mb-4">In Progress</h2>
        <div className="space-y-4">
          <div className="bg-gray-600 p-3 rounded-lg text-white">Task 3</div>
        </div>
      </div>

      {/* Column 3 */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h2 className="text-white font-semibold mb-4">Completed</h2>
        <div className="space-y-4">
          <div className="bg-gray-600 p-3 rounded-lg text-white">Task 4</div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
