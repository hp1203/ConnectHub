import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { LuX } from "react-icons/lu";

const MultiSelectInput = ({ value, setTags }: {
  value: any;
  setTags: (tag: any) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      setTags([...value, inputValue]);
      setInputValue("");
    }
  };

  const handleTagDelete = (tag: string) => {
    const updatedTags = value.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center border border-gray-300 rounded-lg mt-2 h-auto">
        {value.map((tag: string) => (
          <Transition
            key={tag}
            show={true}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1 ml-2 mt-2">
              <span className="mr-1">{tag}</span>
              <button
                onClick={() => handleTagDelete(tag)}
                className="text-gray-400 focus:outline-none"
              >
                <LuX className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </Transition>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Enter a tag"
          className="w-full pl-3 pr-3 py-3 rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default MultiSelectInput;
