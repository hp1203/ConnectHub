import { Router } from "express";
import {
  createUserSubscription,
  getSubscriptions,
  getUserSubscriptions,
} from "../controllers/SubscriptionsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const subscriptionRoutes = Router();

subscriptionRoutes.get("/", getSubscriptions);
subscriptionRoutes.post(
  "/finalize-subscription",
  verifyToken,
  createUserSubscription
);

// User Subscriptions
subscriptionRoutes.get(
  "/user-subscriptions",
  verifyToken,
  getUserSubscriptions
);

export default subscriptionRoutes;
