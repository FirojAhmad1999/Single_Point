import React from "react";
import Sidebar from "../sidebar/index";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-300">
      <Sidebar />
      <div className="flex-1 pl-60">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
