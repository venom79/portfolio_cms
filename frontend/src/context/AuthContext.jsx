import { createContext, useState, useCallback } from "react";
import { authApi } from "../api/authApi";
import { TOKEN_STORAGE_KEY } from "../lib/constants";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authApi.login({ email, password });
      const accessToken = data.token || data.accessToken || data.data?.token;
      if (!accessToken)
        throw new Error("No access token returned by the server.");
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      setToken(accessToken);
      return true;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Invalid credentials. Try again.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
