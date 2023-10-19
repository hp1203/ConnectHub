import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getProfileTheme, updateTheme } from "../controllers/ThemeController.js";

const themeRoutes = Router();

themeRoutes.get("/:profileId", getProfileTheme);
themeRoutes.put("/:profileId", verifyToken, updateTheme);

export default themeRoutes;