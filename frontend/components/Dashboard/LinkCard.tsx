import { LinkType } from "@/Constants/types";
import Link from "next/link";
import React from "react";
import {
  LuBarChart3,
  LuShare2,
} from "react-icons/lu";
import DeleteLink from "./DeleteLink";
import EditLink from "./EditLink";

const LinkCard: React.FC<LinkType> = ({
  title,
  icon,
  description,
  url,
  isPublic,
  _id,
  tags,
}) => {
  console.log("Ion",typeof icon);
  icon = JSON.parse(icon);
  return (
    <div className="flex flex-col shadow rounded-lg bg-white w-full h-fit">
      <div className="flex gap-4 items-center border-b border-gray-100 p-3">
        <div className="bg-gray-50 w-12 h-12 flex items-center justify-center border border-gray-100 rounded-full">
          <span className="text-2xl">{icon.character}</span>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="font-semibold text-gray-800">{title}</p>
          <span className="text-sm text-gray-500">
            <Link href={url} target="_blank">
              {url}
            </Link>
          </span>
        </div>
      </div>
      <div className="p-4 text-gray-600 font-normal text-sm">{description}</div>
      <div className="flex flex-wrap gap-2 px-3 mb-3">
        {tags &&
          tags.map((tag) => (
            <p
              key={tag}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 font-medium tracking-wide text-xs"
            >
              #{tag}
            </p>
          ))}
      </div>
      <div className="flex border-t border-gray-100 divide-x divide-gray-100">
        <button className="flex items-center justify-center p-3 w-full gap-2">
          <LuBarChart3 className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 text-sm font-medium">9 Clicks</span>
        </button>
        <button className="flex items-center justify-center p-3 w-full gap-2">
          <LuShare2 className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 text-sm font-medium">Share</span>
        </button>
        <EditLink
          title={title}
          icon={icon}
          description={description}
          url={url}
          isPublic={isPublic}
          _id={_id}
          tags={tags}
        />
        <DeleteLink linkId={_id} />
      </div>
    </div>
  );
};

export default LinkCard;
