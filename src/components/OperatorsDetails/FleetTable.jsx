import React from 'react';

export const FleetTable = ({ fleet }) => {
  const tableHeaders = ['TAIL', 'TYPE', 'CAT', 'YOM', 'MAX_PAX', 'YOR'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Fleet</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {fleet?.map((aircraft) => (
                <tr key={aircraft.tail} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {aircraft.tail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {aircraft.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {aircraft.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {aircraft.yom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {aircraft.maxPax}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {aircraft.yor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};