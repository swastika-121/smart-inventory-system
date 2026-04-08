import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const authService = {
  /** Login → stores tokens, returns user object */
  login: async (email, password) => {
    const { data } = await api.post(ENDPOINTS.LOGIN, { email, password });
    localStorage.setItem('access_token',  data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data.user;
  },

  /** Register new user */
  register: async (payload) => {
    const { data } = await api.post(ENDPOINTS.REGISTER, payload);
    localStorage.setItem('access_token',  data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data.user;
  },

  /** Logout → blacklist refresh token, clear storage */
  logout: async () => {
    try {
      const refresh = localStorage.getItem('refresh_token');
      await api.post(ENDPOINTS.LOGOUT, { refresh });
    } catch (err) {
  console.log("AUTH ERROR:", err); 
}finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  /** Fetch current authenticated user */
  getMe: async () => {
    const { data } = await api.get(ENDPOINTS.ME);
    return data;
  },

  /** Check if a token is stored (quick local check) */
  isAuthenticated: () => !!localStorage.getItem('access_token'),
};