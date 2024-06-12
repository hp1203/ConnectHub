"use client";
import useApi from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { LinkType } from "@/Constants/types";
import PublicLinkCard from "@/components/PublicLinkCard";
import Loading from "@/components/Dashboard/Loading";
const PublicProfile = ({ params }: { params: { profileUrl: string } }) => {
  const { fetchData } = useApi();
  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<any>(null);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    const fetchProfileData = () => {
      setIsLoading(true);
      fetchData("get", `users/profile/${params.profileUrl}`)
        .then((response) => {
          setProfile(response.data.profile);
          setLinks(response.data.links);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    if (params?.profileUrl && profile == null) {
      fetchProfileData();
    }
  }, [params]);

  useEffect(() => {
    const fetchStyle = () => {
      setIsLoading(true);
      fetchData("get", `theme/${profile._id}`)
        .then((response) => {
          setTheme(response.data.theme);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };
    if (profile) {
      fetchStyle();
    }
  }, [profile]);

  if (isLoading || profile == null || theme == null) {
    return <Loading title="Getting Profile..." subtitle="Hold on! We're getting the profile info."/>;
  }

  return (
    <div
      className={`min-h-screen bg-cover ${
        theme.background.bgType == "color" && `public-profile-flat-bg`
      } ${
        theme.background.bgType == "gradient" && `public-profile-gradient-bg`
      } ${
        theme.background.bgType == "image" && `public-profile-image-bg`
      } public-profile h-full p-12`}
      style={
        {
          "--profileFontColor": theme.font.color,
          "--profileBg": theme.background.color[0],
          "--profileBg2": theme.background.color[1] || "",
          "--profileBgImage": theme.background.url
            ? `url(${theme.background.url})`
            : null,
        } as React.CSSProperties
      }
    >
      <div className="max-w-4xl md:px-8 mx-auto flex flex-col justify-between">
        {isLoading == false && (
          <div className="flex flex-col items-center justify-center gap-4 p-2">
            {imageError ? (
              <Image
                width={300}
                height={300}
                className="h-32 w-32 rounded-full shadow-md object-cover"
                src={`https://eu.ui-avatars.com/api/?name=${
                    profile?.profileTitle || profile?.user?.name
                  }&size=250&background=f5f5f5&color=${theme.disclosure.titleColor.slice(
                    1
                  )}`
                }
                alt={profile?.profileTitle || profile?.user?.name || ""}
              />
            ) : (
              <Image
                width={300}
                height={300}
                className="h-32 w-32 rounded-full shadow-md object-cover"
                src={
                  (profile?.profilePicture &&
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                      profile?.profilePicture) ||
                  `https://eu.ui-avatars.com/api/?name=${
                    profile?.profileTitle || profile?.user?.name
                  }&size=250&background=f5f5f5&color=${theme.disclosure.titleColor.slice(
                    1
                  )}`
                }
                alt={profile?.profileTitle || profile?.user?.name || ""}
                onError={handleImageError}
              />
            )}

            <div className="flex flex-1 flex-col gap-3">
              <h1 className="font-semibold text-center text-2xl">
                {profile?.profileTitle || profile?.user?.name}
              </h1>
              {profile?.bio && (
                <p className="text-sm text-center line-clamp-2 px-8">
                  {profile?.bio || ""}
                </p>
              )}
              {profile?.socialLinks && (
                <div className="flex gap-3 items-center justify-center mt-2">
                  {profile?.socialLinks?.website && (
                    <Link
                      href={profile?.socialLinks?.website}
                      target="_blank"
                      title="Website"
                    >
                      <FaGlobe
                        className={`w-5 h-5 cursor-pointer profiles-icon transition duration-150`}
                        style={
                          {
                            "--disclosureTitleColor":
                              theme.disclosure.titleColor,
                            "--profileFontColor": theme.font.color,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
                  )}
                  {profile?.socialLinks?.facebook && (
                    <Link
                      href={profile?.socialLinks?.facebook}
                      target="_blank"
                      title="Facebook"
                    >
                      <FaFacebook
                        className={`w-5 h-5 cursor-pointer profiles-icon transition duration-150`}
                        style={
                          {
                            "--disclosureTitleColor":
                              theme.disclosure.titleColor,
                            "--profileFontColor": theme.font.color,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
                  )}
                  {profile?.socialLinks?.twitter && (
                    <Link
                      href={profile?.socialLinks?.twitter}
                      target="_blank"
                      title="Twitter"
                    >
                      <FaTwitter
                        className={`w-5 h-5 cursor-pointer profiles-icon transition duration-150`}
                        style={
                          {
                            "--disclosureTitleColor":
                              theme.disclosure.titleColor,
                            "--profileFontColor": theme.font.color,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
                  )}
                  {profile?.socialLinks?.instagram && (
                    <Link
                      href={profile?.socialLinks?.instagram}
                      target="_blank"
                      title="Instagram"
                    >
                      <AiFillInstagram
                        className={`w-5 h-5 cursor-pointer profiles-icon transition duration-150`}
                        style={
                          {
                            "--disclosureTitleColor":
                              theme.disclosure.titleColor,
                            "--profileFontColor": theme.font.color,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
                  )}
                  {profile?.socialLinks?.linkedin && (
                    <Link
                      href={profile?.socialLinks?.linkedin}
                      target="_blank"
                      title="LinkedIn"
                    >
                      <FaLinkedin
                        className={`w-5 h-5 cursor-pointer profiles-icon transition duration-150`}
                        style={
                          {
                            "--disclosureTitleColor":
                              theme.disclosure.titleColor,
                            "--profileFontColor": theme.font.color,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="py-4 flex flex-col h-full flex-1 mb-3">
          <p className="text-center font-semibold text-xl pt-3 pb-5">
            Get to know more about me
          </p>
          {links.length > 0 && isLoading == false && (
            <div className="flex flex-1 flex-col space-y-4 col-span-3 overflow-y-scroll scrollbar-hide pr-2">
              {links.map((link) => (

                  <PublicLinkCard
                    {...link}
                    key={link?._id.toString()}
                    theme={theme.disclosure}
                  />

              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-6 items-center justify-center mt-28">
          <div className="flex flex-col justify-center items-center -space-y-6">
            <a
              className=" font-museomoderno text-lg font-bold md:text-2xl mb-6"
              href="#"
            >
              ConnectHub
            </a>
            <span className=" font-museomoderno text-xs tracking-wider font-light">
              Elevate Your Online Presence
            </span>
          </div>
          {/* <div className="flex space-x-6 items-center justify-center">
            <Link href="" target="_blank" title="Facebook">
              <FaFacebook className=`w-5 h-5 cursor-pointer  hover:text-[${theme.disclosure.titleColor.slice(1)}] transition duration-150` />
            </Link>
            <Link href="" target="_blank" title="Twitter">
              <FaTwitter className=`w-5 h-5 cursor-pointer  hover:text-[${theme.disclosure.titleColor.slice(1)}] transition duration-150` />
            </Link>
            <Link href="" target="_blank" title="Instagram">
              <AiFillInstagram className=`w-5 h-5 cursor-pointer  hover:text-[${theme.disclosure.titleColor.slice(1)}] transition duration-150` />
            </Link>
            <Link href="" target="_blank" title="Threads">
              <FaSquareThreads className=`w-5 h-5 cursor-pointer  hover:text-[${theme.disclosure.titleColor.slice(1)}] transition duration-150` />
            </Link>
            <Link href="" target="_blank" title="Discord">
              <FaDiscord className=`w-5 h-5 cursor-pointer  hover:text-[${theme.disclosure.titleColor.slice(1)}] transition duration-150` />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
