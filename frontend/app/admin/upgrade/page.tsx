"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import Input from "@/UI/Input";
import { MdCelebration } from "react-icons/md";
import { FormEvent, useCallback, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import Button from "@/UI/Button";
import Link from "next/link";
import useRazorpay, { RazorpayOptions } from "react-razorpay";

const paymentGateways = [
  {
    name: "Stripe",
    logo: require("../../../public/stripe-logo.svg"),
  },
  {
    name: "Razorpay",
    logo: require("../../../public/razorpay-logo.svg"),
  },
];

const Upgrade = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [Razorpay, isLoaded] = useRazorpay();
  const [selectedPayment, setSelectedPayment] = useState();

  const payWithRazorpay = useCallback(() => {
    // const order = await createOrder(params);

    const options: RazorpayOptions = {
      key: "rzp_test_Zgx5cAxl4p66fr",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_9A33XWu170gUtm", //order.id,
      handler: (response) => {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response: any) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
    rzpay.open();
  }, [Razorpay]);

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
    payWithRazorpay();
  };
  return (
    <Content title="Upgrade">
      <div className="flex w-full">
        <Card>
          <div className="flex gap-3">
            <form
              onSubmit={handlePayment}
              method="post"
              className="flex-[0.6] space-y-4 p-4 px-8"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-gray-800 mb-2 mt-4">
                  Upgrade to Pro
                </h2>
                <p className="text-gray-500 font-normal text-base">
                  Do more with unlimited links, advance analytics & many more.
                </p>
              </div>
              <div className="">
                <label className="block text-gray-600 font-semibold">
                  Billed To
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="e.g. Jhon Smith"
                  value={``}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold">
                  Billed address
                </label>
                <div className="flex-1 mb-2">
                  <Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={``}
                  />
                </div>
                <div className="flex gap-4 mb-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={``}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={``}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      name="zip"
                      placeholder="Pin Code"
                      value={``}
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={``}
                    />
                  </div>
                </div>
                <div className="">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Payment Option
                  </label>
                  <RadioGroup
                    value={selectedPayment}
                    onChange={setSelectedPayment}
                  >
                    <RadioGroup.Label className="sr-only">
                      Server size
                    </RadioGroup.Label>
                    <div className="space-x-4 flex">
                      {paymentGateways.map((pg) => (
                        <RadioGroup.Option
                          key={pg.name}
                          value={pg}
                          className={({ active, checked }) =>
                            `${
                              checked
                                ? "ring-2 ring-white/60 ring-blue-500"
                                : ""
                            }
                    ${checked ? " text-white" : "bg-white"}
                    relative flex flex-1 cursor-pointer rounded-lg px-5 py-4 border border-gray-300 focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="div"
                                      className={`font-medium flex flex-1 justify-center items-center ${
                                        checked ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      <Image
                                        src={pg.logo}
                                        alt={pg.name}
                                        className="h-8 aspect-auto w-full "
                                      />
                                    </RadioGroup.Label>
                                  </div>
                                </div>

                                <div className="shrink-0 ">
                                  <FaCheckCircle
                                    className={`h-6 w-6 ${
                                      checked
                                        ? "text-blue-600"
                                        : "text-gray-200"
                                    }`}
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex justify-end space-x-4 items-center pt-2">
                <Link
                  className="flex-[0.3] flex items-center justify-center font-medium px-4 py-2 bg-transparent border-2 border-blue-200 rounded-lg text-blue-300"
                  href={"/admin"}
                >
                  <p className="text-lg">Cancel</p>
                </Link>
                <Button
                  style="primary"
                  className="flex-[0.7]"
                  // isLoading={}
                  // disabled={}
                  //   onClick={payWithRazorpay}
                >
                  <p className="text-lg">Pay Securely</p>
                </Button>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <p>
                  By continuing, you agree to ConnectHub&apos;s &nbsp;
                  <span className="underline">terms</span>&nbsp;and&nbsp;
                  <span className="underline">privacy policy</span>. You can
                  cancel your subscription anytime.{" "}
                </p>
              </div>
            </form>
            <div className="flex flex-[0.4] flex-col p-4">
              <div className="flex flex-col rounded-t-lg items-center space-y-2 text-center justify-center p-14 bg-gradient-to-tr text-white from-blue-600 to-blue-400">
                <MdCelebration className="w-12 h-12" />
                <h3 className="text-xl font-medium">Upgrade to Pro</h3>
                <p className="text-gray-100">
                  Unlock premium features for just <br />
                  <span className="font-semibold text-lg">$10/month</span>
                </p>
              </div>
              <div className="flex flex-col border border-gray-200 rounded-b-lg">
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
                <div className="border-t m-2 p-4 space-y-4 border-gray-100">
                  <div className="flex items-center text-sm font-semibold text-gray-500 justify-between">
                    <p>Sub Total</p>
                    <p>$ 8.00 USD</p>
                  </div>
                  <div className="flex items-center text-sm font-semibold text-gray-500 justify-between">
                    <p>Tax</p>
                    <p>$ 2.00 USD</p>
                  </div>
                  <div className="flex items-center text-lg font-semibold text-gray-800 justify-between">
                    <p>Total</p>
                    <p>$ 10.00 USD</p>
                  </div>
                  {/* <div className="flex items-center text-xs text-gray-400">
                    Guaranteed to be safe & secure, ensuring that all
                    transactions are protected with the highest eve of security
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Content>
  );
};

export default Upgrade;
