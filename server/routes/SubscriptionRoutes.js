import { Router } from "express";
import {
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

export default subscriptionRoutes;
