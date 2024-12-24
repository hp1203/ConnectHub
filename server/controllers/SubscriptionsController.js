import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import UserSubscriptions from "../models/user_subscriptions.model.js";
import Payments from "../models/payments.model.js";
import { connectToDb } from "../utils/database.js";
import stripePackage from "stripe";
import User from "../models/user.model.js";
import * as dotenv from "dotenv";

dotenv.config();
const stripe = stripePackage(process.env.STRIPE_KEY);
export const getSubscriptionPlans = async (request, response) => {
  connectToDb();
  try {
    const plans = await Subscription.find({});
    return response.status(200).json({
      plans,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message });
  }
};

export const makePaymentIntent = async (request, response) => {
  connectToDb();
  const { userId } = response;
  const { planId, gateway } = request.body;
  try {
    const plan = await Subscription.findById(planId);
    if (!plan || !plan.is_active)
      return response
        .status(404)
        .json({ message: "Plan not found or inactive" });

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(plan.price * 100), // Convert price to cents
      currency: "usd",
      metadata: { userId, planId },
      // payment_method_types: ["card"],
      description: "Subscription Plan Purchase",
      shipping: {
        name: "Himanshu",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
    });

    // Log payment initiation in the database
    const payment = new Payments({
      user: userId,
      subscription: planId,
      gateway: "stripe",
      transactionId: paymentIntent.id,
      amount: plan.price,
      currency: "usd",
      status: "pending",
    });
    await payment.save();

    response.status(201).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const createUserSubscription = async (request, response) => {
  connectToDb();
  const { userId, planId, transactionId, gateway, status } = request.body;

  try {
    if (status !== "succeeded") {
      return response.status(400).json({ message: "Payment not successful" });
    }

    const user = await User.findById(userId);
    if (!user) return response.status(404).json({ message: "User not found" });

    const plan = await Subscription.findById(planId);
    if (!plan || !plan.is_active)
      return response
        .status(404)
        .json({ message: "Plan not found or inactive" });

    // Update payment status in the database
    const payment = await Payments.findOne({ transactionId });
    if (!payment)
      return response.status(404).json({ message: "Payment record not found" });

    payment.status = status;
    await payment.save();

    if (status !== "succeeded") {
      return response
        .status(400)
        .json({ message: "Payment not successful", payment });
    }

    const activeSubscription = await UserSubscriptions.findOne({
      userId,
      status: "active",
    });

    if (activeSubscription)
      return response
        .status(400)
        .json({ message: "User already has an active subscription" });

    // Calculate subscription period
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration_days);

    // Create subscription
    const userPlan = new UserSubscriptions({
      user: userId,
      subscription: planId,
      start_date: startDate,
      end_date: endDate,
      status: "active",
    });

    await userPlan.save();
    response
      .status(201)
      .json({ message: "Subscription finalized successfully", userPlan });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
