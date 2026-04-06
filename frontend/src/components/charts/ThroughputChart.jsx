import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS, CHART_TOOLTIP, CHART_FONT, MONTHS } from '../../utils/constants';

export default function ThroughputChart({ height = 220 }) {
  const ref      = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: 'H1',
            data: [320, 480, 410, 560, 620, 480, 0, 0, 0, 0, 0, 0],
            backgroundColor: CHART_COLORS.teal + 'B3',
            borderRadius: 6,
            borderWidth: 0,
          },
          {
            label: 'H2',
            data: [0, 0, 0, 0, 0, 0, 710, 690, 850, 820, 920, 1020],
            backgroundColor: CHART_COLORS.amber + 'B3',
            borderRadius: 6,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } },
          },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return <div style={{ position: 'relative', height }}><canvas ref={ref} /></div>;
}
