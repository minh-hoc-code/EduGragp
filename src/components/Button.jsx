import React from 'react';

// Code chuẩn không cần prop-types
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm flex items-center justify-center";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:bg-orange-600",
    outline: "bg-white text-slate-600 border border-slate-200 hover:border-brand-primary hover:text-brand-primary",
    ghost: "text-slate-500 hover:text-brand-primary bg-transparent"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;