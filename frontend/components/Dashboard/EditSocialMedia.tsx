import React, { useState } from "react";
import Card from "@/UI/Card";
import { AiFillInstagram } from "react-icons/ai";
import { FaGlobe, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Input from "@/UI/Input";

const EditSocialMedia = ({
    website,
    linkedin,
    twitter,
    facebook,
    instagram,
    reloadPreview
}: {
    website: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
    reloadPreview: any;
}) => {
  let [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [socialLinks, setSocialLinks] = useState({
        website,
        linkedin,
        twitter,
        facebook,
        instagram,
  });

  const handleUpdate = async () => {
    setIsLoading(true);
    fetchData(
      "put",
      `users/profile/${session?.user?.profiles[0]?._id}`,
      JSON.stringify({ socialLinks })
    )
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {
          reloadPreview(true);
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
    setSocialLinks((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Card title="Social Media">
      <div className="flex flex-col gap-3">
        <div>
          <label className="block text-gray-600 font-semibold">
            Website
          </label>
          <Input
            type="text"
            name="website"
            placeholder="Enter Website URL"
            value={socialLinks.website}
            onChange={handleOnChange}
            icon={<FaGlobe className="w-5 h-5 text-gray-500" />}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">
            LinkedIn
          </label>
          <Input
            type="text"
            name="linkedin"
            placeholder="Enter linkedin URL"
            value={socialLinks.linkedin}
            onChange={handleOnChange}
            icon={<FaLinkedin className="w-5 h-5 text-gray-500" />}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">
            Facebook
          </label>
          <Input
            type="text"
            name="facebook"
            placeholder="Enter facebook URL"
            value={socialLinks.facebook}
            onChange={handleOnChange}
            icon={<FaFacebook className="w-5 h-5 text-gray-500" />}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">
            Instagram
          </label>
          <Input
            type="text"
            name="instagram"
            placeholder="Enter instagram URL"
            value={socialLinks.instagram}
            onChange={handleOnChange}
            icon={<AiFillInstagram className="w-6 h-6 text-gray-500" />}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-semibold">
            Twitter
          </label>
          <Input
            type="text"
            name="twitter"
            placeholder="Enter twitter URL"
            value={socialLinks.twitter}
            onChange={handleOnChange}
            icon={<FaTwitter className="w-5 h-5 text-gray-500" />}
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

export default EditSocialMedia;
