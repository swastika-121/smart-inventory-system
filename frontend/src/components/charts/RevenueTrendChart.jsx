import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS, CHART_TOOLTIP, CHART_FONT, MONTHS } from '../../utils/constants';

export default function RevenueTrendChart({ labels, data, height = 200 }) {
  const ref      = useRef(null);
  const chartRef = useRef(null);

  const finalLabels = labels || MONTHS;
  const finalData   = data   || [42000,55000,48000,61000,72000,58000,80000,75000,90000,84000,95000,102000];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: finalLabels,
        datasets: [{
          label: 'Revenue',
          data: finalData,
          borderColor: CHART_COLORS.purple,
          backgroundColor: CHART_COLORS.purpleA,
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: CHART_COLORS.purple,
          pointBorderColor: '#111E33',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            ...CHART_TOOLTIP,
            callbacks: {
              label: (ctx) => ` $${(ctx.raw / 1000).toFixed(1)}k`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: {
              color: '#3A4E6A',
              font: { family: CHART_FONT, size: 10 },
              callback: (v) => `$${v / 1000}k`,
            },
          },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [JSON.stringify(finalLabels), JSON.stringify(finalData)]);

  return <div style={{ position: 'relative', height }}><canvas ref={ref} /></div>;
}
