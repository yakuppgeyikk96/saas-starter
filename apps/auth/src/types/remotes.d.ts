declare module "shell/lib/api" {
  import { AxiosInstance } from "axios";
  export const api: AxiosInstance;
  export const configureApi: (baseURL: string) => void;
  const apiClient: AxiosInstance;
  export default apiClient;
}

declare module "shell/lib/constants" {
  export const API_ENDPOINTS: {
    readonly AUTH: {
      readonly LOGIN: "/api/v1/auth/login";
      readonly SIGNUP: "/api/v1/auth/signup";
      readonly LOGOUT: "/api/v1/auth/logout";
      readonly ME: "/api/v1/auth/me";
      readonly REFRESH: "/api/v1/auth/refresh";
    };
  };
}
