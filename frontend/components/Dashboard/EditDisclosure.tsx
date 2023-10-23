import React, { useState } from "react";
import Card from "@/UI/Card";
import ColorPicker from "@/UI/ColorSelector";
import { RadioGroup } from "@headlessui/react";
import { IoMdColorFilter } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { MdGradient, MdOutlineOndemandVideo } from "react-icons/md";
import UpgradePlan from "./UpgradePlan";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";

const EditDisclosure = ({
  initialBgColor,
  initialHoverColor,
  initialTitleColor,
  initialFontColor,
}: {
  initialBgColor: string;
  initialHoverColor: string;
  initialFontColor: string;
  initialTitleColor: string;
}) => {
  let [isLoading, setIsLoading] = useState(false);
  let [bgColor, setBgColor] = useState(initialBgColor);
  let [hoverColor, setHoverColor] = useState(initialHoverColor);
  let [fontColor, setFontColor] = useState(initialFontColor);
  let [titleColor, setTitleColor] = useState(initialTitleColor);

  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const handleUpdate = async () => {
    setIsLoading(true);
    fetchData(
      "put",
      `theme/${session?.user?.profiles[0]?._id}`,
      JSON.stringify({
        disclosure: {
          bgColor,
          hoverColor,
          titleColor,
          fontColor,
        },
      })
    )
      .then((response) => {})
      .catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
  };
  return (
    <Card title="Link Disclosure">
      <div className="flex flex-wrap items-center gap-8 mt-3">
        <div className="flex flex-col">
          <p className="font-semibold py-2 text-gray-700">Background Color</p>
          <ColorPicker color={bgColor} onChange={setBgColor} label="Color" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold py-2 text-gray-700">Hover Color</p>
          <ColorPicker color={hoverColor} onChange={setHoverColor} label="Color" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold py-2 text-gray-700">Font Color</p>
          <ColorPicker color={fontColor} onChange={setFontColor} label="Color" />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold py-2 text-gray-700">Title Color</p>
          <ColorPicker color={titleColor} onChange={setTitleColor} label="Color" />
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

export default EditDisclosure;
