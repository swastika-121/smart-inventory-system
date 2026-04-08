import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const userService = {
  /** Get all users (admin only) */
  getUsers: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.USERS, { params });
    return data;
  },

  /** Get single user */
  getUser: async (id) => {
    const { data } = await api.get(ENDPOINTS.USER(id));
    return data;
  },

  /** Create a new user */
  createUser: async (payload) => {
    const { data } = await api.post(ENDPOINTS.USERS, payload);
    return data;
  },

  /** Update user (role, status, etc.) */
  updateUser: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.USER(id), payload);
    return data;
  },

  /** Delete / deactivate user */
  deleteUser: async (id) => {
    await api.delete(ENDPOINTS.USER(id));
  },

  /** Change own password */
  changePassword: async (oldPassword, newPassword) => {
    const { data } = await api.post('/auth/change-password/', {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return data;
  },
};