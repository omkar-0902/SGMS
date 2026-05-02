import { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin } from '../services/api';

const AuthContext = createContext(null);

/**
 * Safely decode a JWT payload without a library.
 * Returns the parsed payload object, or null if decoding fails.
 */
function decodeJWT(token) {
  try {
    const base64Payload = token.split('.')[1];
    const padded = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(padded);
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage on app boot
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Calls POST /admins/login.
   * The backend returns a raw JWT string as the response body.
   * We decode the token payload to extract `sub` (admin email/username).
   */
  const login = async (email, password) => {
    try {
      const data = await loginAdmin({ email, password });

      // ── Regex-Based Token Extraction ─────────────────────────────────────
      // JWTs follow a specific pattern: header.payload.signature
      // We look for this pattern anywhere in the response string.
      let token = '';

      if (typeof data === 'string') {
        const jwtRegex = /[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/;
        const match = data.match(jwtRegex);
        if (match) {
          token = match[0];
        } else {
          token = data.trim();
        }
      } else if (data && typeof data === 'object') {
        token = data.token || data.accessToken || data.jwt || '';
      }

      if (!token || token.includes(' ')) {
        // Validation check: JWTs don't contain spaces. 
        // If it's still messy, the registration will definitely fail.
        return {
          success: false,
          error: 'Authentication format error: Could not isolate security token.',
        };
      }

      // Decode the JWT payload → { sub: "soham@gmail.com", iat, exp }
      const payload = decodeJWT(token);
      const emailFromToken = payload?.sub || email;
      const nameFromEmail = emailFromToken.split('@')[0];
      const displayName =
        nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

      const userObj = {
        id: payload?.id || payload?.adminId || 'admin-001',
        name: payload?.name || displayName,
        email: emailFromToken,
        role: payload?.role || 'admin',
      };

      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(userObj));

      setIsAuthenticated(true);
      setUser(userObj);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Invalid credentials. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
