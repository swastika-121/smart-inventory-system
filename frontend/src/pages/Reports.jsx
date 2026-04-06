import React, { useState } from 'react';
import { reportService } from '../services/reportService';
import Button  from '../components/ui/Button';
import Icons   from '../components/common/Icons';

const REPORTS = [
  { key: 'inventory',        icon: '📦', name: 'Full Inventory Export',     desc: 'Complete product catalog with stock levels, prices, and warehouse locations.' },
  { key: 'stock_movement',   icon: '📊', name: 'Stock Movement Report',     desc: 'Units in/out over the last 30/60/90 days with warehouse breakdown.' },
  { key: 'alerts',           icon: '🔔', name: 'Alert History',             desc: 'All triggered alerts with resolution status, timestamps, and responsible users.' },
  { key: 'valuation',        icon: '💰', name: 'Inventory Valuation',        desc: 'Total on-hand value by SKU, category, and warehouse with cost breakdown.' },
  { key: 'warehouse',        icon: '🏭', name: 'Warehouse Utilization',      desc: 'Capacity usage, throughput, and efficiency metrics per warehouse location.' },
  { key: 'audit',            icon: '📋', name: 'Audit Log Export',           desc: 'Complete change history — every edit, transfer, and deletion with user attribution.' },
];

const SERVICE_MAP = {
  inventory:      reportService.exportInventoryCSV,
  stock_movement: reportService.exportStockMovement,
  alerts:         reportService.exportAlerts,
  valuation:      reportService.exportValuation,
  warehouse:      reportService.exportWarehouseReport,
  audit:          reportService.exportAuditLog,
};

export default function Reports() {
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (key) => {
    setDownloading(key);
    try {
      await SERVICE_MAP[key]?.();
    } catch (e) {
      console.warn('Report download (API not connected yet):', e.message);
      // Simulate download for demo
      const blob = new Blob([`${key} report — data will appear when Django backend is connected`], { type: 'text/csv' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = `${key}_report.csv`;
      a.click(); URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <div className="page-title">Reports</div>
        <div className="page-desc">Generate and export business-ready reports from your inventory data.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
        {REPORTS.map((r) => (
          <div
            key={r.key}
            style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '28px 24px',
              transition: 'all 0.2s', cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--amber)';
              e.currentTarget.style.transform   = 'translateY(-3px)';
              e.currentTarget.style.boxShadow   = '0 8px 32px rgba(245,166,35,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform   = 'none';
              e.currentTarget.style.boxShadow   = 'none';
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 16 }}>{r.icon}</div>
            <div style={{ fontFamily: 'var(--ff-head)', fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{r.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 20 }}>{r.desc}</div>
            <Button
              variant="outline" size="sm"
              icon={<div style={{ width: 13, height: 13 }}>{Icons.download}</div>}
              loading={downloading === r.key}
              onClick={() => handleDownload(r.key)}
            >
              Download CSV
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
