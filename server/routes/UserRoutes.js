import { Router } from "express";
import { getUserInfo, setUserProfile, updateProfile, updateProfileImage } from "../controllers/UserController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const userRoutes = Router();
const upload = multer({ dest: "uploads/profiles" });

userRoutes.get("/profile/:id", getUserInfo);
userRoutes.post("/profile", verifyToken, setUserProfile);
userRoutes.put("/profile/:profileId", verifyToken, updateProfile);
userRoutes.post("/profile/:profileId/image", verifyToken, upload.single("images"), updateProfileImage);

export default userRoutes;
