import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 overflow-hidden">{children}</div>
    </div>
  );
};

export default DashboardLayout;
