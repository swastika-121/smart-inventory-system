import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const alertService = {
  /** Get all alerts (supports ?status=unresolved&level=critical) */
  getAlerts: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.ALERTS, { params });
    return data;
  },

  /** Get single alert */
  getAlert: async (id) => {
    const { data } = await api.get(ENDPOINTS.ALERT(id));
    return data;
  },

  /** Mark alert as resolved */
  resolveAlert: async (id) => {
    const { data } = await api.post(ENDPOINTS.RESOLVE(id));
    return data;
  },

  /** Bulk resolve */
  bulkResolve: async (ids) => {
    const { data } = await api.post(`${ENDPOINTS.ALERTS}bulk-resolve/`, { ids });
    return data;
  },

  /** Delete an alert */
  deleteAlert: async (id) => {
    await api.delete(ENDPOINTS.ALERT(id));
  },

  /** Get alert summary counts */
  getAlertSummary: async () => {
    const { data } = await api.get(`${ENDPOINTS.ALERTS}summary/`);
    return data; // { total, critical, warnings, unresolved }
  },
};