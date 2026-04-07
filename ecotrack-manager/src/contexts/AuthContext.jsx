import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser({
        id: 'manager-001',
        name: 'Admin Manager',
        email: 'manager@ecotrack.com',
        role: 'admin'
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication (replace with real API)
    if (email.includes('@') && password.length >= 6) {
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('authToken', token);
      
      setIsAuthenticated(true);
      setUser({
        id: 'manager-001',
        name: 'Admin Manager',
        email,
        role: 'admin'
      });
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
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
