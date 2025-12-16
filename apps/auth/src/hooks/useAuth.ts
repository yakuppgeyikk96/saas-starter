import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { API_ENDPOINTS } from "../lib/constants";
import { useAuthStore } from "../stores/authStore";
import {
  ApiResponse,
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from "../types";

/**
 * Main auth hook - TanStack Query ile API management
 * Navigation ve auth state yönetimini otomatik handle eder
 */
export const useAuth = () => {
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        useAuthStore.setState({
          user: data.data.user,
          token: data.data.token,
          refreshToken: data.data.refreshToken,
          isAuthenticated: true,
        });
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
  });

  const {
    mutate: signup,
    isPending: isSigningUp,
    error: signupError,
  } = useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const response = await api.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.SIGNUP,
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && data.data) {
        useAuthStore.setState({
          user: data.data.user,
          token: data.data.token,
          refreshToken: data.data.refreshToken,
          isAuthenticated: true,
        });
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
  });

  const {
    mutate: logout,
    isPending: isLoggingOut,
    error: logoutError,
  } = useMutation({
    mutationFn: async () => {
      try {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      } catch (error) {
        console.error("Logout API Error:", error);
        throw error;
      }
      useAuthStore.setState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    },
    onSuccess: () => {
      navigate("/auth/login");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const getUser = useCallback(async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }, []);

  return {
    login,
    isLoggingIn,
    loginError,
    signup,
    isSigningUp,
    signupError,
    logout,
    isLoggingOut,
    logoutError,
    getUser,
  };
};
