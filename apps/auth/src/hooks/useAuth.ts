import { useAuthStore } from '../stores/authStore';

/**
 * Main auth hook - provides access to auth store
 * @returns Auth store with user, token, and auth actions
 */
export const useAuth = () => {
  return useAuthStore();
};

