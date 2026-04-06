import api from './api';
import { ENDPOINTS } from '../utils/constants';

export const inventoryService = {
  /** Get paginated, filtered product list */
  getProducts: async (params = {}) => {
    const { data } = await api.get(ENDPOINTS.PRODUCTS, { params });
    return data; // { results, count, next, previous }
  },

  /** Get single product by ID */
  getProduct: async (id) => {
    const { data } = await api.get(ENDPOINTS.PRODUCT(id));
    return data;
  },

  /** Create a new product */
  createProduct: async (payload) => {
    const { data } = await api.post(ENDPOINTS.PRODUCTS, payload);
    return data;
  },

  /** Update a product (full update) */
  updateProduct: async (id, payload) => {
    const { data } = await api.put(ENDPOINTS.PRODUCT(id), payload);
    return data;
  },

  /** Partial update (PATCH) */
  patchProduct: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.PRODUCT(id), payload);
    return data;
  },

  /** Delete a product */
  deleteProduct: async (id) => {
    await api.delete(ENDPOINTS.PRODUCT(id));
  },

  /** Bulk delete */
  bulkDelete: async (ids) => {
    await api.post(`${ENDPOINTS.PRODUCTS}bulk-delete/`, { ids });
  },

  /** Get dashboard stats */
  getDashboardStats: async () => {
    const { data } = await api.get(ENDPOINTS.DASHBOARD_STATS);
    return data;
  },

  /** Get chart data for dashboard */
  getDashboardCharts: async (range = '14d') => {
    const { data } = await api.get(ENDPOINTS.DASHBOARD_CHARTS, { params: { range } });
    return data;
  },

  /** Get warehouses */
  getWarehouses: async () => {
    const { data } = await api.get(ENDPOINTS.WAREHOUSES);
    return data;
  },
};
