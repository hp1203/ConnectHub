"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { LinkType } from "@/Constants/types";
import { LuChevronDown, LuExternalLink } from "react-icons/lu";
import Link from "next/link";
import useAnalytics from "@/hooks/useAnalytics";

const PublicLinkCard: React.FC<LinkType> = ({
  title,
  icon,
  description,
  url,
  _id,
  tags,
  theme
}) => {
  icon = JSON.parse(icon);
  const { registerEvent } = useAnalytics();
  // const logClickEvent = () => {
  //   registerEvent(_id, "click", "")
  // }
  return (
    <div 
      className={`w-full rounded-lg p-2 shadow-md border m-1 disclosure`}
      style={{
        "--disclosureBg": theme.bgColor,
        "--disclosureFont": theme.fontColor
      } as React.CSSProperties}
    >
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button 
              className={"flex w-full justify-between items-center rounded-lg px-4 py-2 text-left text-sm font-semibold disclosure-btn"}
              style={{
                "--disclosureBtnColor": theme.bgColor,
                "--disclosureTitleColor": theme.titleColor,
                "--disclosureBtnHoverBg": theme.hoverColor
              } as React.CSSProperties}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{icon?.character}</span>
                <span>{title}</span>
              </div>
              <LuChevronDown
                className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="text-sm flex flex-col p-2 text-gray-500">
              <p className="mb-3 py-2 text-sm font-normal text-gray-700">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
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
              <Link
                href={url}
                target="_blank"
                className="w-full text-sm hover:text-blue-500 pt-2 border-t text-gray-500 border-gray-100 flex items-center justify-center gap-1"
                onClick={() => registerEvent(_id, "click")}
              >
                <LuExternalLink className="w-4 h-4" />
                <span className="text-sm">Visit</span>
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PublicLinkCard;
