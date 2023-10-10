import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { RiLoader3Fill } from "react-icons/ri";

type ButtonProps = {
  style: "primary" | "danger" | "secondary" | "outline" | "icon";
  isLoading?: Boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: String;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  style = "primary",
  icon = null,
  children,
  className = null,
  isLoading = false,
  ...props
}) => {
  let buttonClass = "";

  switch (style) {
    case "primary":
      buttonClass =
        "px-4 py-2 bg-blue-500 rounded text-white shadow-sm active:shadow-none active:scale-95 hover:bg-blue-600 focus:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed";
      break;
    case "danger":
        buttonClass =
          "px-4 py-2 bg-red-500 rounded text-white shadow-sm active:shadow-none active:scale-95 hover:bg-red-600 focus:bg-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed";
        break;
    case "secondary":
      buttonClass =
        "px-4 py-2 bg-blue-50 border border-blue-100 rounded text-blue-500 active:scale-95 hover:bg-blue-400 hover:text-white focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed";
      break;
    case "outline":
      buttonClass =
        "px-4 py-2 bg-transparent border-2 border-blue-400 rounded text-blue-500 active:scale-95 hover:bg-blue-600 hover:text-white hover:border-transparent focus:bg-blue-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed";
      break;
    case "icon":
      buttonClass =
        "w-10 h-10 flex items-center justify-center bg-gray-100 border-gray-200 border text-blue-500 rounded group hover:bg-blue-500 hover:text-white hover:border-transparent focus:bg-blue-500 focus:text-white focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 n active:scale-95 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed";
      break;
    default:
      buttonClass = "bg-blue-500 hover:bg-blue-600 text-white";
  }

  return (
    <button
      className={`flex rounded-md items-center gap-2 justify-center outline-none font-medium focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200 ${buttonClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="text-center">
          <RiLoader3Fill className="w-8 h-8 animate-spin" />
        </span>
      ) : (
        <>
          {icon && <span className="">{icon}</span>}
          {style !== "icon" && children}
        </>
      )}
    </button>
  );
};

export default Button;
