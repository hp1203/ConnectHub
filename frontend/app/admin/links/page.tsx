"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/UI/Button";
import AddLink from "@/components/Dashboard/AddLink";
import Content from "@/components/Dashboard/Content";
import LinkCard from "@/components/Dashboard/LinkCard";
import useApi from "@/hooks/useApi";
const Links: React.FC = () => {
  const {data: session} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = useApi(session?.token);
  const [links, setLinks] = useState([]);
  useEffect(() => { 
    const fetchLinks = () => {
      setIsLoading(true);
      fetchData("get", `links/profile/${session?.user?.profiles[0]?._id}`).then((response) => {
        setLinks(response.data.links);
        setIsLoading(false);
      }).catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
    }

    fetchLinks();
  },[session]);
  return (
    <Content 
      title="Links" 
      right={
        <div>
          <AddLink/>
        </div>
      }
    >
      <div className="h-screen grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
          {
            links.length > 0 && links.map((link) => (
              <LinkCard link={link} />
            ))
          }
        </div>
        <div className="border col-span-2 overflow-y-scroll bg-white rounded-lg shadow scrollbar-hide mt-1">
          <div className="p-4 border-b border-gray-100">
            <h1 className="text-base font-semibold text-gray-800">Preview</h1>
          </div>
        </div>
      </div>
    </Content>
  )
}

export default Links;
