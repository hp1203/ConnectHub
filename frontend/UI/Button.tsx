import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { RiLoader3Fill } from "react-icons/ri";

type ButtonProps = {
  style: "primary" | "secondary" | "outline";
  isLoading: Boolean;
  icon?: ReactNode;
  children: ReactNode;
  className: String;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  style = "primary",
  icon = null,
  children,
  className = "",
  isLoading = false,
  ...props
}) => {
  let buttonClass = "";

  switch (style) {
    case "primary":
      buttonClass =
        "bg-blue-500 hover:bg-blue-600 text-white transition duration-150";
      break;
    case "secondary":
      buttonClass =
        "bg-gray-500 hover:bg-gray-600 text-white transition duration-150";
      break;
    case "outline":
      buttonClass =
        "bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border-[3px] border-blue-500 hover:border-blue-600 transition duration-150";
      break;
    default:
      buttonClass =
        "bg-blue-500 hover:bg-blue-600 text-white transition duration-150";
  }

  return (
    <button
      className={`text-lg flex items-center justify-center px-4 py-2 rounded-lg w-fit font-semibold tracking-wide ${buttonClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="text-center">
          <RiLoader3Fill className="w-8 h-8 animate-spin" />
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
