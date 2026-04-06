import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS, CHART_TOOLTIP, CHART_FONT } from '../../utils/constants';
import { formatDateShort } from '../../utils/formatters';

export default function StockMovementChart({ inData, outData, labels, height = 200 }) {
  const ref      = useRef(null);
  const chartRef = useRef(null);

  // Fallback mock data for development
  const finalLabels = labels || Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 13 + i);
    return formatDateShort(d.toISOString());
  });
  const finalIn  = inData  || [120,145,98,210,170,88,134,200,155,100,178,230,190,145];
  const finalOut = outData || [80,95,60,140,110,50,90,150,100,70,120,180,130,89];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: finalLabels,
        datasets: [
          {
            label: 'Stock In',
            data: finalIn,
            borderColor: CHART_COLORS.teal,
            backgroundColor: CHART_COLORS.tealA,
            borderWidth: 2, fill: true, tension: 0.4,
            pointRadius: 0, pointHoverRadius: 5,
            pointHoverBackgroundColor: CHART_COLORS.teal,
          },
          {
            label: 'Stock Out',
            data: finalOut,
            borderColor: CHART_COLORS.amber,
            backgroundColor: CHART_COLORS.amberA,
            borderWidth: 2, fill: true, tension: 0.4,
            pointRadius: 0, pointHoverRadius: 5,
            pointHoverBackgroundColor: CHART_COLORS.amber,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 }, maxRotation: 0, maxTicksLimit: 7 },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#3A4E6A', font: { family: CHART_FONT, size: 10 } },
          },
        },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [JSON.stringify(finalLabels), JSON.stringify(finalIn), JSON.stringify(finalOut)]);

  return <div style={{ position: 'relative', height }}><canvas ref={ref} /></div>;
}
