/**
 * Decode JWT token without verification
 * Returns null if token is invalid or cannot be decoded
 */
export const decodeToken = (token: string | null): { exp?: number } | null => {
  if (!token) return null;

  try {
    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Decode payload (base64url)
    const payload = parts[1];
    const decoded = JSON.parse(
      atob(payload?.replace(/-/g, "+").replace(/_/g, "/") || "")
    );

    return decoded;
  } catch {
    return null;
  }
};

/**
 * Check if token is expired
 * Returns true if token is expired or invalid
 */
export const isTokenExpired = (token: string | null): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();

  // Add 5 second buffer to account for clock skew
  return currentTime >= expirationTime - 5000;
};
