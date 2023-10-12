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
const PublicProfile = ({ params }: { params: { profileId: string } }) => {
  const { fetchData } = useApi();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchData("get", `users/profile/${params.profileId}`)
      .then((response) => {
        console.log(response.data);

        setProfile(response.data.profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);
  return (
    <div className="bg-[url(https://images.unsplash.com/photo-1693389107440-afe980ccbb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] min-h-full p-12">
      <div className="max-w-6xl mx-auto flex flex-col bg-white shadow-md rounded-lg divide-y divide-gray-100">
        <div className="flex gap-6 p-8">
          <Image
            width={250}
            height={250}
            className="h-52 w-52 rounded-full"
            src={
              profile?.profilePicture ||
              `https://eu.ui-avatars.com/api/?name=${
                profile?.profileTitle || profile?.user?.name
              }&size=250&background=f5f5f5&color=3B82F6`
            }
            alt={profile?.profileTitle || profile?.user?.name}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-gray-700 font-semibold text-2xl">
              {profile?.profileTitle || profile?.user?.name}
            </h1>
            <p className="text-sm text-gray-500 pr-32">{profile?.bio || ""}</p>
            <div className="flex gap-2 items-center">
                {
                    profile?.socialLinks?.website && 
                    <Link href={profile?.socialLinks?.website} target="_blank" title="Website">
                        <FaGlobe className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                    </Link>
                }
                {
                    profile?.socialLinks?.facebook && 
                    <Link href={profile?.socialLinks?.facebook} target="_blank" title="Facebook">
                        <FaFacebook className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                    </Link>
                }
                {
                    profile?.socialLinks?.twitter && 
                    <Link href={profile?.socialLinks?.twitter} target="_blank" title="Twitter">
                        <FaTwitter className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                    </Link>
                }
                {
                    profile?.socialLinks?.instagram && 
                    <Link href={profile?.socialLinks?.instagram} target="_blank" title="Instagram">
                        <AiFillInstagram className="w-6 h-6 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                    </Link>
                }
                {
                    profile?.socialLinks?.linkedin && 
                    <Link href={profile?.socialLinks?.linkedin} target="_blank" title="LinkedIn">
                        <FaLinkedin className="w-5 h-5 cursor-pointer text-gray-400 hover:text-blue-600 transition duration-150" />
                    </Link>
                }
            </div>
          </div>
        </div>
        <div className="">
            Links HEre
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
