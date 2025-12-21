import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByRefreshToken,
  updateRefreshToken,
  userExists,
} from "../repositories";
import {
  AuthResultDto,
  LoginDto,
  RefreshTokenDto,
  RefreshTokenResultDto,
  SignupDto,
  UserDto,
} from "../types/dtos/auth.dto";
import { ConflictError, UnauthorizedError } from "../utils/errors";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { toUserDto } from "../utils/mappers/user.mapper";
import { comparePassword, hashPassword } from "../utils/password";

/**
 * Signup a new user
 */
export const signup = async (dto: SignupDto): Promise<AuthResultDto> => {
  // Check if user already exists
  const exists = await userExists(dto.email);

  if (exists) {
    throw new ConflictError("Email already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(dto.password);

  // Create user
  const user = await createUser({
    email: dto.email,
    name: dto.name,
    password: hashedPassword,
  });

  // Transform entity to DTO (exclude password)
  const userDto: UserDto = toUserDto(user);

  // Generate tokens
  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token to database
  await updateRefreshToken(user.id, refreshToken);

  return {
    user: userDto,
    token,
    refreshToken,
  };
};

/**
 * Login an existing user
 */
export const login = async (dto: LoginDto): Promise<AuthResultDto> => {
  // Find user by email
  const user = await findUserByEmail(dto.email);

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Verify password
  const isValid = await comparePassword(dto.password, user.password);
  if (!isValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  // Transform entity to DTO (exclude password)
  const userDto: UserDto = toUserDto(user);

  // Generate tokens
  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token to database
  await updateRefreshToken(user.id, refreshToken);

  return {
    user: userDto,
    token,
    refreshToken,
  };
};

/**
 * Get current user by ID
 */
export const getCurrentUser = async (userId: string): Promise<UserDto> => {
  const user = await findUserById(userId);

  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  return toUserDto(user);
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (
  dto: RefreshTokenDto
): Promise<RefreshTokenResultDto> => {
  // Verify refresh token
  let payload;
  try {
    payload = verifyRefreshToken(dto.refreshToken);
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }

  // Find user by refresh token (check if token exists in DB)
  const user = await findUserByRefreshToken(dto.refreshToken);

  if (!user) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  // Verify token belongs to the user
  if (user.id !== payload.userId) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  // Update refresh token in database
  await updateRefreshToken(user.id, newRefreshToken);

  return {
    token: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Logout user - Invalidate refresh token
 */
export const logout = async (userId: string): Promise<void> => {
  // Clear refresh token from database
  await updateRefreshToken(userId, null);
};
