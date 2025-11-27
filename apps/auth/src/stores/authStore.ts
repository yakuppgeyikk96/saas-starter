import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/api";
import { API_ENDPOINTS } from "../lib/constants";
import { LoginCredentials, SignupCredentials, User } from "../types";

export interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          // MOCK: Backend olmadan test için
          // Simüle edilmiş delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Mock user ve token
          const mockUser: User = {
            id: "1",
            email: credentials.email,
            name: "Test User",
            createdAt: new Date().toISOString(),
          };
          const mockToken = "mock-jwt-token-" + Date.now();

          // setAuth ile store'u güncelle
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
        // set({ isLoading: true });
        // try {
        //   const response = await api.post<AuthResponse>(
        //     API_ENDPOINTS.AUTH.LOGIN,
        //     credentials
        //   );
        //   const { user, token } = response.data;
        //   set({
        //     user,
        //     token,
        //     isAuthenticated: true,
        //     isLoading: false,
        //   });
        // } catch (error) {
        //   set({ isLoading: false });
        //   throw error;
        // }
      },

      signup: async (credentials: SignupCredentials) => {
        set({ isLoading: true });
        try {
          // MOCK: Backend olmadan test için
          // Simüle edilmiş delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Mock user ve token
          const mockUser: User = {
            id: "1",
            email: credentials.email,
            name: credentials.name || "New User",
            createdAt: new Date().toISOString(),
          };
          const mockToken = "mock-jwt-token-" + Date.now();

          // setAuth ile store'u güncelle
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
        // set({ isLoading: true });
        // try {
        //   const response = await api.post<AuthResponse>(
        //     API_ENDPOINTS.AUTH.SIGNUP,
        //     credentials
        //   );
        //   const { user, token } = response.data;
        //   set({
        //     user,
        //     token,
        //     isAuthenticated: true,
        //     isLoading: false,
        //   });
        // } catch (error) {
        //   set({ isLoading: false });
        //   throw error;
        // }
      },

      logout: async () => {
        try {
          await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch {
          // Ignore logout errors
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await api.get<{ user: User }>(API_ENDPOINTS.AUTH.ME);
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      setAuth: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
