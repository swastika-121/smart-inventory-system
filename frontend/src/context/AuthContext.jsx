import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // checking session on mount
  const [error,   setError]   = useState(null);

  /* Re-hydrate user from token on app load */
  useEffect(() => {
    const init = async () => {
      if (!authService.isAuthenticated()) { setLoading(false); return; }
      try {
        const me = await authService.getMe();
        setUser(me);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    const u = await authService.login(email, password);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (payload) => {
    setError(null);
    const u = await authService.register(payload);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const hasPermission = useCallback((action) => {
    if (!user) return false;
    const { ROLE_PERMISSIONS } = require('../utils/constants');
    return (ROLE_PERMISSIONS[user.role] || []).includes(action);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, hasPermission, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
