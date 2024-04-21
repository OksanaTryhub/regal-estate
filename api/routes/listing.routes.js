import express from "express";

import { listingControllers } from "../controllers/listing.controllers.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, listingControllers.createListing);

export default router;
