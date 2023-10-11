"use client";
import "@/styles/globals.css";
import { Disclosure, Menu } from "@headlessui/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserProfileDropdown from "@/components/Dashboard/UserProfileDropdown";
import {
  LuAreaChart,
  LuComponent,
  LuPencilRuler,
  LuSettings,
} from "react-icons/lu";
import MobileMenu from "@/components/Dashboard/MobileMenu";
import { useSelectedLayoutSegment } from "next/navigation";

const navigation = [
  {
    name: "Analytics",
    href: "/admin",
    targetSegment: null,
    icon: <LuAreaChart className="w-5 h-5" />,
  },
  {
    name: "Links",
    href: "/admin/links",
    targetSegment: "links",
    icon: <LuComponent className="w-5 h-5" />,
  },
  {
    name: "Appearance",
    href: "/admin/appearance",
    targetSegment: "appearance",
    icon: <LuPencilRuler className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    targetSegment: "settings",
    icon: <LuSettings className="w-5 h-5" />,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const activeSegment = useSelectedLayoutSegment();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-500">
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <MobileMenu
                    menus={navigation}
                    user={{
                      name: session?.user?.name ?? "",
                      email: session?.user?.email ?? "",
                      image: session?.user?.image ?? "",
                    }}
                  />
                  <div className="flex-shrink-0">
                    <div>
                      <h1 className="text-gray-100 font-museomoderno text-xl font-bold md:text-2xl">
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
                            activeSegment === item.targetSegment
                              ? "bg-blue-600 text-white"
                              : "text-gray-100 hover:bg-blue-600 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2"
                          )}
                        >
                          <span>{item.icon}</span>
                          <span className="text-base font-medium tracking-wide">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <UserProfileDropdown
                      name={session?.user?.name ?? ""}
                      email={session?.user?.email ?? ""}
                      image={session?.user?.image ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        </Disclosure>

        <main>{children}</main>
      </div>
    </>
  );
}
