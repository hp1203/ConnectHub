import { Router } from "express";
import { getUserProfile, updateProfile, updateProfileImage } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const userRoutes = Router();

userRoutes.get("/profile/:id", getUserProfile);
userRoutes.put("/profile", verifyToken, updateProfile);
userRoutes.post("/profile/image", verifyToken, updateProfileImage);

export default userRoutes;
