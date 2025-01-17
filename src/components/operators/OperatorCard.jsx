// import React from 'react';

// const OperatorCard = ({ operator }) => {
//   if (!operator) return null;

//   return (
//     <div className="absolute top-4 right-4 w-80 bg-[#1a1f2e] rounded-lg shadow-xl p-5 z-[1000] border border-gray-700">
//       <h2 className="text-xl font-semibold text-white mb-2">{operator.name}</h2>
//       <p className="text-sm text-gray-400 mb-4">
//         <span className="font-medium text-gray-300">ID:</span> {operator.id || 'N/A'}
//       </p>
//       <div className="space-y-3">
//         <div className="flex justify-between">
//           <span className="text-gray-400">Category:</span>
//           <span className="text-white font-medium">{operator.category || 'Unknown'}</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-400">Role:</span>
//           <span className="text-white font-medium">{operator.role|| 'Unknown'}</span>
//         </div>
//         {operator.fleetSize && (
//           <div className="flex justify-between">
//             <span className="text-gray-400">Fleet Size:</span>
//             <span className="text-white font-medium">{operator.fleetSize}</span>
//           </div>
//         )}
//         {operator.location && (
//           <div className="flex justify-between">
//             <span className="text-gray-400">Location:</span>
//             <span className="text-white font-medium">
//               {operator.location.latitude}, {operator.location.longitude}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OperatorCard;
