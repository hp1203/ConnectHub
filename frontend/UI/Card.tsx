import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const Card = ({ children, title }: CardProps): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-white shadow rounded-lg">
      <div className="border-b border-gray-100 p-3 px-4">
        {title && (
          <h2 className="text-gray-500 text-sm font-semibold uppercase">
            {title}
          </h2>
        )}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
};

export default Card;
