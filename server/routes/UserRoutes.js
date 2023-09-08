import { Router } from "express";
import { setUserProfile, updateProfile, updateProfileImage } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const userRoutes = Router();
const upload = multer({ dest: "uploads/profiles" });

userRoutes.post("/profile", verifyToken, setUserProfile);
userRoutes.put("/profile/:profileId", verifyToken, updateProfile);
userRoutes.post("/profile/:profileId/image", verifyToken, upload.single("images"), updateProfileImage);

export default userRoutes;
