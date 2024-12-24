"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { MdCheckCircle, MdOutlineFileDownload } from "react-icons/md";
import Button from "@/UI/Button";
import { redirect, useRouter } from "next/navigation";

const Success = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const router = useRouter();

  return (
    <Content title="Upgrade">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <Card>
            <div className="flex flex-col items-center justify-center py-8 border-b border-gray-100 mx-2">
              <div className="relative flex items-center justify-center mb-7">
                <div className="bg-green-300 w-12 h-12 animate-ping rounded-full" />
                <MdCheckCircle className="absolute h-12 w-12 text-green-600" />
              </div>
              <p className="text-2xl font-semibold text-gray-700 text-center mb-2">
                Payment Success!
              </p>
              <p className="text-base text-gray-500 text-center mb-2">
                Your payment has been successfully done.
              </p>
            </div>
            <div className="py-6 px-3 border-b border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-500 text-center mb-2">
                  Ref Number
                </p>
                <p className="text-base text-gray-600 text-center font-medium">
                  000085752257
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-500 text-center mb-2">
                  Payment Time
                </p>
                <p className="text-base text-gray-600 text-center font-medium">
                  25-02-2025 13:22:16
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-500 text-center mb-2">
                  Payment Method
                </p>
                <p className="text-base text-gray-600 text-center font-medium">
                  Bank Transfer
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-500 text-center mb-2">
                  Sender Name
                </p>
                <p className="text-base text-gray-600 text-center font-medium">
                  Himanshu Purohit
                </p>
              </div>
            </div>
            <div className="py-6 px-3 border-b border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-500 text-center mb-2">
                  Amount
                </p>
                <p className="text-base text-gray-600 text-center font-medium">
                  $ 9.99
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-500 text-center">Admin Fee</p>
                <p className="text-base text-gray-600 text-center font-medium">
                  $ 0.99
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="mt-4 border-0 py-2 flex items-center place-self-center space-x-2 text-gray-600">
                <MdOutlineFileDownload className="w-6 h-6" />
                <span className="text-gray-600">Get PDF Receipt</span>
              </button>
              <Button style="primary" onClick={() => router.push("/admin")}>
                Go to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Content>
  );
};

export default Success;
