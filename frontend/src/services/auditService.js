import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const auditService = {
  /** Get audit log entries with optional filters */
  getLogs: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.AUDIT_LOGS, { params });
    return data; // { results, count, next, previous }
  },

  /** Get a single log entry */
  getLog: async (id) => {
    const { data } = await api.get(`${ENDPOINTS.AUDIT_LOGS}${id}/`);
    return data;
  },

  /** Export audit log as CSV */
  exportCSV: async (params = {}) => {
    const { data } = await api.get(`${ENDPOINTS.AUDIT_LOGS}export/`, {
      params,
      responseType: 'blob',
    });
    const url  = URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit_log.csv';
    link.click();
    URL.revokeObjectURL(url);
  },
};