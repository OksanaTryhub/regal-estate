import express from "express";

import { userControllers } from "../controllers/user.controllers.js";
import verifyToken from "./../utils/verifyToken.js";

const router = express.Router();

router.get("/test", userControllers.test);
router.post("/update/:id", verifyToken, userControllers.updateUser);
router.delete("/delete/:id", verifyToken, userControllers.deleteUser);

export default router;
