import React from "react";
import Sidebar from "../sidebar/index";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
