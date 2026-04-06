import React, { useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import StatCard           from '../components/ui/StatCard';
import StockMovementChart from '../components/charts/StockMovementChart';
import StockStatusChart   from '../components/charts/StockStatusChart';
import TopProductsChart   from '../components/charts/TopProductsChart';
import RevenueTrendChart  from '../components/charts/RevenueTrendChart';
import { StatusBadge }    from '../components/ui/Badge';
import { CardSkeleton }   from '../components/common/Loader';
import Icons              from '../components/common/Icons';
import { formatRelativeTime, formatCurrencyShort } from '../utils/formatters';
import '../styles/components/charts.css';

/* ── Fallback stats (replaced by API data when connected) ── */
const FALLBACK_STATS = [
  { label: 'Total Products', value: '2,847', change: '+12 this week', changeUp: true,  color: 'amber',  iconKey: 'box'      },
  { label: 'In Stock Value', value: '$284K',  change: '+8.2% vs last mo.', changeUp: true,  color: 'teal',   iconKey: 'dollar'   },
  { label: 'Active Alerts',  value: '6',      change: '2 critical',        changeUp: false, color: 'red',    iconKey: 'bell'     },
  { label: 'Warehouses',     value: '3',      change: 'Alpha · Beta · Gamma', changeUp: true, color: 'purple', iconKey: 'warehouse' },
];

const RECENT_ACTIVITY = [
  { sku: 'SKU-001', name: 'Wireless Headphones Pro', action: 'Stock In',  qty: '+50', color: 'teal',  user: 'alex.c',  warehouse: 'WH-Alpha', time: '2 min ago'  },
  { sku: 'SKU-007', name: 'Mechanical Keyboard',     action: 'Stock Out', qty: '−18', color: 'red',   user: 'priya.s', warehouse: 'WH-Gamma', time: '14 min ago' },
  { sku: 'SKU-005', name: 'Standing Desk Frame',     action: 'Transfer',  qty: '+12', color: 'amber', user: 'alex.c',  warehouse: 'WH-Beta',  time: '1 hr ago'   },
  { sku: 'SKU-009', name: 'Smart LED Desk Lamp',     action: 'Stock In',  qty: '+30', color: 'teal',  user: 'jake.m',  warehouse: 'WH-Alpha', time: '2 hr ago'   },
  { sku: 'SKU-002', name: 'Ergonomic Office Chair',  action: 'Low Stock', qty: '⚠ 12', color: 'amber', user: 'System', warehouse: 'WH-Beta',  time: '3 hr ago'   },
];

export default function Dashboard() {
  const { stats, fetchStats, loading } = useInventory();

  useEffect(() => { fetchStats(); }, []);

  const displayStats = stats ? [
    { label: 'Total Products', value: stats.total_products?.toLocaleString() || '—', change: stats.products_change, changeUp: true, color: 'amber', iconKey: 'box' },
    { label: 'In Stock Value', value: formatCurrencyShort(stats.total_value || 0), change: stats.value_change, changeUp: true, color: 'teal', iconKey: 'dollar' },
    { label: 'Active Alerts',  value: String(stats.active_alerts || 0), change: `${stats.critical_alerts || 0} critical`, changeUp: false, color: 'red', iconKey: 'bell' },
    { label: 'Warehouses',     value: String(stats.warehouse_count || 3), change: 'Alpha · Beta · Gamma', changeUp: true, color: 'purple', iconKey: 'warehouse' },
  ] : FALLBACK_STATS;

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="page-title">Dashboard Overview</div>
        <div className="page-desc">Monitor your inventory health across all warehouses in real-time.</div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {displayStats.map((s) =>
          loading ? <CardSkeleton key={s.label} height={130} /> : (
            <StatCard key={s.label} {...s} icon={Icons[s.iconKey]} />
          )
        )}
      </div>

      {/* ── Chart Row 1 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, marginBottom: 20 }}>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Stock Movement</div>
              <div className="chart-sub">Units in vs out — last 14 days</div>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--teal)' }} />  In</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--amber)' }} /> Out</div>
            </div>
          </div>
          <StockMovementChart />
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Stock Status</div>
              <div className="chart-sub">Distribution across SKUs</div>
            </div>
          </div>
          <StockStatusChart />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 14 }}>
            {[['In Stock', '#00D4AA', '68%'], ['Low Stock', '#F5A623', '22%'], ['Out of Stock', '#FF4D6D', '10%'], ['Overstock', '#8B7CF8', '8%']].map(([l, c, v]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                {l} <span style={{ color: c, fontFamily: 'var(--ff-mono)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chart Row 2 ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }}>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Top Products by Stock</div>
              <div className="chart-sub">Current on-hand units</div>
            </div>
          </div>
          <TopProductsChart />
        </div>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Revenue Trend</div>
              <div className="chart-sub">Monthly revenue — 2024</div>
            </div>
            <div className="chart-value-big" style={{ color: 'var(--purple)' }}>$102K</div>
          </div>
          <RevenueTrendChart />
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--ff-head)', fontSize: 16, fontWeight: 700, padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
          Recent Activity
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>SKU</th><th>Product</th><th>Action</th><th>Qty</th>
                <th>User</th><th>Warehouse</th><th>Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ACTIVITY.map((row) => (
                <tr key={row.sku + row.time}>
                  <td><span className="sku">{row.sku}</span></td>
                  <td style={{ fontWeight: 500 }}>{row.name}</td>
                  <td><StatusBadge status={row.action} /></td>
                  <td>
                    <span className="stock-num" style={{ color: row.qty.startsWith('+') ? 'var(--teal)' : 'var(--amber)' }}>
                      {row.qty}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text2)' }}>{row.user}</td>
                  <td><span className="warehouse-badge">{row.warehouse}</span></td>
                  <td style={{ color: 'var(--text3)', fontFamily: 'var(--ff-mono)', fontSize: 12 }}>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
