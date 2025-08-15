"use client";
import Content from "@/components/Dashboard/Content";
import Card from "@/UI/Card";
import useApi from "@/hooks/useApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Stripe Imports
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/Dashboard/Subscription/StripeCheckoutForm";
import { useSearchParams } from "next/navigation";

const paymentGateways = [
  {
    name: "Stripe",
    logo: require("../../../public/stripe-logo.svg"),
  },
  // {
  //   name: "Razorpay",
  //   logo: require("../../../public/razorpay-logo.svg"),
  // },
];

const Upgrade = () => {
  const { data: session } = useSession();
  const { fetchData } = useApi(session?.token);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(paymentGateways[0]);
  const stipePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
  // const router = useRouter();

  const params = useSearchParams();
  let plan = params.get("plan");
  let type = params.get("type");

  useEffect(() => {
    const getPlan = async () => {
      fetchData("get", `subscription/${plan ? plan : ""}`)
        .then((res) => {
          console.log(res);
          setSelectedPlan(res.data.subscription);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPlan();
  }, [params]);

  const stripeOptions: StripeElementsOptions = {
    mode: "payment",
    amount: 10,
    currency: "usd",
  };

  return (
    <Content title="Upgrade">
      <div className="flex w-full">
        <Card>
          <Elements stripe={stipePromise} options={stripeOptions}>
            <StripeCheckoutForm
              plan={selectedPlan}
              selectedPayment={selectedPayment}
              frequency={type || "monthly"}
            />
          </Elements>
        </Card>
      </div>
    </Content>
  );
};

export default Upgrade;
