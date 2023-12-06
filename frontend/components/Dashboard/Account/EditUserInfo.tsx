import React, { useState } from "react";
import Card from "@/UI/Card";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Input from "@/UI/Input";

const EditUserInfo = ({
  name,
  email
}: {
  name: string;
  email: string;
}) => {
  let [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [userInfo, setUserInfo] = useState({
    name: name,
    email: email,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    fetchData(
      "put",
      `users/info`,
      JSON.stringify(userInfo)
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
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(userInfo);
    
  };
  return (
    <Card title="Profile Info">
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-gray-700 font-semibold">
            Full Name
            <span className="font-normal text-red-600 text-xl">*</span>
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Enter title for link"
            value={userInfo.name}
            onChange={handleOnChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">
            Email
            <span className="font-normal text-red-600 text-xl">*</span>
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Enter the email"
            value={userInfo.email}
            onChange={handleOnChange}
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

export default EditUserInfo;
