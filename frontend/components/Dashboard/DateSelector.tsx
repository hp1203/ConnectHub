import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FiChevronDown, FiCalendar } from "react-icons/fi";

const DateSelector = ({selectedPeriod, selectPeriod}: {selectedPeriod: String, selectPeriod: any}) => {
  return (
    <div className="top-1 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full capitalize justify-center items-center rounded-md shadow bg-white px-4 py-2 text-xs font-medium text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <FiCalendar
              className="mr-2 h-4 w-4 text-gray-300 "
            />
            {selectedPeriod.replaceAll("-", " ")}
            <FiChevronDown
              className="-mr-1 ml-2 h-4 w-4 text-gray-300"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => selectPeriod("today")}
                  >
                    Today
                  </button>
                )}
              </Menu.Item>
              </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => selectPeriod("last-7-days")}
                  >
                    Last 7 Days
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => selectPeriod("last-15-days")}
                  >
                    Last 15 Days
                  </button>
                )}
              </Menu.Item>
              </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => selectPeriod("last-30-days")}
                  >
                    Last 30 Days
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default DateSelector;