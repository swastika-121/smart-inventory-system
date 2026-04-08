import React, { useState } from 'react';
import { useAlerts } from '../hooks/useAlerts';
import AlertCard from '../components/ui/AlertCard';
import Button from '../components/ui/Button';
import EmptyState from '../components/common/EmptyState';
import { CardSkeleton } from '../components/common/Loader';
import Icons from '../components/common/Icons';

/* Fallback mock alerts */
const MOCK_ALERTS = [
  { id: 1, level: 'critical', title: 'Out of Stock Alert', product: 'Industrial Water Filter', msg: 'Stock depleted. Last reorder was 42 days ago. Action required.', sku: 'SKU-003', warehouse: 'WH-Alpha', time: '18 min ago', resolved: false },
  { id: 2, level: 'critical', title: 'Out of Stock Alert', product: 'Laptop Cooling Pad', msg: 'Zero units available across all warehouses. Urgent reorder needed.', sku: 'SKU-008', warehouse: 'WH-Beta', time: 'Yesterday', resolved: false },
  { id: 3, level: 'warning', title: 'Low Stock Warning', product: 'Ergonomic Office Chair', msg: 'Only 12 units remaining — below minimum threshold of 20 units.', sku: 'SKU-002', warehouse: 'WH-Beta', time: '2 min ago', resolved: false },
  { id: 4, level: 'warning', title: 'Low Stock Warning', product: 'Air Purifier HEPA', msg: 'Only 8 units remaining — 47% below reorder point.', sku: 'SKU-006', warehouse: 'WH-Alpha', time: '1 hr ago', resolved: false },
  { id: 5, level: 'warning', title: 'Low Stock Warning', product: 'Storage Ottoman XL', msg: 'Only 5 units left in WH-Gamma. Transfer from WH-Alpha recommended.', sku: 'SKU-010', warehouse: 'WH-Gamma', time: '5 hr ago', resolved: false },
  { id: 6, level: 'info', title: 'Overstock Detection', product: 'USB-C Hub 10-Port', msg: '320 units on hand — 10× above minimum. Consider redistribution.', sku: 'SKU-004', warehouse: 'WH-Gamma', time: '3 hr ago', resolved: false },
];

const FILTER_TABS = [
  { key: 'all', label: 'All Alerts' },
  { key: 'critical', label: 'Critical' },
  { key: 'warning', label: 'Warnings' },
  { key: 'info', label: 'Overstock' },
  { key: 'resolved', label: 'Resolved' },
];

export default function Alerts() {
  const { alerts, loading, resolve } = useAlerts();
  const [localAlerts, setLocalAlerts] = useState(MOCK_ALERTS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [resolvingId, setResolvingId] = useState(null);

  const displayAlerts = alerts.length ? alerts : localAlerts;

  const filtered = displayAlerts.filter((a) => {
    if (activeFilter === 'all') return !a.resolved;
    if (activeFilter === 'resolved') return a.resolved;
    return a.level === activeFilter && !a.resolved;
  });

  const counts = {
    all: displayAlerts.filter((a) => !a.resolved).length,
    critical: displayAlerts.filter((a) => a.level === 'critical' && !a.resolved).length,
    warning: displayAlerts.filter((a) => a.level === 'warning' && !a.resolved).length,
    info: displayAlerts.filter((a) => a.level === 'info' && !a.resolved).length,
    resolved: displayAlerts.filter((a) => a.resolved).length,
  };

  const handleResolve = async (id) => {
    setResolvingId(id);
    try {
      if (alerts.length) {
        await resolve(id);
      } else {
        setLocalAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)));
      }
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="page-title">Smart Alerts</div>
        <div className="page-desc">Automated alerts for stock levels, expiry, and overstock conditions.</div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTER_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            style={{
              padding: '9px 18px',
              background: activeFilter === key ? 'var(--amber-glow)' : 'var(--card)',
              border: `1px solid ${activeFilter === key ? 'var(--amber)' : 'var(--border)'}`,
              borderRadius: 10,
              color: activeFilter === key ? 'var(--amber)' : 'var(--text2)',
              fontFamily: 'var(--ff-body)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.18s',
            }}
          >
            {label}
            {counts[key] > 0 && (
              <span style={{
                background: key === 'critical' ? 'var(--red)' : activeFilter === key ? 'var(--amber)' : 'var(--bg2)',
                color: key === 'critical' ? '#fff' : activeFilter === key ? '#000' : 'var(--text2)',
                fontFamily: 'var(--ff-mono)', fontSize: 11, fontWeight: 700,
                padding: '2px 8px', borderRadius: 99,
              }}>
                {counts[key]}
              </span>
            )}
          </button>
        ))}

        <Button
          variant="ghost" size="sm" icon={<div style={{ width: 13, height: 13 }}>{Icons.check}</div>}
          onClick={() => setLocalAlerts((prev) => prev.map((a) => ({ ...a, resolved: true })))}
          style={{ marginLeft: 'auto' }}
        >
          Resolve All
        </Button>
      </div>

      {/* Alert list */}
      {loading ? (
        <div style={{ display: 'grid', gap: 14 }}>
          {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} height={120} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <EmptyState
            icon={activeFilter === 'resolved' ? '✅' : '🔔'}
            title={activeFilter === 'resolved' ? 'No resolved alerts' : 'No active alerts'}
            description={activeFilter === 'resolved' ? 'Resolved alerts will appear here.' : 'Everything looks good! No alerts matching this filter.'}
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onResolve={handleResolve}
              resolving={resolvingId === alert.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
