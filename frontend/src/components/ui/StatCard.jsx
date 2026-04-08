import React from 'react';

export default function StatCard({ label, value, change, changeUp, color = 'amber', icon }) {
  return (
    <div className={`stat-card ${color}`}>
      {icon && (
        <div className="stat-card-icon" style={{
          background: `var(--${color}-glow)`,
        }}>
          <div style={{ width: 20, height: 20, color: `var(--${color})` }}>{icon}</div>
        </div>
      )}
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className="stat-change">
          <span className={changeUp ? 'stat-up' : 'stat-down'}>{changeUp ? '↑' : '↓'}</span>
          <span className="stat-neutral">{change}</span>
        </div>
      )}
    </div>
  );
}