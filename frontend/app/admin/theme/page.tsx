"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import EditBackground from "@/components/Dashboard/EditBackground";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import EditDisclosure from "@/components/Dashboard/EditDisclosure";
import EditFont from "@/components/Dashboard/EditFont";
import Loading from "@/components/Dashboard/Loading";
import LivePreview from "@/components/Dashboard/Preview";

const Appearance = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);

  const [theme, setTheme] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState<string>(`${process.env.NEXTAUTH_URL}/${session?.user?.profiles[0]?.url}`);
  const [reload, setReload] = useState<boolean>(false);

  // Simulate URL change and reload trigger
  useEffect(() => {
    setUrl(`${process.env.NEXTAUTH_URL}/${session?.user?.profiles[0]?.url}`);
    setReload(true);

    // Reset reload flag after useEffect to allow future reloads
    const timer = setTimeout(() => setReload(false), 1000);
    return () => clearTimeout(timer);
  }, [url]);

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

    if (session?.token && theme == null) {
      fetchTheme();
    }
  }, []);


  return (
    <Content title="Edit Theme">
      <div className="h-screen grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
        {isLoading ? (
          <div className="flex flex-1 flex-col col-span-3 rounded-lg border border-gray-200 mt-1 items-center justify-center gap-3">
            <Loading
              title="Fetching Data..."
              subtitle="Hold on! We're getting your datas."
            />
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4 col-span-3 overflow-y-scroll scrollbar-hide p-1">
            <EditBackground
              initialColor={theme?.background?.color}
              initialOption={theme?.background?.bgType}
              initialUrl={theme?.background?.url || ""}
              reloadPreview={setReload}
            />
            <EditDisclosure
              initialBgColor={theme?.disclosure.bgColor}
              initialFontColor={theme?.disclosure.fontColor}
              initialTitleColor={theme?.disclosure.titleColor}
              initialHoverColor={theme?.disclosure.hoverColor}
              reloadPreview={setReload}
            />
            <EditFont initialFontColor={theme?.font.color} reloadPreview={setReload}/>
          </div>
        )}
        <div className="col-span-2 mt-1">
          <LivePreview url={`${process.env.NEXTAUTH_URL}/${session?.user?.profiles[0]?.url}`} reload={reload}/>
        </div>
      </div>
    </Content>
  );
};

export default Appearance;
