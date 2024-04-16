import express from "express";
import validateBody from "./../utils/validateBody.js";
import { schemas } from "../models/user.model.js";

import { authControllers } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", validateBody(schemas.userSignUpSchema), authControllers.signup);

router.post("/signin", validateBody(schemas.userSignInSchema), authControllers.signin);

router.post("/google", authControllers.google);

export default router;
