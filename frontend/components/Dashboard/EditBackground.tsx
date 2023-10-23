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
const options = [
  {
    name: "Flat Color",
    slug: "color",
    icon: <IoMdColorFilter classNam="w-10 h-10" />,
    isAllowed: true,
  },
  {
    name: "Gradient",
    slug: "gradient",
    icon: <MdGradient classNam="w-10 h-10" />,
    isAllowed: true,
  },
  {
    name: "Image",
    slug: "image",
    icon: <IoImageOutline classNam="w-10 h-10" />,
    isAllowed: false,
  },
  {
    name: "Video",
    slug: "video",
    icon: <MdOutlineOndemandVideo classNam="w-10 h-10" />,
    isAllowed: false,
  },
];

const EditBackground = ({
  initialColor,
  initialOption,
  initialUrl,
}: {
  initialColor: any;
  initialOption: string;
  initialUrl: string;
}) => {
  let [bgColors, setBgColors] = useState(initialColor);
  let [isLoading, setIsLoading] = useState(false);
  let [fileUrl, setFileUrl] = useState(initialUrl);
  let [selectedOption, setSelectedOption] = useState(
    options.find((op) => op.slug === initialOption) || options[0]
  );
  
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const selectColor1 = (color: string) => {
    setBgColors([color, ...bgColors.slice(1)]);
  };

  const selectColor2 = (color: string) => {
    setBgColors([...bgColors.slice(0, 1), color, ...bgColors.slice(2)]);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    fetchData(
      "put",
      `theme/${session?.user?.profiles[0]?._id}`,
      JSON.stringify({
        background: {
          color: bgColors,
          bgType: selectedOption.slug,
        },
      })
    )
      .then((response) => {
        setIsLoading(false);
        if(response.data.success){
            alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
  };
  return (
    <Card title="Background">
      <RadioGroup value={selectedOption} onChange={setSelectedOption}>
        <div className="flex gap-3 justify-stretch items-center py-2">
          {options.map((option) => (
            <RadioGroup.Option
              value={option}
              key={option.name}
              className="w-full"
            >
              {({ checked }) => (
                <div
                  className={`flex relative flex-col gap-2 cursor-pointer items-center justify-center w-full h-auto p-10 py-20 border rounded-lg ${
                    checked
                      ? "border-blue-500 text-blue-600"
                      : "border-gray-100 text-gray-700"
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <p className="text-base font-medium">{option.name}</p>
                  {!option.isAllowed && <UpgradePlan />}
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {selectedOption == options[0] && (
        <div className="flex flex-col mt-3">
          <p className="font-semibold py-2 text-gray-700">Color</p>
          <ColorPicker
            color={bgColors[0]}
            onChange={selectColor1}
            label="Color"
          />
        </div>
      )}

      {selectedOption == options[1] && (
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col">
            <p className="font-semibold py-2 text-gray-700">Start Color</p>
            <ColorPicker
              color={bgColors[0]}
              onChange={selectColor1}
              label="Color"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-semibold py-2 text-gray-700">End Color</p>
            <ColorPicker
              color={bgColors[1]}
              onChange={selectColor2}
              label="Color"
            />
          </div>
        </div>
      )}
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

export default EditBackground;
