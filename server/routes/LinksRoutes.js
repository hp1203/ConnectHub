import { Router } from "express";
import { addNewLink, deleteLink, editLink, getLinkDetails, getProfileLinks } from "../controllers/LinksController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const linksRoutes = Router();

linksRoutes.get("/:linkId", getLinkDetails);
linksRoutes.get("/profile/:profileId", getProfileLinks);
linksRoutes.post("/:profileId", verifyToken, addNewLink);
linksRoutes.put("/:linkId", verifyToken, editLink);
linksRoutes.delete("/:linkId", verifyToken, deleteLink);

export default linksRoutes;