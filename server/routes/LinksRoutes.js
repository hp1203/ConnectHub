import { Router } from "express";
import { getProfileLinks } from "../controllers/LinksController.js";

const linksRoutes = Router();

linksRoutes.get("/:profileId", getProfileLinks);

export default linksRoutes;