import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const Card = ({ children, title }: CardProps): JSX.Element => {
  return (
    <div className="rounded-lg bg-white shadow-md p-4">
      {title && (
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      )}
      <div className="pt-3">{children}</div>
    </div>
  );
};

export default Card;
