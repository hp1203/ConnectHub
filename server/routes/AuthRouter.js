import { Router } from "express";
import { register } from "../controllers/AuthController.js";

const authRoute = Router();

authRoute.post('/register', register);

export default authRoute;
