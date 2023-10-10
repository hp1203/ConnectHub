"use client";
import { LinkType } from "@/Constants/types";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import React, { useState } from "react";
import { LuBarChart3, LuClipboardEdit, LuShare2, LuTrash2 } from "react-icons/lu";
import DeleteLink from "./DeleteLink";

const LinkCard: React.FC<LinkType> = ({ title, icon, description, url, isPublic, _id }) => {
  const [enabled, setEnabled] = useState(isPublic);
  return (
    <div className="flex flex-col shadow rounded-lg bg-white w-full h-fit">
      <div className="flex gap-4 items-center border-b border-gray-100 p-3">
        <div className="bg-gray-50 w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full">
          <span className="text-2xl">{icon || "\ud83d\ude00"}</span>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="font-semibold text-gray-800">{title}</p>
          <span className="text-sm text-gray-500">
            <Link href={url} target="_blank">
              {url}
            </Link>
          </span>
        </div>
        <div className="pr-2">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? "bg-blue-600" : "bg-gray-300"}
          relative inline-flex h-[22px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
      </div>
      <div className="p-4 text-gray-600 font-normal text-sm">
        {description}
      </div>
      <div className="flex border-t border-gray-100 divide-x divide-gray-100">
        <button className="flex items-center justify-center p-3 w-full gap-2">
            <LuBarChart3 className="w-4 h-4 text-gray-500"/>
            <span className="text-gray-600 text-sm font-medium">9 Clicks</span>
        </button>
        <button className="flex items-center justify-center p-3 w-full gap-2">
            <LuShare2 className="w-4 h-4 text-gray-500"/>
            <span className="text-gray-600 text-sm font-medium">Share</span>
        </button>
        <button className="flex items-center justify-center p-3 w-full gap-2">
            <LuClipboardEdit className="w-4 h-4 text-gray-500"/>
            <span className="text-gray-600 text-sm font-medium">Edit</span>
        </button>
        <DeleteLink linkId={_id}/>
      </div>
    </div>
  );
};

export default LinkCard;
