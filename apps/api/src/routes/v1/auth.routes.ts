// Auth routes - API endpoint definitions
import { Router } from "express";
import {
  login,
  logout,
  me,
  refresh,
  signup,
} from "../../controllers/auth.controller";
import { authenticate } from "../../middleware/auth.middleware";
import {
  validateLogin,
  validateRefreshToken,
  validateSignup,
} from "../../validators/auth.validator";

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

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get("/me", authenticate, me);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post("/refresh", validateRefreshToken, refresh);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post("/logout", authenticate, logout);

export default router;
