"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditProfileInfo from "@/components/Dashboard/EditProfileInfo";
import EditSocialMedia from "@/components/Dashboard/EditSocialMedia";
import EditProfileImage from "@/components/Dashboard/EditProfileImage";
import Loading from "@/components/Dashboard/Loading";
import LivePreview from "@/components/Dashboard/Preview";

const Settings = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [reload, setReload] = useState<boolean>(false);
  // Simulate URL change and reload trigger
  useEffect(() => {
    setReload(true);

    // Reset reload flag after useEffect to allow future reloads
    const timer = setTimeout(() => setReload(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const fetchProfile = () => {
      setIsLoading(true);
      fetchData("get", `users/profile/${session?.user?.profiles[0]?.url}`)
        .then((response) => {
          setProfile(response.data.profile);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
        });
      // console.log("pro", profile);
    };

    if (session?.token && profile == null) {
      fetchProfile();
    }
  }, [session]);

  return (
    <Content title="Settings">
      <div className="h-screen grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        {isLoading ? (
          <div className="flex flex-1 flex-col col-span-3 rounded-lg border border-gray-200 mt-1 items-center justify-center gap-3">
            <Loading
              title="Fetching Data..."
              subtitle="Hold on! We're getting your settings."
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
            <EditProfileImage 
              profilePicture={profile?.profilePicture}
              reloadPreview={setReload}
            />
            <EditProfileInfo
              title={profile?.profileTitle}
              url={profile?.url}
              description={profile?.bio}
              reloadPreview={setReload}
            />
            <EditSocialMedia {...profile?.socialLinks} reloadPreview={setReload}/>
          </div>
        )}
        <div className="col-span-2 mt-1">
          <LivePreview url={`${window.location.origin}/${session?.user?.profiles[0]?.url}`} reload={reload}/>
        </div>
      </div>
    </Content>
  );
};

export default Settings;
