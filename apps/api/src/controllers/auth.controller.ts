// Auth controller - Request/Response handlers
import { Request, Response } from "express";
import {
  getCurrentUser as getCurrentUserService,
  login as loginService,
  logout as logoutService,
  refreshAccessToken as refreshAccessTokenService,
  signup as signupService,
} from "../services/auth.service";
import {
  LoginRequest,
  RefreshTokenRequest,
  SignupRequest,
} from "../types/requests/auth.request";
import {
  IApiResponse,
  createSuccessResponse,
} from "../types/responses/api.response";
import {
  LoginResponseData,
  MeResponseData,
  RefreshTokenResponseData,
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

/**
 * Get current user (me) controller
 */
export const me = asyncHandler(
  async (req: Request, res: Response<IApiResponse<MeResponseData>>) => {
    // req.user middleware tarafından eklendi
    const userId = req.user!.userId;

    const user = await getCurrentUserService(userId);

    const responseData: MeResponseData = { user };

    const response = createSuccessResponse(
      responseData,
      "User retrieved successfully",
      200
    );

    res.status(200).json(response);
  }
);

/**
 * Refresh token controller
 */
export const refresh = asyncHandler(
  async (
    req: Request<
      {},
      IApiResponse<RefreshTokenResponseData>,
      RefreshTokenRequest
    >,
    res: Response<IApiResponse<RefreshTokenResponseData>>
  ) => {
    const request: RefreshTokenRequest = req.body;

    const result = await refreshAccessTokenService({
      refreshToken: request.refreshToken,
    });

    const responseData: RefreshTokenResponseData = {
      token: result.token,
      refreshToken: result.refreshToken,
    };

    const response = createSuccessResponse(
      responseData,
      "Token refreshed successfully",
      200
    );

    res.status(200).json(response);
  }
);

/**
 * Logout controller
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  // req.user middleware tarafından eklendi
  const userId = req.user!.userId;

  await logoutService(userId);

  const response = createSuccessResponse(null, "Logout successful", 200);

  res.status(200).json(response);
});
