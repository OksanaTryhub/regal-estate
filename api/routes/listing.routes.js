import express from "express";

import { listingControllers } from "../controllers/listing.controllers.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", listingControllers.getListings);

router.post("/create", verifyToken, listingControllers.createListing);

router.get("/:id", listingControllers.getListingById);

router.delete("/delete/:id", verifyToken, listingControllers.deleteListing);

router.post("/update/:id", verifyToken, listingControllers.updateListing);

export default router;
