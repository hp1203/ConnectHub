import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./utils/database.js";
import authRoute from "./routes/AuthRouter.js";
import userRoutes from "./routes/UserRoutes.js";
import linksRoutes from "./routes/LinksRoutes.js";
import analyticsRoutes from "./routes/AnalyticsRoutes.js";
import categoryRoute from "./routes/CategoryRoutes.js";
import themeRoutes from "./routes/ThemeRoutes.js";
import subscriptionRoutes from "./routes/SubscriptionRoutes.js";
import Stripe from "stripe";
import User from "./models/user.model.js";
dotenv.config();

// AdminJs Imports
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { Database, Resource } from "@adminjs/mongoose";
import Subscription from "./models/subscription.model.js";
import Payments from "./models/payments.model.js";
import Profile from "./models/profile.model.js";
import Link from "./models/link.model.js";
import Category from "./models/category.model.js";
import UserSubscriptions from "./models/user_subscriptions.model.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Basic AdminJs Config
AdminJS.registerAdapter(AdminJSMongoose);
const adminJs = new AdminJS({
  resources: [
    User,
    Category,
    Subscription,
    UserSubscriptions,
    Payments,
    Profile,
    Link,
  ], // Resources to connect.

  rootPath: "/admin", // Path to the AdminJS dashboard.
});

// Build and use a router to handle AdminJS routes.
const router = AdminJSExpress.buildRouter(adminJs);
app.use(adminJs.options.rootPath, router);

app.use(
  cors({
    origin: [
      process.env.ORIGIN,
      "http://localhost:3000",
      "https://connect-hub-development.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/links", linksRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/theme", themeRoutes);
app.use("/api/v1/subscription", subscriptionRoutes);

connectToDb();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
