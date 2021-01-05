import express from "express";

import AuthController from "../controllers/auth.controller";
import AuthValidator from "../services/validation/auth.validator";

const router = express.Router();

router.post("/sign-up", AuthValidator.signUp, AuthController.signUp);
router.post("/login", AuthValidator.signIn, AuthController.login);

export default router;
