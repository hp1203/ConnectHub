import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  LuAlignJustify,
  LuBarChartBig,
  LuLogOut,
  LuMessageCircle,
  LuSettings2,
  LuUserCircle,
  LuUsers2,
  LuX,
} from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MobileMenuProps } from "@/Constants/types";
import { useSelectedLayoutSegment } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menus, user }) => {
  const [open, setOpen] = useState(false);
  const activeSegment = useSelectedLayoutSegment();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="mr-2 flex md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-md bg-blue-500 p-2 text-gray-100 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-none focus:ring-none focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          <LuAlignJustify className="block h-6 w-6" />
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-0"
                  enterTo="translate-x-full"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-full"
                  leaveTo="translate-x-0"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs -left-[100%]">
                    <div className="flex h-full flex-col overflow-hidden bg-white shadow-xl">
                      <div className="flex items-center justify-between p-4 bg-blue-500">
                        <Dialog.Title className="text-lg font-medium leading-6">
                          <h1 className="text-gray-100 font-museomoderno text-xl font-bold md:text-2xl">
                            ConnectHub
                          </h1>
                        </Dialog.Title>
                        <button
                          type="button"
                          className="relative rounded-md text-gray-100 bg-blue-600 p-1 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <LuX className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="relative flex flex-1 flex-col overflow-y-scroll scrollbar-hide gap-3">
                        <Link
                          href="/profile"
                          className={
                            "flex flex-col justify-center items-center gap-3 px-4 py-5 border-b border-gray-100 text-sm text-gray-700"
                          }
                        >
                          {imageError ? (
                            <Image
                              width={100}
                              height={100}
                              className="h-16 w-16 rounded-full border"
                              src={`https://eu.ui-avatars.com/api/?name=${user?.name}&size=250&background=f5f5f5&color=3B82F6`}
                              alt={user?.name}
                            />
                          ) : (
                            <Image
                              width={100}
                              height={100}
                              className="h-16 w-16 rounded-full border"
                              src={
                                user?.image
                                  ? `${
                                      process.env.NEXT_PUBLIC_BACKEND_URL +
                                      user?.image
                                    }`
                                  : `https://eu.ui-avatars.com/api/?name=${user?.name}&size=250&background=f5f5f5&color=3B82F6`
                              }
                              alt={user?.name}
                              onError={handleImageError}
                            />
                          )}

                          <div className="text-base font-semibold leading-none text-gray-700">
                            {user?.name}
                          </div>
                          <div className="text-xs font-medium leading-none text-gray-500">
                            {user?.email}
                          </div>
                        </Link>
                        <p className="text-gray-400 text-sm font-bold px-4 mt-2">
                          MENU
                        </p>
                        {menus.map((menu) => (
                          <Link
                            href={menu.href}
                            key={menu.name}
                            onClick={() => setOpen(false)}
                            className={classNames(
                              activeSegment === menu.targetSegment
                                ? " text-blue-500"
                                : "text-gray-700 hover:bg-gray-100 duration-150",
                              "flex items-center py-3 px-4 gap-3 hover:bg-gray-100 duration-150"
                            )}
                          >
                            <span>{menu.icon}</span>
                            <span className="text-base font-medium tracking-wide">
                              {menu.name}
                            </span>
                          </Link>
                        ))}
                        <p className="text-gray-400 text-sm font-bold px-4 mt-2">
                          Account
                        </p>

                        <Link
                          href="/account"
                          className="flex items-center py-3 px-4 gap-3 text-gray-700 hover:bg-gray-100 duration-150"
                        >
                          <span className="text-gray-500">
                            <LuUserCircle className="w-5 h-5" />
                          </span>
                          <span className="text-base font-medium tracking-wide">
                            My Account
                          </span>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center py-3 px-4 gap-3 text-gray-700 hover:bg-gray-100 duration-150"
                        >
                          <span className="text-gray-500">
                            <LuBarChartBig className="w-5 h-5" />
                          </span>
                          <span className="text-base font-medium tracking-wide">
                            Upgrade Plan
                          </span>
                        </Link>
                        <p className="text-gray-400 text-sm font-bold px-4 mt-2">
                          OTHER
                        </p>
                        <Link
                          href="/account"
                          className="flex items-center py-3 px-4 gap-3 text-gray-700 hover:bg-gray-100 duration-150"
                        >
                          <span className="text-gray-500">
                            <LuMessageCircle className="w-5 h-5" />
                          </span>
                          <span className="text-base font-medium tracking-wide">
                            Submit Feedback
                          </span>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center py-3 px-4 gap-3 text-gray-700 hover:bg-gray-100 duration-150"
                        >
                          <span className="text-gray-500">
                            <LuUsers2 className="w-5 h-5" />
                          </span>
                          <span className="text-base font-medium tracking-wide">
                            Refer & Earn
                          </span>
                        </Link>

                        <div
                          onClick={() => signOut()}
                          className={
                            "text-sm text-gray-700 flex cursor-pointer items-center p-3 gap-3 border-t border-gray-100"
                          }
                        >
                          <span className="text-gray-500">
                            <LuLogOut className="w-5 h-5" />
                          </span>
                          <span className="text-base font-medium tracking-wide">
                            Logout
                          </span>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileMenu;
