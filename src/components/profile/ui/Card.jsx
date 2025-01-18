import React from "react";

export const Card = ({ children, className }) => (
  <div className={`rounded-lg border border-[#1E2533] bg-[#0F1523] shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);