import React from "react";
import { RiLoader3Fill } from "react-icons/ri";

type LoadingProps = {
  title?: string;
  subtitle?: string;
};

const Loading: React.FC<LoadingProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen w-full">
      <RiLoader3Fill className="w-16 h-16 animate-spin text-blue-500" />
      {title && <p className="text-2xl text-gray-800 font-semibold">{title}</p>}
      {subtitle && (
        <p className="text-gray-500 font-normal max-w-md text-center">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Loading;