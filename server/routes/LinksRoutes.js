import { Router } from "express";
import { addNewLink, deleteLink, getProfileLinks } from "../controllers/LinksController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const linksRoutes = Router();

linksRoutes.get("/:profileId", getProfileLinks);
linksRoutes.post("/:profileId", verifyToken, addNewLink);
linksRoutes.delete("/:linkId", verifyToken, deleteLink);

export default linksRoutes;