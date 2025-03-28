import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import UserSubscriptions from "../models/user_subscriptions.model.js";
import Payments from "../models/payments.model.js";
import { connectToDb } from "../utils/database.js";
import stripePackage from "stripe";
import User from "../models/user.model.js";
import * as dotenv from "dotenv";

dotenv.config();

export const getSubscriptions = async (request, response) => {
  connectToDb();
  try {
    let subscriptions = await Subscription.find({});
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

export const createNewSubscription = async (request, response) => {
  connectToDb();
  const { name, description, price, duration_days } = request.body;
  try {
    const newSubscription = new Subscription({
      name,
      description,
      price,
      duration_days,
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
