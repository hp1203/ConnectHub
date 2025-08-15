import useApi from "@/hooks/useApi";
import { Dialog, RadioGroup, Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import { Router } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark, FaCircleCheck, FaCircle } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { LuLock } from "react-icons/lu";

const UpgradeSubscription = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [plans, setPlans] = useState<any>([]);
  let [selectedPlan, setSelectedPlan] = useState(plans[0]);
  let [selectedTab, setSelectedTab] = useState("Monthly");
  let { fetchData } = useApi();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const fetchPlans = async () => {
      fetchData("get", `subscription`)
        .then((res) => {
          console.log(res);

          setPlans(res.data.subscriptions);
          setSelectedPlan(res.data.subscriptions[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPlans();
  }, []);
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
            <div className="flex min-h-full items-center justify-center p-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl border-t-[8px] border-blue-600 transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 items-center pt-6 px-6 text-gray-900"
                  >
                    <button
                      className="float-right text-gray-100"
                      onClick={closeModal}
                    >
                      <FaCircleXmark />
                    </button>
                    <div className="pt-14 px-12 pb-3">
                      <h3 className="text-2xl font-semibold text-center mb-2">
                        Upgrade Your Plan
                      </h3>
                      <p className="text-gray-500 text-sm font-medium text-center mb-4">
                        Unlock all features and start making the most of your
                        profile today.
                      </p>
                    </div>
                  </Dialog.Title>
                  <div className="flex justify-center items-center px-3 py-2">
                    <div className="flex border rounded-xl border-gray-100 p-2 space-x-2">
                      <button
                        className={`p-2 px-4 font-semibold text-xs rounded-lg 
                          ${
                            selectedTab === "Monthly"
                              ? "text-gray-600 bg-gray-200"
                              : "text-gray-400"
                          }
                        `}
                        onClick={() => setSelectedTab("Monthly")}
                      >
                        Monthly
                      </button>
                      <button
                        className={`p-2 px-4 font-semibold text-xs rounded-lg 
                          ${
                            selectedTab === "Yearly"
                              ? "text-gray-600 bg-gray-200"
                              : "text-gray-400"
                          }
                        `}
                        onClick={() => setSelectedTab("Yearly")}
                      >
                        Yearly
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
                    <div className="col-span-2 rounded-lg">
                      {/* Select Plan */}
                      {plans.length > 0 && (
                        <RadioGroup
                          value={selectedPlan}
                          onChange={setSelectedPlan}
                        >
                          <div className="space-y-3">
                            {plans.map((plan: any) => (
                              <RadioGroup.Option
                                key={plan?._id}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                      : ""
                                  }
                                ${
                                  checked
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                                }
                                relative flex cursor-pointer rounded-lg px-5 py-4 border-2 border-dashed border-gray-200 focus:outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex w-full items-center border-gray-100 justify-between">
                                      {checked ? (
                                        <div className="shrink-0 text-white">
                                          <FaCircleCheck className="h-5 w-5" />
                                        </div>
                                      ) : (
                                        <div className="shrink-0 text-gray-100">
                                          <FaCircle className="h-5 w-5" />
                                        </div>
                                      )}
                                      <div className="flex flex-1 px-4">
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="div"
                                            className={`font-medium w-full text-lg ${
                                              checked
                                                ? "text-white"
                                                : "text-gray-900"
                                            }`}
                                          >
                                            <span>{plan?.name}</span>
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className={`inline ${
                                              checked
                                                ? "text-sky-100"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            <span className="text-xs">
                                              {plan?.description}
                                            </span>
                                          </RadioGroup.Description>
                                        </div>
                                      </div>
                                      <span className="text-xs">
                                        <span className="text-base font-semibold">
                                          {`$${
                                            selectedTab === "Yearly"
                                              ? plan.yearly_selling_price
                                              : plan.monthly_selling_price
                                          }`}
                                        </span>{" "}
                                        {selectedTab === "Yearly"
                                          ? "/Year"
                                          : "/Month"}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      )}
                    </div>
                    {/* Plan Details */}
                    <div className="p-6 bg-gray-50 col-span-2 rounded-lg transition-all ease-in-out duration-300">
                      <p className="font-semibold text-gray-800 mb-4">
                        What you get
                      </p>
                      <ul className="space-y-2 text-gray-800">
                        {selectedPlan?.features.map(
                          (feature: any, index: number) => (
                            <li
                              className="flex items-center text-base text-gray-700 font-medium transition-opacity ease-in-out duration-300 capitalize"
                              key={index}
                            >
                              <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                              {feature.display_name}{" "}
                              {feature?.metadata !== undefined &&
                                " : " +
                                  Object.values<any>(feature.metadata)[0]
                                    .toString()
                                    .replace(/,/g, ", ")
                                    .replace(/_/g, " ")
                                    .replace(/-/g, " ")}
                            </li>
                          )
                        )}
                      </ul>
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
                    <Link
                      href={`upgrade?plan=${selectedPlan?._id}&type=${
                        selectedTab === "Yearly" ? "yearly" : "monthly"
                      }`}
                      className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
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

export default UpgradeSubscription;
