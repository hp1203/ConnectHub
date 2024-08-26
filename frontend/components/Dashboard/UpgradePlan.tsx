import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { LuLock } from "react-icons/lu";

const UpgradePlan = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div
        className="absolute w-full h-full rounded-lg cursor-pointer"
        onClick={openModal}
      >
        <p className="bg-gray-900 text-white text-xs py-1 px-2 flex items-center gap-1 rounded-lg absolute top-2 right-2">
          <LuLock />
          <span>Upgrade</span>
        </p>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 items-center p-6 bg-gradient-to-tr text-white from-blue-600 to-blue-400"
                  >
                    <button
                      className="float-right text-gray-100"
                      onClick={closeModal}
                    >
                      <FaCircleXmark />
                    </button>
                    <div className="pt-14 px-12">
                      <h3 className="text-xl text-white font-semibold text-center mb-2">
                        Unlock More Power with Pro
                      </h3>
                      <p className="text-gray-50 text-sm font-medium text-center mb-4">
                        Unlock all Pro features and start making the most of
                        your links today.
                      </p>
                    </div>
                  </Dialog.Title>
                  <div>
                    {/* Benefits Section */}
                    <div className="p-6">
                      <p className="font-semibold text-gray-800 mb-4">
                        What you get
                      </p>
                      <ul className="space-y-2 text-gray-800">
                        <li className="flex items-center text-sm">
                          <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                          Manage up to 50 links
                        </li>
                        <li className="flex items-center text-sm">
                          <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                          Advanced analytics (Devices, Locations)
                        </li>
                        <li className="flex items-center text-sm">
                          <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                          Custom domains for branding
                        </li>
                        <li className="flex items-center text-sm">
                          <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                          Enhanced customization (Custom URLs, UTM tracking)
                        </li>
                        <li className="flex items-center text-sm">
                          <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                          Priority support
                        </li>
                      </ul>
                    </div>

                    {/* Pricing and CTA */}
                    <div className="mb-6 px-6">
                      <h3 className="text-lg text-gray-800 font-semibold mb-2">
                        Upgrade Now for Just $10/month
                      </h3>
                      <p className="text-gray-600 text-xs mb-4">
                        Unlock all Pro features and start making the most of
                        your links today.
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 flex items-center border-t border-gray-100 justify-between">
                    <p className="text-sm text-gray-500">
                      Need help?{" "}
                      <a href="#" className="text-blue-500 hover:underline">
                        Contact Support
                      </a>
                    </p>
                    <Link href={`upgrade`} className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                      Upgrade Now
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpgradePlan;
