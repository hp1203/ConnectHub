import React, { ReactNode } from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ type, icon, children }) => {
  let buttonClass = '';

  switch (type) {
    case 'primary':
      buttonClass = 'bg-blue-500 hover:bg-blue-600 text-white transition duration-150';
      break;
    case 'secondary':
      buttonClass = 'bg-gray-500 hover:bg-gray-600 text-white transition duration-150';
      break;
    case 'outline':
      buttonClass = 'bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border-[3px] border-blue-500 hover:border-blue-600 transition duration-150';
      break;
    default:
      buttonClass = 'bg-blue-500 hover:bg-blue-600 text-white transition duration-150';
  }

  return (
    <button className={`text-lg px-4 py-2 rounded-lg w-fit font-medium tracking-wide ${buttonClass}`}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;