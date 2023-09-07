import { Router } from "express";
import { updateProfile } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const userRoutes = Router();

userRoutes.put("/profile/:id", verifyToken, updateProfile);

export default userRoutes;
