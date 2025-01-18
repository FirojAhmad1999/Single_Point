import React from "react";
import Sidebar from "../sidebar/index";

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300">
      <Sidebar />
      <div className="flex-1 ml-60">
        <div className="h-full flex flex-col p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
