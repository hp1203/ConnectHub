import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { LuSettings2, LuLogOut, LuBarChartBig, LuUsers2 } from "react-icons/lu";
import { signOut } from "next-auth/react";
import Image from "next/image";
interface UserProfileProps {
  name: string;
  email: string;
  image: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const UserProfileDropdown: React.FC<UserProfileProps> = ({
  name = "",
  email = "",
  image = "",
}) => {
  return (
    <div>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex max-w-xs items-center bg-blue-500 text-sm focus:outline-none focus:ring-none focus:ring-none focus:ring-offset-2 focus:ring-offset-blue-600">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <div className="flex items-center gap-3">
              <Image
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
                src={
                  image ||
                  `https://eu.ui-avatars.com/api/?name=${name}&size=250&background=f5f5f5&color=3B82F6`
                }
                alt=""
              />
            </div>
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
          <Menu.Items className="absolute overflow-hidden right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex items-center gap-3 px-4 py-5 border-b border-gray-100 text-sm text-gray-700"
                  )}
                >
                  <img
                    className="h-9 w-9 rounded-full"
                    src={
                      image ||
                      `https://eu.ui-avatars.com/api/?name=${name}&size=250&background=f5f5f5&color=3B82F6`
                    }
                    alt=""
                  />
                  <div className=" hidden md:flex flex-col items-start justify-start gap-1">
                    <div className="text-sm font-medium leading-none text-gray-800">
                      {name}
                    </div>
                    <div className="text-xs font-medium leading-none text-gray-500">
                      {email}
                    </div>
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "text-sm text-gray-700 flex items-center p-3 gap-3"
                  )}
                >
                  <LuSettings2 className="w-5 h-5" />
                  <span className="fonr-medium text-gray-800">Settings</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "text-sm text-gray-700 flex items-center p-3 gap-3"
                  )}
                >
                  <LuBarChartBig className="w-5 h-5" />
                  <span className="fonr-medium text-gray-800">
                    Upgrade Plan
                  </span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "text-sm text-gray-700 flex items-center p-3 gap-3"
                  )}
                >
                  <LuUsers2 className="w-5 h-5" />
                  <span className="fonr-medium text-gray-800">
                    Refer & Earn
                  </span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => signOut()}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "text-sm text-gray-700 flex cursor-pointer items-center p-3 gap-3 border-t border-gray-100"
                  )}
                >
                  <LuLogOut className="w-5 h-5" />
                  <span className="fonr-medium text-gray-800">Logout</span>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserProfileDropdown;
