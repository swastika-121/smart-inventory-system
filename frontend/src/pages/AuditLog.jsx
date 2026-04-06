import React, { useState } from 'react';
import Button  from '../components/ui/Button';
import Icons   from '../components/common/Icons';

const LOGS = [
  { id:1,  user:'alex.c',  action:'CREATE', resource:'Product',  detail:'Added "Wireless Headphones Pro" (SKU-001)',   ip:'192.168.1.10', time:'2024-12-01 09:14:22' },
  { id:2,  user:'priya.s', action:'UPDATE', resource:'Product',  detail:'Updated stock: SKU-002 from 20 → 12 units',   ip:'192.168.1.12', time:'2024-12-01 10:32:05' },
  { id:3,  user:'System',  action:'ALERT',  resource:'Alert',    detail:'Low stock alert triggered for SKU-002',        ip:'127.0.0.1',    time:'2024-12-01 10:32:06' },
  { id:4,  user:'alex.c',  action:'DELETE', resource:'Product',  detail:'Deleted product "Broken SKU Test" (SKU-099)',   ip:'192.168.1.10', time:'2024-12-01 11:05:44' },
  { id:5,  user:'jake.m',  action:'EXPORT', resource:'Report',   detail:'Exported inventory CSV (2847 rows)',           ip:'192.168.1.15', time:'2024-12-01 13:20:18' },
  { id:6,  user:'priya.s', action:'UPDATE', resource:'Warehouse',detail:'Updated WH-Beta capacity from 3000 → 3500',   ip:'192.168.1.12', time:'2024-12-02 08:48:30' },
  { id:7,  user:'System',  action:'ALERT',  resource:'Alert',    detail:'Out of stock alert triggered for SKU-003',     ip:'127.0.0.1',    time:'2024-12-02 09:00:01' },
  { id:8,  user:'alex.c',  action:'RESOLVE',resource:'Alert',    detail:'Resolved out-of-stock alert #7 for SKU-003',   ip:'192.168.1.10', time:'2024-12-02 09:30:55' },
  { id:9,  user:'jake.m',  action:'CREATE', resource:'User',     detail:'Created new staff account "sam@acme.com"',     ip:'192.168.1.15', time:'2024-12-02 11:10:00' },
  { id:10, user:'alex.c',  action:'UPDATE', resource:'Product',  detail:'Bulk stock in: 5 products updated (+50 avg)',  ip:'192.168.1.10', time:'2024-12-03 14:05:22' },
];

const ACTION_STYLE = {
  CREATE:  { bg: 'var(--teal-glow)',   color: 'var(--teal)'   },
  UPDATE:  { bg: 'var(--amber-glow)',  color: 'var(--amber)'  },
  DELETE:  { bg: 'var(--red-glow)',    color: 'var(--red)'    },
  ALERT:   { bg: 'var(--red-glow)',    color: 'var(--red)'    },
  EXPORT:  { bg: 'var(--purple-glow)', color: 'var(--purple)' },
  RESOLVE: { bg: 'var(--teal-glow)',   color: 'var(--teal)'   },
};

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const actions = ['All', 'CREATE', 'UPDATE', 'DELETE', 'ALERT', 'EXPORT', 'RESOLVE'];

  const filtered = LOGS.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = l.user.toLowerCase().includes(q) || l.detail.toLowerCase().includes(q) || l.resource.toLowerCase().includes(q);
    const matchFilter = filter === 'All' || l.action === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="page-title">Audit Log</div>
          <div className="page-desc">Complete change history — every action logged with user and timestamp.</div>
        </div>
        <Button variant="secondary" size="sm" icon={<div style={{ width: 13, height: 13 }}>{Icons.download}</div>}>
          Export Log
        </Button>
      </div>

      <div className="table-card">
        <div className="table-toolbar">
          <div className="search-input-wrap">
            <div className="search-icon" style={{ width: 14, height: 14, color: 'var(--text3)' }}>{Icons.search}</div>
            <input
              className="search-input"
              placeholder="Search by user, action, or detail…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            {actions.map((a) => (
              <button key={a} className={`filter-btn${filter === a ? ' active' : ''}`} onClick={() => setFilter(a)}>{a}</button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th><th>Timestamp</th><th>User</th><th>Action</th>
                <th>Resource</th><th>Detail</th><th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => {
                const s = ACTION_STYLE[log.action] || ACTION_STYLE.UPDATE;
                return (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text3)' }}>#{log.id}</td>
                    <td style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{log.time}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 6, background: 'var(--amber-glow)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, fontWeight: 800, color: 'var(--amber)', fontFamily: 'var(--ff-head)',
                        }}>
                          {log.user.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12 }}>{log.user}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block', padding: '3px 9px', borderRadius: 6,
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
                        background: s.bg, color: s.color, fontFamily: 'var(--ff-mono)',
                      }}>{log.action}</span>
                    </td>
                    <td style={{ color: 'var(--text2)', fontSize: 13 }}>{log.resource}</td>
                    <td style={{ fontSize: 13, maxWidth: 320 }}>{log.detail}</td>
                    <td style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text3)' }}>{log.ip}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text3)' }}>
                  No log entries match your search.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>{filtered.length} of {LOGS.length} entries</span>
        </div>
      </div>
    </div>
  );
}
