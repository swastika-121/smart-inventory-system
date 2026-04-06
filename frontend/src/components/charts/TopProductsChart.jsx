import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS, CHART_TOOLTIP, CHART_FONT } from '../../utils/constants';

export default function TopProductsChart({ labels, data, height = 200 }) {
  const ref      = useRef(null);
  const chartRef = useRef(null);

  const finalLabels = labels || ['Wireless\nHeadphones', 'USB-C Hub', 'Mech.\nKeyboard', 'Standing\nDesk', 'Desk Lamp'];
  const finalData   = data   || [145, 320, 92, 34, 57];
  const colors = [
    CHART_COLORS.amber + 'CC',
    CHART_COLORS.teal  + 'CC',
    CHART_COLORS.purple + 'CC',
    CHART_COLORS.blue  + 'CC',
    CHART_COLORS.red   + 'CC',
  ];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: finalLabels,
        datasets: [{
          label: 'Units',
          data: finalData,
          backgroundColor: colors,
          borderRadius: 8,
          borderWidth: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 11 }, maxRotation: 0 },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } },
          },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [JSON.stringify(finalLabels), JSON.stringify(finalData)]);

  return <div style={{ position: 'relative', height }}><canvas ref={ref} /></div>;
}
