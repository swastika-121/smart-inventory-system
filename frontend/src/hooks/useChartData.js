import { useState, useCallback } from 'react';
import { inventoryService } from '../services/inventoryService';
import { CHART_COLORS, CHART_TOOLTIP, CHART_FONT, MONTHS } from '../utils/constants';

export function useChartData() {
  const [chartData, setChartData] = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);

  const fetch = useCallback(async (range = '14d') => {
    setLoading(true); setError(null);
    try {
      const data = await inventoryService.getDashboardCharts(range);
      setChartData(data);
      return data;
    } catch (e) {
      setError('Failed to load chart data');
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Config builders (Chart.js options) ── */
  const buildLineConfig = (labels, datasets) => ({
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 }, maxRotation: 0, maxTicksLimit: 7 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } } },
      },
    },
  });

  const buildBarConfig = (labels, dataArr, colors) => ({
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data: dataArr,
        backgroundColor: colors || [CHART_COLORS.amber, CHART_COLORS.teal, CHART_COLORS.purple, CHART_COLORS.blue, CHART_COLORS.red].map(c => c + 'CC'),
        borderRadius: 8,
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 }, maxRotation: 0 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } } },
      },
    },
  });

  const buildDoughnutConfig = (labels, dataArr, colors) => ({
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: dataArr, backgroundColor: colors, borderColor: 'transparent', borderWidth: 0, hoverOffset: 6 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
    },
  });

  return { chartData, loading, error, fetch, buildLineConfig, buildBarConfig, buildDoughnutConfig };
}