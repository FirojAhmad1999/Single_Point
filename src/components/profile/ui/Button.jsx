import React from "react";

const Button = ({ children, variant = "default", className = "", ...props }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#4F46E5] hover:bg-[#4338CA] text-white";
      case "outline":
        return "border border-[#1E2533] hover:bg-[#1E2533] text-gray-300";
      case "ghost":
        return "hover:bg-[#1E2533] text-gray-300";
      default:
        return "bg-[#1E2533] hover:bg-[#2D3548] text-gray-300";
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;