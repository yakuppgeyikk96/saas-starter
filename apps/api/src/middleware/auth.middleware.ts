// Auth middleware - JWT verification
import { NextFunction, Request, Response } from "express";
import { findUserById } from "../repositories";
import { UnauthorizedError } from "../utils/errors";
import { verifyAccessToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

/**
 * Auth Middleware - Verify JWT Token
 */

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    /* Get Authorization Header */
    const authHeader = req.headers.authorization;

    /* Check if Authorization Header is present */
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    /* Extract Token */
    const token = authHeader.substring(7);

    /* Verify Token */
    const payload = verifyAccessToken(token);

    /* Check user exists */
    const user = await findUserById(payload.userId);

    if (!user) throw new UnauthorizedError("User not found");

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else {
      next(new UnauthorizedError("Invalid or expired token"));
    }
  }
};

/**
 * Optional Auth Middleware - Verify JWT Token (optional)
 */
export const optionalAuthenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const payload = verifyAccessToken(token);

      req.user = {
        userId: payload.userId,
        email: payload.email,
      };
    }

    next();
  } catch (error) {
    /* Continue even if token is invalid */
    next();
  }
};
