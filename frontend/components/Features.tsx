import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";

const Features: React.FC = () => {
  return (
    <section className="pt-4 pb-14 bg-gray-50 overflow-hidden">
      <div className="container m-auto space-y-8 text-gray-500">
        <div>
          <span className="text-gray-600 text-lg font-semibold">
            Main features
          </span>
          <h2 className="mt-4 text-2xl text-gray-900 font-semibold md:text-3xl font-montserrat">
            A technology-first approach to payments{" "}
            <br className="lg:block" hidden /> and finance
          </h2>
        </div>
        <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8 h-full flex flex-col justify-between">
              <img
                src="/link.png"
                className="w-14"
                width="512"
                height="512"
                alt="burger illustration"
              />
              {/* <FaLink
                className="w-10 h-10 text-blue-500"
              /> */}

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
                Centralized Link Management
                </h5>
                <p className="text-sm text-gray-600">
                Add links to profiles on platforms like Instagram, Twitter, YouTube, LinkedIn, personal websites, blogs, online shops, and more.
                </p>
              </div>
              <Link
                href="#"
                className="flex justify-between items-center group-hover:text-blue-600"
              >
                <span className="text-sm">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <FiArrowRight/>
                </span>
              </Link>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8 h-full flex flex-col justify-between">
              <img
                src="/design.png"
                className="w-14"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
                Customizable Layouts
                </h5>
                <p className="text-sm text-gray-600">
                Users can choose from various layout templates and color schemes to match their personal branding or style.
                </p>
              </div>
              <Link
                href="#"
                className="flex justify-between items-center bottom-0 group-hover:text-blue-600"
              >
                <span className="text-sm">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <FiArrowRight/>
                </span>
              </Link>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8 h-full flex flex-col justify-between">
              <img
                src="/analytics.png"
                className="w-14"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
                Analytics
                </h5>
                <p className="text-sm text-gray-600">
                Provide basic analytics such as link click-through rates, audience demographics, and geographic location, helping users understand their online audience better.
                </p>
              </div>
              <Link
                href="#"
                className="flex justify-between items-center bottom-0 group-hover:text-blue-600"
              >
                <span className="text-sm">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <FiArrowRight/>
                </span>
              </Link>
            </div>
          </div>
          <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
            <div className="relative p-8 space-y-8 h-full flex flex-col justify-between">
              <img
                src="/tools.png"
                className="w-14 "
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
                Promotion and Engagement Tools
                </h5>
                <p className="text-sm text-gray-600">
                Integrate tools like embedded subscription forms, email newsletter sign-ups, and social media follow buttons to boost engagement and gather audience data.
                </p>
              </div>
              <Link
                href="#"
                className="flex justify-between items-center bottom-0 group-hover:text-blue-600"
              >
                <span className="text-sm">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <FiArrowRight/>
                </span>
              </Link>
            </div>
          </div>
          {/* <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
            <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
              <img
                src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/metal.png"
                className="w-10"
                width="512"
                height="512"
                alt="burger illustration"
              />

              <div className="space-y-2">
                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
                  More features
                </h5>
                <p className="text-sm text-gray-600">
                  Neque Dolor, fugiat non cum doloribus aperiam voluptates
                  nostrum.
                </p>
              </div>
              <Link
                href="#"
                className="flex justify-between items-center group-hover:text-blue-600"
              >
                <span className="text-sm">Read more</span>
                <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <FiArrowRight/>
                </span>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Features;
