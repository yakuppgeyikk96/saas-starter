import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { refreshToken } from "shell/lib/api";
import { useAuthStore } from "../stores/authStore";
import { isTokenExpired } from "../utils";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {
    isAuthenticated,
    token,
    refreshToken: storedRefreshToken,
    clearAuth,
    setTokens,
  } = useAuthStore();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      // If not authenticated, no need to validate
      if (!isAuthenticated || !token) {
        setIsValidating(false);
        return;
      }

      // Check if token is expired
      if (isTokenExpired(token)) {
        // Try to refresh token using centralized function
        if (storedRefreshToken && !isTokenExpired(storedRefreshToken)) {
          try {
            const { token: newToken, refreshToken: newRefreshToken } =
              await refreshToken();
            setTokens(newToken, newRefreshToken);
            setIsValidating(false);
            return;
          } catch (error) {
            // Refresh failed, clear auth and redirect
            console.error("Token refresh failed:", error);
            clearAuth();
            setIsValidating(false);
            return;
          }
        } else {
          // Refresh token is also expired or missing
          clearAuth();
          setIsValidating(false);
          return;
        }
      }

      // Token is valid
      setIsValidating(false);
    };

    validateToken();
    // Only run on mount and when isAuthenticated changes, not when token changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Validating session...</div>
      </div>
    );
  }

  // If not authenticated after validation, redirect to login
  if (!isAuthenticated || !token || isTokenExpired(token)) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};
