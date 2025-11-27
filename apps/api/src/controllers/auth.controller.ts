// Auth controller - Request/Response handlers
import { Request, Response } from "express";
import {
  login as loginService,
  signup as signupService,
} from "../services/auth.service";
import { LoginRequest, SignupRequest } from "../types/requests/auth.request";
import {
  IApiResponse,
  createSuccessResponse,
} from "../types/responses/api.response";
import {
  LoginResponseData,
  SignupResponseData,
} from "../types/responses/auth.response";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * Signup controller
 */
export const signup = asyncHandler(
  async (
    req: Request<{}, IApiResponse<SignupResponseData>, SignupRequest>,
    res: Response<IApiResponse<SignupResponseData>>
  ) => {
    const request: SignupRequest = req.body;

    // Call service (errors will be caught by asyncHandler)
    const result = await signupService(request);

    // Create response data
    const responseData: SignupResponseData = {
      user: result.user,
      token: result.token,
      refreshToken: result.refreshToken,
    };

    // Create success response
    const response = createSuccessResponse(
      responseData,
      "User created successfully",
      201
    );

    res.status(201).json(response);
  }
);

/**
 * Login controller
 */
export const login = asyncHandler(
  async (
    req: Request<{}, IApiResponse<LoginResponseData>, LoginRequest>,
    res: Response<IApiResponse<LoginResponseData>>
  ) => {
    const request: LoginRequest = req.body;

    // Call service (errors will be caught by asyncHandler)
    const result = await loginService(request);

    // Create response data
    const responseData: LoginResponseData = {
      user: result.user,
      token: result.token,
      refreshToken: result.refreshToken,
    };

    // Create success response
    const response = createSuccessResponse(
      responseData,
      "Login successful",
      200
    );

    res.status(200).json(response);
  }
);
