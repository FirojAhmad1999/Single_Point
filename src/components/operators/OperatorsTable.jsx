import React from 'react';

const OperatorsTable = ({ operators }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-md shadow-md">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Logo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Fleet</th>
            <th className="p-2">Category</th>
            <th className="p-2">City</th>
            <th className="p-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {operators.map((operator) => (
            <tr key={operator.id} className="border-b border-gray-700">
              <td className="p-2">
                <img src={operator.logo} alt={operator.name} className="h-8 w-8" />
              </td>
              <td className="p-2">{operator.name}</td>
              <td className="p-2">{operator.fleet}</td>
              <td className="p-2">{operator.category}</td>
              <td className="p-2">{operator.city}</td>
              <td className="p-2">{operator.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperatorsTable;
