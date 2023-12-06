import { Router } from "express";
import { addAnalyticsDetails, getAnalyticsData } from "../controllers/AnalyticsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const analyticsRoutes = Router();

analyticsRoutes.post("/", addAnalyticsDetails);
analyticsRoutes.get("/:profileId", getAnalyticsData);

export default analyticsRoutes;