import React from 'react';
import ThroughputChart from '../components/charts/ThroughputChart';
import WarehouseChart  from '../components/charts/WarehouseChart';
import RevenueTrendChart from '../components/charts/RevenueTrendChart';
import StockMovementChart from '../components/charts/StockMovementChart';
import '../styles/components/charts.css';

const KPI_CARDS = [
  { label: 'Best Seller',    name: 'Wireless Headphones', val: '145 units sold',  color: 'var(--amber)'  },
  { label: 'Fastest Mover', name: 'USB-C Hub',            val: '320→280 in 3d',  color: 'var(--teal)'   },
  { label: 'Needs Reorder', name: 'Air Purifier HEPA',    val: '8 units left',   color: 'var(--red)'    },
  { label: 'Top Value SKU', name: 'Standing Desk',        val: '$16,626 on hand', color: 'var(--purple)' },
];

export default function Analytics() {
  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="page-title">Analytics</div>
        <div className="page-desc">Deep insights into inventory performance, turnover, and trends.</div>
      </div>

      {/* KPI spotlight row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {KPI_CARDS.map(({ label, name, val, color }) => (
          <div key={label} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '18px 20px',
            borderTop: `3px solid ${color}`,
          }}>
            <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700, marginBottom: 8 }}>{label}</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{name}</div>
            <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 13, color }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Monthly Throughput</div>
              <div className="chart-sub">Units processed per month</div>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--teal)' }} /> H1</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--amber)' }} /> H2</div>
            </div>
          </div>
          <ThroughputChart />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Warehouse Utilization</div>
              <div className="chart-sub">Units dispatched — this week</div>
            </div>
            <div className="chart-legend">
              {[['var(--teal)', 'Alpha'], ['var(--amber)', 'Beta'], ['var(--purple)', 'Gamma']].map(([c, l]) => (
                <div className="legend-item" key={l}><div className="legend-dot" style={{ background: c }} /> {l}</div>
              ))}
            </div>
          </div>
          <WarehouseChart />
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Stock Movement — 14 Day</div>
              <div className="chart-sub">Units flowing in and out</div>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--teal)' }} /> In</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--amber)' }} /> Out</div>
            </div>
          </div>
          <StockMovementChart height={180} />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Annual Revenue</div>
              <div className="chart-sub">Monthly revenue — 2024</div>
            </div>
          </div>
          <RevenueTrendChart height={180} />
        </div>
      </div>
    </div>
  );
}
