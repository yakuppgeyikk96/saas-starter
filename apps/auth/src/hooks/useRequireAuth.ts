import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useAuth } from "./useAuth";

/**
 * Hook that requires authentication
 * Redirects to login if user is not authenticated
 * Automatically fetches user data if token exists but user is null
 */
export const useRequireAuth = () => {
  const { isAuthenticated, token } = useAuthStore();
  const { getUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If we have a token but no user, try to fetch user
    if (token && !isAuthenticated) {
      getUser();
    }
  }, [token, isAuthenticated, getUser]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate]);

  return { isAuthenticated };
};
