import { createUser, findUserByEmail, userExists } from "../repositories";
import {
  AuthResultDto,
  LoginDto,
  SignupDto,
  UserDto,
} from "../types/dtos/auth.dto";
import { ConflictError, UnauthorizedError } from "../utils/errors";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
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

  return {
    user: userDto,
    token,
    refreshToken,
  };
};
