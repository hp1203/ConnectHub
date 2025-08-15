import { Router } from "express";
import {
  createUserSubscription,
  getSubscriptionById,
  getSubscriptions,
  getUserSubscriptions,
  handleWebhook,
} from "../controllers/SubscriptionsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { checkout } from "../controllers/PaymentsController.js";
import express from "express";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscriptions);
subscriptionRoutes.get("/:subscriptionId", getSubscriptionById);

subscriptionRoutes.post(
  "/finalize-subscription",
  verifyToken,
  createUserSubscription
);
subscriptionRoutes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);
// User Subscriptions
subscriptionRoutes.get(
  "/user-subscriptions",
  verifyToken,
  getUserSubscriptions
);

export default subscriptionRoutes;
