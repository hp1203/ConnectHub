"use client";
import Content from '@/components/Dashboard/Content'
import Card from "@/UI/Card";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "@/components/Dashboard/Loading";
import EditUserInfo from '@/components/Dashboard/Account/EditUserInfo';

const Account = () => {
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
      console.log("pro", profile);
    };

    if (session?.token && profile == null) {
      fetchProfile();
    }
  }, [session]);

  return (
    <Content title="My Account">

        {isLoading ? (
          <div className="flex flex-1 flex-col col-span-3 rounded-lg border border-gray-200 mt-1 items-center justify-center gap-3">
            <Loading
              title="Fetching Data..."
              subtitle="Hold on! We're getting your settings."
            />
          </div>
        ) : (
          <div className="flex max-w-3xl flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
            {/* <EditProfileImage profilePicture={profile?.profilePicture} /> */}
            <EditUserInfo
              name={profile?.profileTitle}
              email={profile?.url}
            />
          </div>
        )}
    </Content>
  )
}

export default Account
