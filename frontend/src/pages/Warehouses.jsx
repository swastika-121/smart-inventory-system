import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Icons  from '../components/common/Icons';

const WAREHOUSES = [
  { id: 'WH-Alpha', location: 'Mumbai, MH', capacity: 5000, used: 3200, products: 12, manager: 'Rohan Mehta',  status: 'Active' },
  { id: 'WH-Beta',  location: 'Delhi, DL',  capacity: 3500, used: 1800, products: 8,  manager: 'Priya Sharma', status: 'Active' },
  { id: 'WH-Gamma', location: 'Pune, MH',   capacity: 2000, used: 1500, products: 6,  manager: 'Alex Carter',  status: 'Active' },
];

export default function Warehouses() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="page-title">Warehouses</div>
          <div className="page-desc">Manage inventory across multiple warehouse locations.</div>
        </div>
        <Button variant="primary" size="sm" icon={<div style={{ width: 13, height: 13 }}>{Icons.plus}</div>}>
          Add Warehouse
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 28 }}>
        {WAREHOUSES.map((wh) => {
          const pct = Math.round((wh.used / wh.capacity) * 100);
          const color = pct > 85 ? 'var(--red)' : pct > 60 ? 'var(--amber)' : 'var(--teal)';
          return (
            <div
              key={wh.id}
              onClick={() => setSelected(wh.id === selected ? null : wh.id)}
              style={{
                background: 'var(--card)', border: `1px solid ${wh.id === selected ? 'var(--amber)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', padding: '24px',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: wh.id === selected ? '0 0 0 2px var(--amber-glow)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ fontFamily: 'var(--ff-head)', fontSize: 18, fontWeight: 800 }}>{wh.id}</div>
                <span style={{
                  padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                  background: 'var(--teal-glow)', color: 'var(--teal)',
                }}>● Active</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>📍 {wh.location}</div>

              {/* Capacity bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>
                  <span>Capacity</span>
                  <span style={{ fontFamily: 'var(--ff-mono)', color }}>{pct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg2)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Products', wh.products],
                  ['Used Units', wh.used.toLocaleString()],
                  ['Total Cap.', wh.capacity.toLocaleString()],
                  ['Manager', wh.manager.split(' ')[0]],
                ].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 2 }}>{l}</div>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selected && (() => {
        const wh = WAREHOUSES.find((w) => w.id === selected);
        return (
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 24 }}>
            <div style={{ fontFamily: 'var(--ff-head)', fontSize: 18, fontWeight: 700, marginBottom: 20 }}>
              {wh.id} — Detailed View
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {[
                ['Location', wh.location],
                ['Manager', wh.manager],
                ['Total Capacity', `${wh.capacity.toLocaleString()} units`],
                ['Current Stock', `${wh.used.toLocaleString()} units`],
                ['Free Space', `${(wh.capacity - wh.used).toLocaleString()} units`],
                ['Product Lines', wh.products],
                ['Utilization', `${Math.round((wh.used / wh.capacity) * 100)}%`],
                ['Status', wh.status],
              ].map(([l, v]) => (
                <div key={l} style={{ padding: 16, background: 'var(--bg2)', borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 4 }}>{l}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
