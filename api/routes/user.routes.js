import express from "express";

import { userControllers } from "../controllers/user.controllers.js";
import verifyToken from "./../utils/verifyToken.js";

const router = express.Router();

router.get("/test", userControllers.test);
router.get("/", userControllers.getAllUsers);
router.post("/update/:id", verifyToken, userControllers.updateUser);
router.delete("/delete/:id", verifyToken, userControllers.deleteUser);
router.get("/listings/:id", verifyToken, userControllers.getUserListings);
router.get("/:id", verifyToken, userControllers.getUser);

export default router;
