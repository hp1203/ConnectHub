"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import EditBackground from "@/components/Dashboard/EditBackground";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditDisclosure from "@/components/Dashboard/EditDisclosure";

const Appearance = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const [theme, setTheme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = () => {
      setIsLoading(true);
      fetchData("get", `theme/${session?.user?.profiles[0]?._id}`)
        .then((response) => {
          setTheme(response.data.theme);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setIsLoading(false);
        });
    };

    if (session?.token) {
      fetchTheme();
    }
    console.log("Theme", theme);
  }, [session]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Content title="Appearance">
      <div className="h-screen grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
          <EditBackground
            initialColor={theme?.background?.color}
            initialOption={theme?.background?.bgType}
            initialUrl={theme?.background?.url || ""}
          />
          <EditDisclosure
            initialBgColor={theme?.disclosure.bgColor}
            initialFontColor={theme?.disclosure.fontColor}
            initialTitleColor={theme?.disclosure.titleColor}
            initialHoverColor={theme?.disclosure.hoverColor}
          />
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

export default Appearance;
