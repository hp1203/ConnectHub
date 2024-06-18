"use client";
import Chart from "@/components/Dashboard/Chart";
import Content from "@/components/Dashboard/Content";
import DateSelector from "@/components/Dashboard/DateSelector";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { FiLink } from "react-icons/fi";
import { FaAndroid, FaApple, FaDesktop, FaLink, FaMousePointer, FaUser, FaUserCheck } from "react-icons/fa";
import {
  LuLink,
  LuMousePointer,
  LuMousePointerClick,
  LuUser,
  LuUserCheck,
} from "react-icons/lu";
import PieChart from "@/components/Dashboard/PieChart";
const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const [imageError, setImageError] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <Content title="Dashboard" right={<></>}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            {imageError ? (
              <Image
                width={40}
                height={40}
                className="h-12 w-12 rounded-full border"
                src={`https://eu.ui-avatars.com/api/?name=${session?.user?.name}&size=250&background=f5f5f5&color=3B82F6`}
                alt={session?.user?.name}
              />
            ) : (
              <Image
                width={40}
                height={40}
                className="h-12 w-12 rounded-full border"
                src={
                  session?.user?.profiles[0]?.profilePicture
                    ? `${
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        session?.user?.profiles[0]?.profilePicture
                      }`
                    : `https://eu.ui-avatars.com/api/?name=${session?.user?.name}&size=250&background=f5f5f5&color=3B82F6`
                }
                alt={session?.user?.name}
                onError={handleImageError}
              />
            )}
            <div className="flex flex-col">
              <h1 className="text-lg font-medium">
                Hello {session?.user?.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-400 text-sm">
                We hope you're having a great day.
              </p>
            </div>
          </div>
          <DateSelector
            selectedPeriod={selectedPeriod}
            selectPeriod={setSelectedPeriod}
          />
        </div>
        <div className="flex items-center justify-evenly bg-white shadow divide-x divide-gray-50 rounded-lg">
          <div className="flex flex-col py-8 space-y-3 flex-1 justify-center items-center">
            <LuLink className="w-8 h-8 text-blue-500" />
            <h3 className="uppercase text-xs font-semibold text-gray-500">
              Total Links
            </h3>
            <p className="text-4xl font-medium text-gray-800">234</p>
          </div>
          <div className="flex flex-col py-8 space-y-3 flex-1 justify-center items-center">
            <LuUser className="w-8 h-8 text-blue-500" />
            <h3 className="uppercase text-xs font-semibold text-gray-500">
              Unique Visitors
            </h3>
            <p className="text-4xl font-medium text-gray-800">234</p>
          </div>
          <div className="flex flex-col py-8 space-y-3 flex-1 justify-center items-center">
            <LuUserCheck className="w-8 h-8 text-blue-500" />
            <h3 className="uppercase text-xs font-semibold text-gray-500">
              Total Profile Visits
            </h3>
            <p className="text-4xl font-medium text-gray-800">234</p>
          </div>
          <div className="flex flex-col py-8 space-y-3 flex-1 justify-center items-center">
            <LuMousePointerClick className="w-8 h-8 text-blue-500" />
            <h3 className="uppercase text-xs font-semibold text-gray-500">
              Total Clicks
            </h3>
            <p className="text-4xl font-medium text-gray-800">234</p>
          </div>
        </div>
        <div className="flex md:flex-row gap-5">
          <div className="flex flex-[0.6] flex-col w-full bg-white shadow rounded-lg">
            <div className="border-b border-gray-100 p-3 px-4">
              <p className="text-gray-500 text-sm font-semibold uppercase">
                Click Trends
              </p>
            </div>
            <div className="flex p-4">
              <Chart />
            </div>
          </div>
          <div className="flex flex-[0.4] flex-col w-full bg-white shadow rounded-lg">
            <div className="border-b border-gray-100 p-3 px-4">
              <p className="text-gray-500 text-sm font-semibold uppercase">
                Device Breakdown
              </p>
            </div>
            <div className="flex justify-center items-center max-h-96 p-4">
              <div>
                <PieChart />
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row gap-5">
          <div className="flex flex-col w-full bg-white shadow rounded-lg">
            <div className="border-b border-gray-100 p-3 px-4">
              <p className="text-gray-500 text-sm font-semibold uppercase">
                Top Links
              </p>
            </div>
            <div className="flex p-4">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                      S. No.
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Link
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Start</td>
                    <td className="px-4 py-3">5 Mb/s</td>
                    <td className="px-4 py-3">15 GB</td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Pro
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      25 Mb/s
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      25 GB
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      Business
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      36 Mb/s
                    </td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">
                      40 GB
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      Exclusive
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      48 Mb/s
                    </td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                      120 GB
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full bg-white shadow rounded-lg">
            <div className="border-b border-gray-100 p-3 px-4">
              <p className="text-gray-500 text-sm font-semibold uppercase">
                Recent Visitors
              </p>
            </div>
            <div className="flex p-4">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                      S. No.
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Location
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Device
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Session
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                      Clicks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">
                      London, UK
                    </td>
                    <td className="px-4 py-3">
                      <FaDesktop className="w-5 h-5 text-gray-600"/>
                    </td>
                    <td className="px-4 py-3">
                      1hr 21min
                    </td>
                    <td className="px-4 py-3">
                      23
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">2</td>
                    <td className="px-4 py-3">
                      London, UK
                    </td>
                    <td className="px-4 py-3">
                      <FaDesktop className="w-5 h-5 text-gray-600"/>
                    </td>
                    <td className="px-4 py-3">
                      1hr 21min
                    </td>
                    <td className="px-4 py-3">
                      23
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">3</td>
                    <td className="px-4 py-3">
                      London, UK
                    </td>
                    <td className="px-4 py-3">
                      <FaApple className="w-5 h-5 text-gray-600"/>
                    </td>
                    <td className="px-4 py-3">
                      1hr 21min
                    </td>
                    <td className="px-4 py-3">
                      23
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">4</td>
                    <td className="px-4 py-3">
                      Mumbai, IN
                    </td>
                    <td className="px-4 py-3">
                      <FaAndroid className="w-5 h-5 text-gray-600"/>
                    </td>
                    <td className="px-4 py-3">
                      1hr 21min
                    </td>
                    <td className="px-4 py-3">
                      23
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;
