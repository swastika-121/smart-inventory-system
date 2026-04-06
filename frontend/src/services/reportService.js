import api from './api';
import { ENDPOINTS } from '../utils/constants';

/** Helper: trigger a file download from a Blob response */
const downloadBlob = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const reportService = {
  /** Full inventory CSV export */
  exportInventoryCSV: async () => {
    const { data } = await api.get(`${ENDPOINTS.REPORTS}inventory/`, {
      responseType: 'blob',
    });
    downloadBlob(data, 'inventory_export.csv');
  },

  /** Stock movement report (CSV) */
  exportStockMovement: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.REPORT_STOCK_MOVEMENT, {
      params,
      responseType: 'blob',
    });
    downloadBlob(data, 'stock_movement.csv');
  },

  /** Inventory valuation (CSV) */
  exportValuation: async () => {
    const { data } = await api.get(ENDPOINTS.REPORT_VALUATION, {
      responseType: 'blob',
    });
    downloadBlob(data, 'inventory_valuation.csv');
  },

  /** Alert history export (CSV) */
  exportAlerts: async () => {
    const { data } = await api.get(ENDPOINTS.REPORT_ALERTS, {
      responseType: 'blob',
    });
    downloadBlob(data, 'alert_history.csv');
  },

  /** Audit log export (CSV) */
  exportAuditLog: async (params = {}) => {
    const { data } = await api.get(`${ENDPOINTS.AUDIT_LOGS}export/`, {
      params,
      responseType: 'blob',
    });
    downloadBlob(data, 'audit_log.csv');
  },

  /** Warehouse utilization (CSV) */
  exportWarehouseReport: async () => {
    const { data } = await api.get(`${ENDPOINTS.REPORTS}warehouses/`, {
      responseType: 'blob',
    });
    downloadBlob(data, 'warehouse_utilization.csv');
  },
};
