import mongoose from "mongoose";
import Subscription from "../models/subscription.model.js";
import UserSubscriptions from "../models/user_subscriptions.model.js";
import { connectToDb } from "../utils/database.js";

export const getSubscriptionPlans = async (request, response) => {
    connectToDb();
    try {
        const plans = await Subscription.find({});
        return response.status(200).json({
            plans
        });
    } catch(error) {
        console.log(error);
        return response.status(500).json({ error: error.message });
    }
}

export const createUserSubscription = async (request, response) => {
    connectToDb();
    try {
        const { userId } = response;
        
    } catch(error) {

    }
}