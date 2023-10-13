"use client";
import useApi from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaDiscord,
  FaSquareThreads,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { LinkType } from "@/Constants/types";
import PublicLinkCard from "@/components/PublicLinkCard";
const PublicProfile = ({ params }: { params: { profileId: string } }) => {
  const { fetchData } = useApi();
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = () => {
      setIsLoading(true);
      fetchData("get", `users/profile/${params.profileId}`)
        .then((response) => {
          setProfile(response.data.profile);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    const fetchProfileLinks = () => {
      setIsLoading(true);
      fetchData("get", `links/profile/${params.profileId}`)
        .then((response) => {
          setLinks(response.data.links);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    fetchProfileData();
    fetchProfileLinks();
  }, [params]);
  return (
    <div className="min-h-screen bg-cover bg-[url(https://images.unsplash.com/photo-1693389107440-afe980ccbb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] h-full p-12">
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className="flex gap-6">
          <Image
            width={300}
            height={300}
            className="h-44 w-44 rounded-lg shadow-md"
            src={
              profile?.profilePicture ||
              `https://eu.ui-avatars.com/api/?name=${
                profile?.profileTitle || profile?.user?.name
              }&size=250&background=f5f5f5&color=3B82F6`
            }
            alt={profile?.profileTitle || profile?.user?.name}
          />
          <div className="flex flex-col gap-3 bg-white shadow-md rounded-lg p-4">
            <h1 className="text-gray-600 font-semibold text-2xl">
              {profile?.profileTitle || profile?.user?.name}
            </h1>
            <p className="text-sm text-gray-500 pr-8 line-clamp-3">{profile?.bio || ""}</p>
            <div className="flex gap-3 items-center mt-2">
              {profile?.socialLinks?.website && (
                <Link
                  href={profile?.socialLinks?.website}
                  target="_blank"
                  title="Website"
                >
                  <FaGlobe className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                </Link>
              )}
              {profile?.socialLinks?.facebook && (
                <Link
                  href={profile?.socialLinks?.facebook}
                  target="_blank"
                  title="Facebook"
                >
                  <FaFacebook className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                </Link>
              )}
              {profile?.socialLinks?.twitter && (
                <Link
                  href={profile?.socialLinks?.twitter}
                  target="_blank"
                  title="Twitter"
                >
                  <FaTwitter className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                </Link>
              )}
              {profile?.socialLinks?.instagram && (
                <Link
                  href={profile?.socialLinks?.instagram}
                  target="_blank"
                  title="Instagram"
                >
                  <AiFillInstagram className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                </Link>
              )}
              {profile?.socialLinks?.linkedin && (
                <Link
                  href={profile?.socialLinks?.linkedin}
                  target="_blank"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <p className="text-center font-semibold text-gray-700 text-xl pt-3">Get to know more about me</p>
        <div className="py-4 flex-1 h-full mb-3">
          {links.length > 0 && isLoading == false && (
            <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide">
              {links.map((link) => (
                <>
                <PublicLinkCard {...link} key={link?._id.toString()} />
                </>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-6 items-center justify-center bottom-0">
          <div className="flex flex-col justify-center items-center -space-y-6">
            <a
              className="text-gray-700 font-museomoderno text-lg font-bold md:text-2xl mb-6"
              href="#"
            >
              ConnectHub
            </a>
            <span className="text-gray-600 font-museomoderno text-xs tracking-wider font-light">
              Elevate Your Online Presence
            </span>
          </div>
          <div className="flex space-x-6 items-center justify-center">
            <Link href="" target="_blank" title="Facebook">
              <FaFacebook className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600 transition duration-150" />
            </Link>
            <Link href="" target="_blank" title="Twitter">
              <FaTwitter className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600 transition duration-150" />
            </Link>
            <Link href="" target="_blank" title="Instagram">
              <AiFillInstagram className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600 transition duration-150" />
            </Link>
            <Link href="" target="_blank" title="Threads">
              <FaSquareThreads className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600 transition duration-150" />
            </Link>
            <Link href="" target="_blank" title="Discord">
              <FaDiscord className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600 transition duration-150" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
