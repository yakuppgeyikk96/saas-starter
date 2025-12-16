import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "./constants";

let API_BASE_URL = "http://localhost:8080";

// Configure API base URL
export const configureApi = (baseURL: string): void => {
  API_BASE_URL = baseURL;
  // Update existing axios instance baseURL
  api.defaults.baseURL = baseURL;
};

// Zustand persist storage key
const AUTH_STORAGE_KEY = "auth-storage";

// Helper to get token from Zustand persist storage
const getTokenFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed.state?.token || null;
  } catch {
    return null;
  }
};

const getRefreshTokenFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed.state?.refreshToken || null;
  } catch {
    return null;
  }
};

// Helper to clear auth storage
const clearAuthStorage = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

const updateTokensInStorage = (token: string, refreshToken: string): void => {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored);
    parsed.state = {
      ...parsed.state,
      token,
      refreshToken,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore errors
  }
};

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Skip adding token for refresh endpoint
    if (config.url?.includes("/auth/refresh")) {
      return config;
    }

    const token = getTokenFromStorage();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global refresh lock to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let refreshPromise: Promise<{ token: string; refreshToken: string }> | null =
  null;

// Helper function to refresh token (centralized)
const refreshAccessToken = async (): Promise<{
  token: string;
  refreshToken: string;
}> => {
  // If already refreshing, return the existing promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshTokenFromStorage();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const refreshResponse = await axios.post(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = refreshResponse.data;
      if (responseData.success && responseData.data) {
        const { token: newToken, refreshToken: newRefreshToken } =
          responseData.data;
        updateTokensInStorage(newToken, newRefreshToken);
        return { token: newToken, refreshToken: newRefreshToken };
      } else {
        throw new Error("Invalid refresh response");
      }
    } catch (error) {
      clearAuthStorage();
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

// Export refresh function for use in ProtectedRoute
export const refreshToken = refreshAccessToken;

// Response interceptor - Handle token refresh, errors, etc.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip interceptor logic for refresh endpoint
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token: newToken } = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
