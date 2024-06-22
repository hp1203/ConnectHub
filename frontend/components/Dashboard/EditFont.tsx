import React, { useState } from "react";
import Card from "@/UI/Card";
import ColorPicker from "@/UI/ColorSelector";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";

const EditFont = ({
  initialFontColor,
  reloadPreview
}: {
  initialFontColor: string;
  reloadPreview: any;
}) => {
  let [isLoading, setIsLoading] = useState(false);
  let [fontColor, setFontColor] = useState(initialFontColor);

  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const handleUpdate = async () => {
    setIsLoading(true);
    fetchData(
      "put",
      `theme/${session?.user?.profiles[0]?._id}`,
      JSON.stringify({
        font: {
          color: fontColor,
        },
      })
    )
      .then((response) => {
        setIsLoading(false);
        if(response.data.success){
          reloadPreview(true);
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
  };
  return (
    <Card title="Fonts">
      <div className="flex flex-wrap items-center gap-8 mt-3">
        <div className="flex flex-col">
          <p className="font-semibold py-2 text-gray-700">Font Color</p>
          <ColorPicker color={fontColor} onChange={setFontColor} label="Color" />
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

export default EditFont;
