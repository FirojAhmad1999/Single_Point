import React from "react";

const Input = ({ label, type = "text", placeholder, value, onChange, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-[#0F1523] border border-[#2D3548] rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;