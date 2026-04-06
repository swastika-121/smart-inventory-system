import { useState, useCallback } from 'react';
import { inventoryService } from '../services/inventoryService';

/**
 * Standalone hook for local product fetching with pagination + search.
 * Use this inside pages that need their own isolated state.
 * For shared/global state, use InventoryContext instead.
 */
export function useInventory(initialParams = {}) {
  const [products,    setProducts]    = useState([]);
  const [totalCount,  setTotalCount]  = useState(0);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [params,      setParams]      = useState({ page: 1, page_size: 10, ...initialParams });

  const fetch = useCallback(async (overrides = {}) => {
    const merged = { ...params, ...overrides };
    setParams(merged);
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getProducts(merged);
      setProducts(data.results ?? data);
      setTotalCount(data.count ?? (data.results ?? data).length);
      return data;
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to fetch products');
      throw e;
    } finally {
      setLoading(false);
    }
  }, [params]);

  const setPage = useCallback((page) => fetch({ page }), [fetch]);
  const setSearch = useCallback((search) => fetch({ search, page: 1 }), [fetch]);
  const setFilter = useCallback((filter) => fetch({ ...filter, page: 1 }), [fetch]);

  const create = useCallback(async (payload) => {
    const product = await inventoryService.createProduct(payload);
    setProducts((prev) => [product, ...prev]);
    setTotalCount((c) => c + 1);
    return product;
  }, []);

  const update = useCallback(async (id, payload) => {
    const updated = await inventoryService.updateProduct(id, payload);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await inventoryService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setTotalCount((c) => c - 1);
  }, []);

  return {
    products, totalCount, loading, error, params,
    fetch, setPage, setSearch, setFilter, create, update, remove,
  };
}
