import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import UserSubscriptions from "../models/user_subscriptions.model.js";
import Payments from "../models/payments.model.js";
import { connectToDb } from "../utils/database.js";
import stripePackage from "stripe";
import User from "../models/user.model.js";

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
      currency: "inr",
      metadata: { userId, planId },
      payment_method_types: ["card"],
    });
    response.status(201).json({ clientSecret: paymentIntent.client_secret });
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
    if (status !== "success") {
      return response.status(400).json({ message: "Payment not successful" });
    }

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

    // Calculate subscription period
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration_days);

    // Save payment details
    const payment = new Payments({
      user: userId,
      subscription: planId,
      gateway,
      transactionId,
      amount: plan.price,
      currency: "usd",
      status,
    });
    await payment.save();

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
