import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({ children, variant = "primary", className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg flex items-center justify-center text-sm font-medium focus:outline-none";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string,
};

export default Button;
