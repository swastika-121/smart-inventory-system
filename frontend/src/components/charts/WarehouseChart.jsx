import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS, CHART_TOOLTIP, CHART_FONT } from '../../utils/constants';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WarehouseChart({ data, height = 220 }) {
  const ref      = useRef(null);
  const chartRef = useRef(null);

  const alpha  = data?.alpha  || [120, 145, 98,  178, 154, 210, 180];
  const beta   = data?.beta   || [80,  95,  60,  110, 90,  130, 100];
  const gamma  = data?.gamma  || [55,  70,  45,  90,  72,  110, 85];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: DAYS,
        datasets: [
          {
            label: 'WH-Alpha',
            data: alpha,
            borderColor: CHART_COLORS.teal,
            backgroundColor: 'transparent',
            borderWidth: 2, tension: 0.4,
            pointRadius: 4, pointBackgroundColor: CHART_COLORS.teal,
            pointBorderColor: '#111E33', pointBorderWidth: 2,
          },
          {
            label: 'WH-Beta',
            data: beta,
            borderColor: CHART_COLORS.amber,
            backgroundColor: 'transparent',
            borderWidth: 2, tension: 0.4,
            pointRadius: 4, pointBackgroundColor: CHART_COLORS.amber,
            pointBorderColor: '#111E33', pointBorderWidth: 2,
          },
          {
            label: 'WH-Gamma',
            data: gamma,
            borderColor: CHART_COLORS.purple,
            backgroundColor: 'transparent',
            borderWidth: 2, tension: 0.4,
            pointRadius: 4, pointBackgroundColor: CHART_COLORS.purple,
            pointBorderColor: '#111E33', pointBorderWidth: 2,
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
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 11 } },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } },
          },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [JSON.stringify(data)]);

  return <div style={{ position: 'relative', height }}><canvas ref={ref} /></div>;
}
