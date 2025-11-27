// Auth routes - API endpoint definitions
import { Router } from "express";
import { signup } from "../../controllers/auth.controller";
import { validateSignup } from "../../validators/auth.validator";

const router: Router = Router();

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", validateSignup, signup);

export default router;
