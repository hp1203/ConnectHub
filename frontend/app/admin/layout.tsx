"use client";
import "@/styles/globals.css";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaBell, FaChevronDown, FaCross } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserProfileDropdown from "@/components/Dashboard/UserProfileDropdown";
import { LuAreaChart, LuComponent, LuPencilRuler, LuSettings } from "react-icons/lu";
// import MobileMenu from "@/components/Dashboard/MobileMenu";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Analytics", href: "/admin", current: true, icon: <LuAreaChart className="w-5 h-5"/> },
  { name: "Links", href: "/admin/links", current: false,icon: <LuComponent className="w-5 h-5"/> },
  { name: "Appearance", href: "/admin/appearance", current: false,icon: <LuPencilRuler className="w-5 h-5"/> },
  { name: "Settings", href: "/admin/settings", current: false,icon: <LuSettings className="w-5 h-5"/> },
];

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#", icon: <LuAreaChart className="w-5 h-5"/> },
  { name: "Settings", href: "#", icon: <LuAreaChart className="w-5 h-5"/> },
  { name: "Sign out", href: "#", icon: <LuAreaChart className="w-5 h-5"/> },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {data: session} = useSession();
  const router = useRouter();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-500">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    {/* <MobileMenu/> */}
                    <div className="flex-shrink-0">
                      <div>
                        <h1
                          className="text-gray-100 font-museomoderno text-xl font-bold md:text-2xl"
                        >
                          ConnectHub
                        </h1>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-blue-600 text-white"
                                : "text-gray-100 hover:bg-blue-600 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2"
                            )}
                          >
                            <span>{item.icon}</span>
                            <span className="text-base font-medium tracking-wide">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button
                        type="button"
                        className="relative rounded-full bg-blue-500 hover:bg-blue-600 p-2 text-gray-100 hover:text-white focus:outline-none focus:ring-none focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <FaBell className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* Profile dropdown */}
                      <UserProfileDropdown name={session?.user?.name ?? ""} email={session?.user?.email ?? ""} image={session?.user?.image ?? ""}/>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-blue-500 p-2 text-gray-100 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-none focus:ring-none focus:ring-offset-2 focus:ring-offset-blue-600">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <IoCloseOutline className="block h-6 w-6" />
                      ) : (
                        <HiMenu className="block h-6 w-6" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-xs font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <FaBell className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
