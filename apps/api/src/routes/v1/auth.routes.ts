// Auth routes - API endpoint definitions
import { Router } from "express";
import { login, signup } from "../../controllers/auth.controller";
import { validateLogin, validateSignup } from "../../validators/auth.validator";

const router: Router = Router();

/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", validateSignup, signup);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post("/login", validateLogin, login);

export default router;
