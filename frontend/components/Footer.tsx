import React from "react";

import { FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaSquareThreads } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
const Footer: React.FC = () => {
  return (
    <footer className=" bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="flex flex-col space-y-10 items-center justify-center">
            <div className="flex flex-col justify-center items-center -space-y-4">
              <a className="text-white font-museomoderno text-2xl font-bold md:text-3xl mb-6" href="#">
                ConnectHub
              </a>
              <span className="text-gray-100 font-museomoderno text-base tracking-wider font-light">Elevate Your Online Presence</span>
            </div>
          {/* <h3 className="text-3xl mb-3"> Download our fitness app </h3>
          <p> Stay fit. All day, every day. </p>
          <div className="flex justify-center my-10">
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Google Play Store </p>
              </div>
            </div>
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Apple Store </p>
              </div>
            </div>
          </div> */}
          <div className="flex space-x-6 items-center justify-center">
            <Link href="" target="_blank" title="Facebook">
              <FaFacebook
                className="w-6 h-6 cursor-pointer text-gray-50 hover:text-blue-600 transition duration-150"
              />
            </Link>
            <Link href="" target="_blank" title="Twitter">
              <FaTwitter
                className="w-6 h-6 cursor-pointer text-gray-50 hover:text-blue-600 transition duration-150"
              />
            </Link>
            <Link href="" target="_blank" title="Instagram">
              <AiFillInstagram
                className="w-7 h-7 cursor-pointer text-gray-50 hover:text-blue-600 transition duration-150"
              />
            </Link>
            <Link href="" target="_blank" title="Threads">
              <FaSquareThreads
                className="w-6 h-6 cursor-pointer text-gray-50 hover:text-blue-600 transition duration-150"
              />
            </Link>
            <Link href="" target="_blank" title="Discord">
              <FaDiscord
                className="w-6 h-6 cursor-pointer text-gray-50 hover:text-blue-600 transition duration-150"
              />
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            {" "}
            &copy; ConnectHub, {new Date().getFullYear()}.{" "}
          </p>
          <div className="order-1 md:order-2 divide-x-2 divide-gray-500">
            <Link href="/about-us">
              <span className="px-2 hover:text-white">About us</span>
            </Link>
            <Link href="/about-us">
              <span className="px-2 hover:text-white">Contact Us</span>
            </Link>
            <Link href="/about-us">
              <span className="px-2 hover:text-white">Privacy Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
