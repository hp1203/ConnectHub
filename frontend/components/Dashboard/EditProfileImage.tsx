import React, { useState, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import Card from "@/UI/Card";
import Button from "@/UI/Button";
import { useSession } from "next-auth/react";
import axios from "axios";

const EditProfileImage = ({ profilePicture }: { profilePicture: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
    setSelectedImage(URL.createObjectURL(file!));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    const uri = process.env.NEXT_PUBLIC_API_URL;
    const formData = new FormData();

    formData.append("images", file);
    console.log("FormData", formData);
    
    setIsLoading(true);

    axios
      .post(
        `${uri}users/profile/${session?.user?.profiles[0]?._id}/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.token}`,
          },
        }
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

  return (
    <Card title="Profile Picture">
      <div className="flex gap-3">
        <Image
          src={
            (selectedImage && selectedImage) ||
            (profilePicture &&
              process.env.NEXT_PUBLIC_BACKEND_URL + profilePicture) ||
            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7Dh7qCWBSGcz4WlVVeVvK9A3cotmHme5aQ&usqp=CAU`
          }
          alt="Selected"
          width={300}
          height={300}
          className="w-auto h-44 border rounded-lg border-gray-200 shadow-sm object-cover"
        />
        <div
          className={`border-2 border-dotted rounded-lg w-full h-44 flex flex-col items-center justify-center ${
            isDragging ? "border-blue-500" : "border-gray-200 "
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <span className="text-gray-500">
            Drag and drop an image or click to select
          </span>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-picker"
        />
        <label htmlFor="image-picker" className="cursor-pointer">
          <span className="text-blue-500">
            Or click here to select an image
          </span>
        </label>
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
