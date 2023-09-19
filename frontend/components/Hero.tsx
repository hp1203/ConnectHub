import React from "react";
import Image from "next/image";
import Button from "@/UI/Button";

const Hero: React.FC = () => {
  return (
    <section className="h-screen pt-24 pb-16">
      <div className="container flex-col md:flex-row mx-auto h-full rounded-xl px-12 py-3 border flex bg-gradient-to-r from-blue-400 to-blue-700">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-3xl md:text-4xl max-w-md font-semibold text-gray-50 mb-10">
            Elevate Your Online Presence
          </h1>
          <p className="text-md font-medium text-gray-100 max-w-lg pr-3 mb-10">
            ConnectHub is the ultimate solution for managing your online
            identity. Seamlessly consolidate your social media profiles,
            websites, and content in one place, making it easier than ever for
            your audience to discover and engage with you.
          </p>
          <Button style="primary" isLoading={false} className="my-1">
            <div>Get Started</div>
          </Button>
        </div>
        <div className="flex flex-1 w-full h-full justify-center items-center relative">
          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/2 via-gray-100/2 to-teal-100/2 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full absolute" />
          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100/2 via-gray-100/2 to-teal-100/2 w-96 h-96 rounded-full absolute" />
          <Image
            alt="hero-image"
            src={`/hero-image.svg`}
            width="600"
            height="600"
            className="h-[500px] absolute"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
