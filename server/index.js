import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./utils/database.js";
import authRoute from "./routes/AuthRouter.js";
import userRoutes from "./routes/UserRoutes.js";
import linksRoutes from "./routes/LinksRoutes.js";
import analyticsRoutes from "./routes/AnalyticsRoutes.js";
import categoryRoute from "./routes/CategoryRoutes.js";
import themeRoutes from "./routes/ThemeRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.ORIGIN, 'http://localhost:3000', 'https://connect-hub-development.vercel.app'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // credentials: true,
  })
);
app.use("/uploads",express.static("uploads"));

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/links", linksRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/theme", themeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectToDb();
});

