import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook that requires authentication
 * Redirects to login if user is not authenticated
 * Automatically fetches user data if token exists but user is null
 */
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, fetchUser, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If we have a token but no user, try to fetch user
    if (token && !isAuthenticated && !isLoading) {
      fetchUser();
    }
  }, [token, isAuthenticated, isLoading, fetchUser]);

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return { isAuthenticated, isLoading };
};

