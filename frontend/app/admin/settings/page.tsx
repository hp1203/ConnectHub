"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import EditBackground from "@/components/Dashboard/EditBackground";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditDisclosure from "@/components/Dashboard/EditDisclosure";
import EditFont from "@/components/Dashboard/EditFont";
import EditProfileInfo from "@/components/Dashboard/EditProfileInfo";

const Settings = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
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
        console.log("pro",profile);
        
    };

    if (session?.token) {
      fetchProfile();
    }
  }, [session]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Content title="Settings">
      <div className="h-screen grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
          <EditProfileInfo title={profile?.profileTitle} url={profile?.url} description={profile?.bio}/>
        </div>
        <div className="col-span-2 mt-1">
          <Card title="Preview" className="overflow-y-scroll scrollbar-hide">
            <p>Preview Here</p>
          </Card>
        </div>
      </div>
    </Content>
  );
};

export default Settings;
