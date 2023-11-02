"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AddLink from "@/components/Dashboard/AddLink";
import Content from "@/components/Dashboard/Content";
import LinkCard from "@/components/Dashboard/LinkCard";
import useApi from "@/hooks/useApi";
import { LinkType } from "@/Constants/types";
import Image from "next/image";
import { RiLoader3Fill } from "react-icons/ri";
import Card from "@/UI/Card";
import Loading from "@/components/Dashboard/Loading";

const Links: React.FC = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = useApi(session?.token || "");
  const [links, setLinks] = useState<LinkType[]>([]);
  useEffect(() => {
    const fetchLinks = () => {
      setIsLoading(true);
      fetchData("get", `links/profile/${session?.user?.profiles[0]?._id}`)
        .then((response) => {
          setLinks(response.data.links);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
        });
    };
    if (session?.token) {
      fetchLinks();
    }
  }, [session]);
  return (
    <Content
      title="Links"
      right={
        <div>
          <AddLink />
        </div>
      }
    >
      <div className="h-screen grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        {isLoading && (
          <div className="flex flex-1 flex-col col-span-3 rounded-lg border border-gray-200 mt-1 items-center justify-center gap-3">
            <Loading title="Fetching Links..." subtitle="Hold on! We're getting your links."/>
          </div>
        )}
        {links.length <= 0 && isLoading == false && (
          <div className="flex flex-1 flex-col col-span-3 rounded-lg border border-gray-200 mt-1 items-center justify-center gap-3">
            <Image
              src="/empty-links.png"
              width={250}
              height={250}
              className="w-72 h-auto"
              alt="empty list"
            />
            <p className="text-2xl text-gray-700 font-semibold">
              No links found!
            </p>
            <p className="text-gray-500 font-normal max-w-md text-center">
              You have no active links right now. Create some to showcase.
            </p>
            <AddLink />
          </div>
        )}
        {links.length > 0 && isLoading == false && (
          <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
            {links.map((link) => (
              <LinkCard {...link} key={link?._id.toString()} />
            ))}
          </div>
        )}
        <div className="col-span-2 mt-1">
        <Card title="Preview" className="overflow-y-scroll scrollbar-hide">
            <p>Preview Here</p>
        </Card>
        </div>
      </div>
    </Content>
  );
};

export default Links;
