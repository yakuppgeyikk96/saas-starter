// Generic validation utility - Can be used with any Zod schema
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  IApiResponse,
  createErrorResponse,
} from "../types/responses/api.response";
import { BadRequestError } from "./errors";

/**
 * Generic validation middleware factory
 * Can be used with any Zod schema
 */
export const validate = (schema: z.ZodSchema) => {
  return (
    req: Request,
    res: Response<IApiResponse<null>>,
    next: NextFunction
  ) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(", ");
        const validationError = new BadRequestError(errorMessage);
        const errorResponse = createErrorResponse(
          validationError.message,
          validationError.statusCode
        );
        return res.status(validationError.statusCode).json(errorResponse);
      }
      next(error);
    }
  };
};
