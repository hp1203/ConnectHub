"use client";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Emojis } from "@/Constants/emojis";

const EmojiSelector = ({
  value,
  setEmoji,
}: {
  value: any;
  setEmoji: (emoji: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    setEmoji(emoji);
    setIsOpen(false);
  };

  useEffect(() => {
    handleEmojiSelect(Emojis[0]);
  }, []);

  return (
    <div className="relative inline-block">
      {" "}
      <button
        type="button"
        className="bg-gray-50 p-5 border border-gray-50 text-4xl text-white rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value?.character}
      </button>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute z-10 mt-2 w-60 max-h-80 overflow-y-scroll scrollbar-hide rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-2 grid grid-cols-6">
            {Emojis.map((emoji) => (
              <button
                key={emoji.slug}
                type="button"
                className="w-full text-left rounded-md p-2 text-lg hover:bg-gray-100 focus:outline-none"
                onClick={() => handleEmojiSelect(emoji)}
              >
                {`${emoji.character}`}
              </button>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default EmojiSelector;
