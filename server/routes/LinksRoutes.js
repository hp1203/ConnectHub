import { Router } from "express";
import { addNewLink, getProfileLinks } from "../controllers/LinksController.js";

const linksRoutes = Router();

linksRoutes.get("/:profileId", getProfileLinks);
linksRoutes.post("/:profileId", addNewLink);

export default linksRoutes;