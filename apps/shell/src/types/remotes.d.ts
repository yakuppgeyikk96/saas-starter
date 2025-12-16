declare module "auth/components" {
  import { ReactNode } from "react";

  export const LoginForm: React.ComponentType;
  export const SignupForm: React.ComponentType;

  interface ProtectedRouteProps {
    children: ReactNode;
  }

  export const ProtectedRoute: React.ComponentType<ProtectedRouteProps>;
}

declare module "auth/stores" {
  import { StoreApi, UseBoundStore } from "zustand";

  interface User {
    id: string;
    email: string;
    name?: string;
  }

  interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
  }

  interface AuthStore extends AuthState {
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    reset: () => void;
  }

  export const useAuthStore: UseBoundStore<StoreApi<AuthStore>>;
  export type { AuthStore };
}

declare module "dashboard/Dashboard" {
  const Dashboard: React.ComponentType;
  export default Dashboard;
}

declare module "users/Users" {
  const Users: React.ComponentType;
  export default Users;
}
