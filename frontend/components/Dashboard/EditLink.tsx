"use client";
import Button from "@/UI/Button";
import React, { useState, Fragment } from "react";
import { LuClipboardEdit, LuPlusCircle, LuSave } from "react-icons/lu";
import { Dialog, Switch, Transition } from "@headlessui/react";
import { LuX } from "react-icons/lu";
import Input from "@/UI/Input";
import Textarea from "@/UI/Textarea";
import EmojiSelector from "@/UI/EmojiSelector";
import MultiSelectInput from "@/UI/MultiSelectInput";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { LinkType } from "@/Constants/types";

const EditLink: React.FC<LinkType> = ({ title, icon, description, url, isPublic, _id, tags }) => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [open, setOpen] = useState(false);
  console.log("Icon", icon);
  
  const [selectedEmoji, setSelectedEmoji] = useState(icon);
  const [selectedTags, setSelectedTags] = useState(tags);
  const [isLinkPublic, setIsLinkPublic] = useState(isPublic);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: title,
    description: description,
    url: url,
  });
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateLink = () => {
    setIsLoading(true);
    const data = {
      ...formData,
      tags: selectedTags,
      icon: JSON.stringify(selectedEmoji),
      isPublic: isLinkPublic,
    };
    console.log("Data", data);

    fetchData("put", `links/${_id}`, data)
      .then((response) => {
        console.log("res", response);
        
        setIsLoading(false);
        setOpen(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="w-full">
      <button
        className="flex items-center justify-center p-3 w-full gap-2"
        onClick={() => setOpen(true)}
      >
        <LuClipboardEdit className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 text-sm font-medium">Edit</span>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex items-center justify-between p-4 text-white bg-blue-500">
                        <Dialog.Title className="text-lg font-medium leading-6">
                          Edit Link
                        </Dialog.Title>
                        <button
                          type="button"
                          className="relative rounded-md text-gray-100 bg-blue-600 p-1 focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <LuX className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-scroll scrollbar-hide pb-4">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <EmojiSelector
                                value={selectedEmoji}
                                setEmoji={setSelectedEmoji}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-gray-700 font-semibold">
                                Title
                                <span className="font-normal text-red-600 text-xl">
                                  *
                                </span>
                              </label>
                              <Input
                                type="text"
                                name="title"
                                placeholder="Enter title for link"
                                value={formData.title}
                                onChange={handleOnChange}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-gray-700 font-semibold">
                              URL
                              <span className="font-normal text-red-600 text-xl">
                                *
                              </span>
                            </label>
                            <Input
                              type="text"
                              name="url"
                              placeholder="Enter link's url"
                              value={formData.url}
                              onChange={handleOnChange}
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-semibold">
                              Description
                            </label>
                            <Textarea
                              name="description"
                              placeholder="Enter good description for your link"
                              value={formData.description}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                              ) => handleOnChange(e)}
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-semibold">
                              Tags
                              <span className="font-normal text-red-600 text-xl">
                                *
                              </span>
                            </label>
                            <MultiSelectInput
                              value={selectedTags}
                              setTags={setSelectedTags}
                            />
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <label className="block text-gray-700 font-semibold">
                              Is Public?
                              <br />
                              <span className="text-xs text-gray-400 font-normal">
                                Do you want it to be public or not?
                              </span>
                            </label>
                            <div className="">
                              <Switch
                                checked={isLinkPublic}
                                onChange={setIsLinkPublic}
                                className={`${
                                    isLinkPublic ? "bg-blue-600" : "bg-gray-300"
                                }
                              relative inline-flex h-[22px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                              >
                                <span className="sr-only">Use setting</span>
                                <span
                                  aria-hidden="true"
                                  className={`${
                                    isLinkPublic ? "translate-x-6" : "translate-x-0"
                                  }
                                pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                              </Switch>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex border-t p-3 items-center gap-3">
                        <Button
                          style="primary"
                          className=""
                          onClick={() => handleCreateLink()}
                          icon={<LuSave className="w-5 h-5" />}
                          isLoading={isLoading}
                        >
                          Update
                        </Button>
                        <Button
                          style="secondary"
                          className=""
                          isLoading={false}
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
export default EditLink;
