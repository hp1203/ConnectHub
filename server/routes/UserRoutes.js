import { Router } from "express";
import { updateProfile, updateProfileImage } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const userRoutes = Router();
const upload = multer({ dest: "uploads/profiles" });
// userRoutes.get("/profile/:id", getUserProfile);
userRoutes.put("/profile", verifyToken, updateProfile);
userRoutes.post("/profile/image", verifyToken, upload.single("images"), updateProfileImage);

export default userRoutes;
