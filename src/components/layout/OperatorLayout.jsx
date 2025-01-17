import React from "react";
import Sidebar from "../sidebar/index";


const OperatorLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300 sticky">
      <Sidebar />
      <div className="flex-1 ml-60">
        <div className="h-full flex flex-col mt-10 sticky">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OperatorLayout;
