import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { CHART_COLORS, CHART_TOOLTIP } from '../../utils/constants';
import { formatNumber } from '../../utils/formatters';

export default function StockStatusChart({ data, total = 2847, height = 180 }) {
  const ref      = useRef(null);
  const chartRef = useRef(null);

  const chartData = data || [68, 22, 10, 8];
  const labels    = ['In Stock', 'Low Stock', 'Out of Stock', 'Overstock'];
  const colors    = [CHART_COLORS.teal, CHART_COLORS.amber, CHART_COLORS.red, CHART_COLORS.purple];

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: chartData,
          backgroundColor: colors,
          borderColor: 'transparent',
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: { legend: { display: false }, tooltip: CHART_TOOLTIP },
      },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [JSON.stringify(chartData)]);

  return (
    <div style={{ position: 'relative', height }}>
      <canvas ref={ref} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 22, fontWeight: 600 }}>
          {formatNumber(total)}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Total SKUs</div>
      </div>
    </div>
  );
}