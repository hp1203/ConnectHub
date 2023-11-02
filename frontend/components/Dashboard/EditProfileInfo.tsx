import React, { useState } from "react";
import Card from "@/UI/Card";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Input from "@/UI/Input";
import Textarea from "@/UI/Textarea";

const EditProfileInfo = ({
  title,
  url,
  description,
}: {
  title: string;
  url: string;
  description: string;
}) => {
  let [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [profileInfo, setProfileInfo] = useState({
    profileTitle: title,
    url: url,
    bio: description,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    fetchData(
      "put",
      `users/profile/${session?.user?.profiles[0]?._id}`,
      JSON.stringify(profileInfo)
    )
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(profileInfo);
    
  };
  return (
    <Card title="Profile Info">
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-gray-700 font-semibold">
            Title
            <span className="font-normal text-red-600 text-xl">*</span>
          </label>
          <Input
            type="text"
            name="profileTitle"
            placeholder="Enter title for link"
            value={profileInfo.profileTitle}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            URL
            <span className="font-normal text-red-600 text-xl">*</span>
          </label>
          <Input
            type="text"
            name="url"
            placeholder="Enter the url"
            value={profileInfo.url}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Description
          </label>
          <Textarea
            name="bio"
            placeholder="Enter good description for your link"
            value={profileInfo.bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleOnChange(e)
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-gray-100 mt-4 pt-4">
        <Button
          style="primary"
          isLoading={isLoading}
          disabled={isLoading}
          onClick={handleUpdate}
        >
          Update
        </Button>
      </div>
    </Card>
  );
};

export default EditProfileInfo;
