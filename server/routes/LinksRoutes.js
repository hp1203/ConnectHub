import { Router } from "express";
import { addNewLink, deleteLink, editLink, getProfileLinks } from "../controllers/LinksController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const linksRoutes = Router();

linksRoutes.get("/:profileId", getProfileLinks);
linksRoutes.post("/:profileId", verifyToken, addNewLink);
linksRoutes.put("/:linkId", verifyToken, editLink);
linksRoutes.delete("/:linkId", verifyToken, deleteLink);

export default linksRoutes;