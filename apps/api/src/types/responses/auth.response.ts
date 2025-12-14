// Response types - API response types (Controller layer)
import { UserDto } from "../dtos/auth.dto";

// Auth response data types
export interface SignupResponseData {
  user: UserDto;
  token: string;
  refreshToken: string;
}

export interface LoginResponseData {
  user: UserDto;
  token: string;
  refreshToken: string;
}

export interface MeResponseData {
  user: UserDto;
}

export interface RefreshTokenResponseData {
  token: string;
  refreshToken: string;
}
