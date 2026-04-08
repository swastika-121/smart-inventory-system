import { useState, useCallback } from 'react';
import { alertService } from '../services/alertService';

export function useAlerts() {
  const [alerts,   setAlerts]   = useState([]);
  const [summary,  setSummary]  = useState({ total: 0, critical: 0, warnings: 0, unresolved: 0 });
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const fetch = useCallback(async (params = {}) => {
    setLoading(true); setError(null);
    try {
      const [alertData, summaryData] = await Promise.all([
        alertService.getAlerts(params),
        alertService.getAlertSummary(),
      ]);
      setAlerts(alertData.results ?? alertData);
      setSummary(summaryData);
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  const resolve = useCallback(async (id) => {
    const updated = await alertService.resolveAlert(id);
    setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
    setSummary((s) => ({ ...s, unresolved: Math.max(0, s.unresolved - 1) }));
    return updated;
  }, []);

  const remove = useCallback(async (id) => {
    await alertService.deleteAlert(id);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { alerts, summary, loading, error, fetch, resolve, remove };
}