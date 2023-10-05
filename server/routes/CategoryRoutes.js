import { Router } from "express";
import { getCategories } from "../controllers/CategoryController.js";

const categoryRoute = Router();

categoryRoute.get('/', getCategories);

export default categoryRoute;