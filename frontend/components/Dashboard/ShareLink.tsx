"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LuBadgeAlert, LuShare2, LuTrash2 } from "react-icons/lu";
import Button from "@/UI/Button";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { ShareSocial } from "react-share-social";

const ShareLink = ({
  linkId,
  linkUrl,
}: {
  linkId: string;
  linkUrl: string;
}) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useApi(session?.token || "");
  const cancelButtonRef = useRef(null);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button
        className="flex items-center justify-center p-3 w-full gap-2"
        onClick={openModal}
      >
        <LuShare2 className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 text-sm font-medium">Share</span>
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white ">
                    <div className="flex flex-col gap-4">
                      {/* <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Share Your Link
                      </Dialog.Title> */}
                      <ShareSocial
                        url={linkUrl}
                        title="Share your link"
                        socialTypes={[
                          "facebook",
                          "whatsapp",
                          "twitter",
                          "telegram",
                          "reddit",
                          "linkedin",
                        ]}
                        style={{
                          root: {
                            background:
                              "linear-gradient(45deg, #2867EC 30%, #367BF4 90%)",
                            borderRadius: 3,
                            border: 0,
                            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                            color: "white",
                          },
                          copyContainer: {
                            border: "1px solid #484848",
                            background: "rgb(0,0,0,0.5)",
                          },
                          title: {
                            color: "#fff",
                            marginBottom: "20px",
                          },
                        }}
                      />
                      {/* <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      </div> */}
                    </div>
                  </div>
                  <div className="bg-gray-50 gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      type="button"
                      style="secondary"
                      onClick={closeModal}
                      isLoading={false}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ShareLink;
