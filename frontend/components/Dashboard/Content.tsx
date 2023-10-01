import React from "react";

const Content = ({
  title,
  right,
  children,
}: {
  title: string;
  right: JSX.Element;
  children: JSX.Element;
}) => {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-montserrat font-bold text-gray-800 tracking-normal">
            {title}
          </h1>
            <div>{right}</div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};

export default Content;
