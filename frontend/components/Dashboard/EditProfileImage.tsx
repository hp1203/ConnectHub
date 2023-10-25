import React, { useState } from "react";
import Card from "@/UI/Card";
import { AiFillInstagram } from "react-icons/ai";
import { FaGlobe, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useFilePicker } from 'use-file-picker';
import { FileAmountLimitValidator, FileSizeValidator, ImageDimensionsValidator } from 'use-file-picker/validators';
import axios from "axios";

const EditProfileImage = ({ profilePicture }: { profilePicture: string }) => {
  let [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [profileImage, setProfileImage] = useState(profilePicture);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileSizeValidator({ maxFileSize: 10 * 1024 * 1024 /* 10 MB */ }),
    ],
    onFilesSelected: ({ filesContent, errors }) => {
        // this callback is always called, even if there are errors
        console.log('onFilesSelected', filesContent[0].content, errors);
        setProfileImage(filesContent[0]?.content);
      },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    console.log("Error", errors);
    
    return <div>Error...</div>;
  }

  if(filesContent){
    console.log("File Content", filesContent);
    console.log("ProfilePicture", profilePicture);
  }

  if(profileImage){
    console.log("ProfilePicture", profilePicture);
  }



  // #####################################
  // ## Getting Image Is Required ERROR! #
  // #####################################
  const handleUpdate = async () => {
    const uri = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(true);
    axios({
      method: "post",
      url: `${uri}users/profile/${session?.user?.profiles[0]?._id}/image`,
      data: filesContent,
      headers: {
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        "Authorization": `Bearer ${session?.token}`,
      }
    })
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

  return (
    <Card title="Picture">
      <div className="flex gap-3">
        <Image
          width={300}
          height={300}
          className="h-44 w-44 border border-gray-100 rounded-full shadow-sm object-contain"
          src={
            filesContent.length > 0 && filesContent[0].content || 
            profilePicture ||
            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7Dh7qCWBSGcz4WlVVeVvK9A3cotmHme5aQ&usqp=CAU`
          }
          alt="Profile Picture"
        />
        <div className="flex flex-col justify-center gap-2">
          <Button style="primary" onClick={async () => openFilePicker()}>
            Pick Image
          </Button>
          {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          <img alt={file.name} src={file.content}></img>
          <br />
        </div>
      ))}
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

export default EditProfileImage;
