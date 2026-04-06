import React, { createContext, useContext, useState, useCallback } from 'react';
import { inventoryService } from '../services/inventoryService';
import { alertService } from '../services/alertService';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [products,   setProducts]   = useState([]);
  const [alerts,     setAlerts]     = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [stats,      setStats]      = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);

  /* ── Products ── */
  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true); setError(null);
    try {
      const data = await inventoryService.getProducts(params);
      setProducts(data.results ?? data);
      return data;
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to load products');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = useCallback(async (payload) => {
    const product = await inventoryService.createProduct(payload);
    setProducts((prev) => [product, ...prev]);
    return product;
  }, []);

  const updateProduct = useCallback(async (id, payload) => {
    const updated = await inventoryService.updateProduct(id, payload);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await inventoryService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  /* ── Alerts ── */
  const fetchAlerts = useCallback(async (params = {}) => {
    setLoading(true); setError(null);
    try {
      const data = await alertService.getAlerts(params);
      setAlerts(data.results ?? data);
      return data;
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to load alerts');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const resolveAlert = useCallback(async (id) => {
    const updated = await alertService.resolveAlert(id);
    setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
    return updated;
  }, []);

  /* ── Dashboard Stats ── */
  const fetchStats = useCallback(async () => {
    try {
      const data = await inventoryService.getDashboardStats();
      setStats(data);
      return data;
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to load stats');
    }
  }, []);

  /* ── Warehouses ── */
  const fetchWarehouses = useCallback(async () => {
    try {
      const data = await inventoryService.getWarehouses();
      setWarehouses(data.results ?? data);
      return data;
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to load warehouses');
    }
  }, []);

  return (
    <InventoryContext.Provider value={{
      products, alerts, warehouses, stats,
      loading, error,
      fetchProducts, addProduct, updateProduct, deleteProduct,
      fetchAlerts, resolveAlert,
      fetchStats, fetchWarehouses,
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventory must be used within InventoryProvider');
  return ctx;
};
