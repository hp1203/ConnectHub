import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon = null, ...props }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg mt-2">
      {icon && <div className="pl-3">{icon}</div>}
      <input
        {...props}
        className="w-full pl-2 pr-3 py-3 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default Input;
