import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { api, authApi } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; role?: string } | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string; role?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isAdmin = user?.role === 'admin';

  const checkAuth = async () => {
    const token = api.getToken();
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authApi.getProfile();
      setIsAuthenticated(true);
      setUser({
        ...response.data.user,
        role: response.data.user.role || 'user',
      });
    } catch (error) {
      // Token invalid or expired
      api.removeToken();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    setIsAuthenticated(true);
    setUser({
      ...response.data.user,
      role: response.data.user.role || 'user',
    });
  };

  const logout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Listen for storage changes (for logout from other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        if (!e.newValue) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          checkAuth();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, isAdmin, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

