import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { ROLE_PERMISSIONS } from '../utils/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [username, setUsername] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!authService.isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const me = await authService.getMe();
        setUsername(me); 
      } catch {
        await authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      const u = await authService.login(email, password);
      setUsername(u); 
      return u;
    } catch (err) {
      setError(err.response?.data || "Login failed");
      throw err;
    }
  }, []);

  const register = useCallback(async (payload) => {
    setError(null);
    try {
      const u = await authService.register(payload);
      setUsername(u); 
      return u;
    } catch (err) {
      setError(err.response?.data || "Registration failed");
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUsername(null); 
    }
  }, []);

  const hasPermission = useCallback((action) => {
    if (!username) return false;
    return (ROLE_PERMISSIONS[username.role] || []).includes(action);
  }, [username]);

  return (
    <AuthContext.Provider
      value={{
        username, 
        loading,
        error,
        login,
        register,
        logout,
        hasPermission,
        isAdmin: username?.role === 'admin' 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};