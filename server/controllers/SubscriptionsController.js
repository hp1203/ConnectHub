import Subscription from "../models/subscription.model.js";
import UserSubscriptions from "../models/user_subscriptions.model.js";
import Payments from "../models/payments.model.js";
import { connectToDb } from "../utils/database.js";
import User from "../models/user.model.js";
import * as dotenv from "dotenv";
import stripe from "../utils/stripe.js";

dotenv.config();

export const getSubscriptions = async (request, response) => {
  connectToDb();
  try {
    let subscriptions = await Subscription.find({}).sort({
      monthly_selling_price: 1,
    });
    return response.status(200).json({
      subscriptions,
    });
  } catch (error) {
    console.error(error);
    response
      .status(404)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getSubscriptionById = async (request, response) => {
  connectToDb();
  const { subscriptionId } = request.params;
  try {
    let subscription = await Subscription.findById(subscriptionId);
    if (!subscription)
      return response.status(404).json({ message: "Subscription not found" });
    return response.status(200).json({
      subscription,
    });
  } catch (error) {
    console.error(error);
    response
      .status(404)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const createNewSubscription = async (request, response) => {
  connectToDb();
  const { name, description, price, selling_price, duration, features } =
    request.body;
  try {
    const newSubscription = new Subscription({
      name,
      description,
      price,
      selling_price,
      duration,
      features,
    });

    await newSubscription.save();
    return response.status(201).json({
      message: "Subscription created successfully",
      newSubscription,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createUserSubscription = async (request, response) => {
  connectToDb();
  const {
    planId,
    paymentDetails,
    billingDetails,
    gateway = "stripe",
  } = request.body;
  const { userId } = response;

  try {
    const user = await User.findById(userId);
    if (!user) return response.status(404).json({ message: "User not found" });

    const plan = await Subscription.findById(planId);
    if (!plan || !plan.is_active)
      return response
        .status(404)
        .json({ message: "Plan not found or inactive" });

    const activeSubscription = await UserSubscriptions.findOne({
      userId,
      status: "active",
    });

    if (activeSubscription)
      return response
        .status(400)
        .json({ message: "User already has an active subscription" });

    // Create Stripe Customer
    const customer = await stripe.customers.create({
      name: billingDetails.name,
      email: billingDetails.email,
      phone: billingDetails.phone,
      payment_method: "pmc_1QVfGQJpQsswbYcTRoYchmkQ", //paymentDetails.paymentMethodId,
      invoice_settings: {
        default_payment_method: "pmc_1QVfGQJpQsswbYcTRoYchmkQ", //paymentDetails.paymentMethodId,
      },
      address: {
        line1: billingDetails.address,
        city: billingDetails.city,
        state: billingDetails.state,
        postal_code: billingDetails.zipCode,
        country: billingDetails.country,
      },
    });

    // Create Stripe Subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            product: paymentDetails.stripeProductId,
            currency: "usd",
            unit_amount: paymentDetails.amount,
            recurring: {
              interval: paymentDetails.interval,
            },
          },
        },
      ],
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: "automatic",
          },
        },
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      metadata: {
        userId,
        planId,
      },
      expand: ["latest_invoice.payment_intent"],
    });
    const invoice = subscription.latest_invoice;
    const paymentIntent = invoice.payment_intent;

    // Update user subscription
    const userSubscription = new UserSubscriptions({
      user: userId,
      subscription: planId,
      start_date: new Date(),
      end_date: new Date(
        new Date().setDate(
          new Date().getDate() + subscription.plan.interval_count
        )
      ),
      is_free_trial: false,
      free_trial_duration_days: null,
      metadata: {
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
      },
      status: "inactive",
    });
    await userSubscription.save();

    // Save payment details to database
    const payment = new Payments({
      user: userId,
      amount: plan.selling_price,
      currency: "usd",
      gateway,
      transactionId: paymentIntent.id,
      metadata: {
        // paymentMethod: paymentDetails.paymentMethodId,
        billingDetails,
        subscriptionId: subscription.id,
      },
      user_subscription: userSubscription._id,
      status: "pending",
    });
    await payment.save();

    response.status(201).json({
      message: "Subscription finalized successfully",
      clientSecret: paymentIntent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const handleWebhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "invoice.payment_succeeded": {
      const subscription = event.data.object.subscription;
      await UserSubscriptions.findOneAndUpdate(
        { metadata: { stripeSubscriptionId: subscription } },
        { subscriptionStatus: "active" }
      );
      await Payments.findOneAndUpdate(
        { metadata: { subscriptionId: subscription } },
        { subscriptionStatus: "succeeded" }
      );
      break;
    }
    case "invoice.payment_failed": {
      const subscription = event.data.object.subscription;
      await UserSubscriptions.findOneAndUpdate(
        { metadata: { stripeSubscriptionId: subscription } },
        { subscriptionStatus: "cancelled" }
      );
      await Payments.findOneAndUpdate(
        { metadata: { subscriptionId: subscription } },
        { subscriptionStatus: "failed" }
      );
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object.id;
      await UserSubscriptions.findOneAndUpdate(
        { metadata: { stripeSubscriptionId: subscription } },
        { subscriptionStatus: "cancelled" }
      );
      await Payments.findOneAndUpdate(
        { metadata: { subscriptionId: subscription } },
        { subscriptionStatus: "failed" }
      );
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).json({ received: true });
};

export const getUserSubscriptions = async (request, response) => {
  const { userId } = request.params;
  connectToDb();
  try {
    const userSubscriptions = await UserSubscriptions.find({ user: userId });
    return response.status(200).json({ userSubscriptions });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
