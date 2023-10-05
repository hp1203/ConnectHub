import React from "react";

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg mt-2">

      <textarea
        {...props}
        className="w-full pl-3 pr-3 py-3 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default Textarea;
