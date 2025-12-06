import { Router } from "express";
import AuthController, * as authCtrl from "../controllers/authController";
import { rateLimitForAuth } from "../middleware/rateLimitMiddleware";
import { z } from "zod";
import { zodValidate } from "../middleware/zodVidateMiddleware";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = loginSchema;

router.post("/register", rateLimitForAuth, zodValidate(registerSchema), AuthController.register);
router.post("/login", rateLimitForAuth, zodValidate(loginSchema), AuthController.login);

export default router;