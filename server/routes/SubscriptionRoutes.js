import { Router } from "express";
import {
  createUserSubscription,
  getSubscriptionPlans,
  makePaymentIntent,
} from "../controllers/SubscriptionsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/plans", getSubscriptionPlans);
subscriptionRoutes.post(
  "/create-payment-intent",
  verifyToken,
  makePaymentIntent
);
subscriptionRoutes.post(
  "/finalize-subscription",
  verifyToken,
  createUserSubscription
);

export default subscriptionRoutes;
