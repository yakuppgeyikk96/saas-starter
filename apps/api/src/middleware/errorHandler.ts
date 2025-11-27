import { NextFunction, Request, Response } from "express";
import {
  IApiResponse,
  createErrorResponse,
} from "../types/responses/api.response";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response<IApiResponse<null>>,
  _next: NextFunction
) => {
  // Log error stack in development
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Handle AppError (custom errors)
  if (err instanceof AppError) {
    const errorResponse = createErrorResponse(err.message, err.statusCode);
    return res.status(err.statusCode).json(errorResponse);
  }

  // Handle unknown errors
  const statusCode = 500;
  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Internal Server Error";

  const errorResponse = createErrorResponse(message, statusCode);
  res.status(statusCode).json(errorResponse);
};
