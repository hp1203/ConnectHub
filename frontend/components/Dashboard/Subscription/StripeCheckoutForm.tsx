import React, { useEffect } from "react";
import Input from "@/UI/Input";
import { MdCelebration } from "react-icons/md";
import { FormEvent, useCallback, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import Button from "@/UI/Button";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
// Stripe Imports
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Loading from "../Loading";

const StripeCheckoutForm = ({
  selectedPayment,
  plan,
  frequency,
}: {
  selectedPayment: any;
  plan: any;
  frequency: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  if (plan == null) {
    return (
      <Loading
        title="Getting Things Done..."
        // subtitle="Hold on! We're getting the profile info."
      />
    );
  }

  var price =
    frequency === "monthly" ? plan.monthly_price : plan.yearly_price || 0;
  var selling_price =
    frequency === "monthly"
      ? plan.monthly_selling_price
      : plan.yearly_selling_price || 0;
  var discount = selling_price - price || 0;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let name = event.target.name;

    setBillingDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Elements", elements);

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      console.log(submitError.message);
      return;
    }

    if (selectedPayment.name === "Stripe") {
      fetchData(
        "post",
        "subscription/finalize-subscription",
        JSON.stringify({
          planId: plan._id,
          paymentDetails: {
            // Start Here
            stripeProductId: plan.stripeProductId,
            amount: selling_price * 100,
            interval: frequency.replace("ly", ""),
          },
          billingDetails,
        })
      )
        .then(async (response) => {
          console.log(response.data);
          let clientSecret = response.data.clientSecret;
          const { error } = await stripe?.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,
            confirmParams: {
              return_url: `${window.location.href}/success`,
            },
          });

          if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            // setErrorMessage(error.message);
            console.log(error.message);
          } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          // toast.error(error, {
          //   id: updateLinkToast,
          // });
        });
    }
  };
  return (
    <div className="flex gap-3">
      <form
        onSubmit={handlePayment}
        method="post"
        className="flex-[0.6] space-y-4 p-4 px-8"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-2 mt-4">
            Upgrade to {plan?.name || ""} Plan
          </h2>
          <p className="text-gray-500 font-normal text-base">
            {plan?.description || ""}
          </p>
        </div>
        <div className="">
          <label className="block text-gray-600 font-semibold">Billed To</label>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billingDetails.name}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={billingDetails.email}
            onChange={handleInputChange}
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
              value={billingDetails.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 mb-2">
            <div className="flex-1">
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={billingDetails.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                name="state"
                placeholder="State"
                value={billingDetails.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                name="zip"
                placeholder="Pin Code"
                value={billingDetails.zip}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* <div className="">
            <label className="block text-gray-600 font-semibold mb-2">
              Payment Option
            </label>
            <RadioGroup value={selectedPayment} onChange={setSelectedPayment}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="space-x-4 flex">
                {paymentGateways.map((pg) => (
                  <RadioGroup.Option
                    key={pg.name}
                    value={pg}
                    className={({ active, checked }) =>
                      `${checked ? "ring-2 ring-white/60 ring-blue-500" : ""}
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
                                checked ? "text-blue-600" : "text-gray-200"
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
          </div>  */}
        </div>
        <div>
          <label className="block text-gray-600 font-semibold mb-2">
            Card Details
          </label>
          <PaymentElement />
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
            disabled={!stripe || !elements}
          >
            <p className="text-lg">Pay Securely</p>
          </Button>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <p>
            By continuing, you agree to ConnectHub&apos;s &nbsp;
            <span className="underline">terms</span>&nbsp;and&nbsp;
            <span className="underline">privacy policy</span>. You can cancel
            your subscription anytime.{" "}
          </p>
        </div>
      </form>
      <div className="flex flex-[0.4] flex-col p-4">
        <div className="flex flex-col rounded-t-lg items-center space-y-2 text-center justify-center p-14 bg-gradient-to-tr text-white from-blue-600 to-blue-400">
          <MdCelebration className="w-12 h-12" />
          <h3 className="text-xl font-medium">{(plan && plan?.name) || ""}</h3>
          <p className="text-gray-100">
            {(plan && plan?.description) || ""} <br />
            <span className="font-semibold text-lg">
              <span className="text-base font-semibold">
                {`$${
                  frequency === "yearly"
                    ? plan && plan?.yearly_selling_price
                    : plan && plan?.monthly_selling_price
                }`}
              </span>{" "}
              {frequency === "yearly" ? "/Year" : "/Month"}
            </span>
          </p>
        </div>
        <div className="flex flex-col border border-gray-200 rounded-b-lg">
          <div className="p-6">
            <p className="font-semibold text-gray-800 mb-4">What you get</p>
            <ul className="space-y-2 text-gray-800">
              {plan &&
                plan?.features.map((feature: any, index: number) => (
                  <li
                    className="flex items-center text-sm text-gray-700 font-medium transition-opacity ease-in-out duration-300 capitalize"
                    key={index}
                  >
                    <div>
                      <FaCheckCircle className="text-green-500 text-lg mr-2" />{" "}
                    </div>
                    {feature.display_name}{" "}
                    {feature?.metadata !== undefined &&
                      " : " +
                        Object.values<any>(feature.metadata)[0]
                          .toString()
                          .replace(/,/g, ", ")
                          .replace(/_/g, " ")
                          .replace(/-/g, " ")}
                  </li>
                ))}
            </ul>
          </div>
          <div className="border-t m-2 p-4 space-y-4 border-gray-100">
            <div className="flex items-center text-sm font-semibold text-gray-500 justify-between">
              <p>Sub Total</p>
              <p>{price} USD</p>
            </div>
            <div className="flex items-center text-sm font-semibold text-gray-500 justify-between">
              <p>Discount</p>
              <p>
                {discount} USD ({((discount / price) * 100).toFixed(2)}%)
              </p>
            </div>
            <div className="flex items-center text-lg font-semibold text-gray-800 justify-between">
              <p>Total</p>
              <p>{selling_price} USD</p>
            </div>
            <div className="flex items-center text-xs text-gray-400">
              Guaranteed to be safe & secure, ensuring that all transactions are
              protected with the highest eve of security
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckoutForm;
