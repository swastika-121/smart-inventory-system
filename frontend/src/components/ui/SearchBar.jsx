import React from 'react';
import Icons from '../common/Icons';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search…',
  filters = [],          // [{ key, label }]
  activeFilter,
  onFilterChange,
  actions = [],          // [{ label, icon, onClick, primary }]
}) {
  return (
    <div style={{
      padding: '14px 20px',
      display: 'flex', alignItems: 'center', gap: 10,
      borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
    }}>
      {/* Search input */}
      <div style={{ position: 'relative', flex: 1, minWidth: 180, maxWidth: 340 }}>
        <div style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          width: 14, height: 14, color: 'var(--text3)', pointerEvents: 'none',
        }}>
          {Icons.search}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 12px 8px 36px', color: 'var(--text1)',
            fontSize: 13, outline: 'none', transition: 'border-color 0.2s',
            fontFamily: 'var(--ff-body)',
          }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--amber)'; }}
          onBlur={(e)  => { e.target.style.borderColor = 'var(--border)'; }}
        />
      </div>

      {/* Filter pills */}
      {filters.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              style={{
                padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: `1px solid ${activeFilter === key ? 'var(--amber)' : 'var(--border)'}`,
                background: activeFilter === key ? 'var(--amber-glow)' : 'var(--bg2)',
                color: activeFilter === key ? 'var(--amber)' : 'var(--text2)',
                cursor: 'pointer', transition: 'all 0.18s', fontFamily: 'var(--ff-body)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {actions.length > 0 && (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: action.primary ? 700 : 500,
                border: `1px solid ${action.primary ? 'var(--amber)' : 'var(--border)'}`,
                background: action.primary ? 'var(--amber)' : 'var(--card)',
                color: action.primary ? '#000' : 'var(--text1)',
                cursor: 'pointer', transition: 'all 0.18s',
                display: 'flex', alignItems: 'center', gap: 7,
                fontFamily: 'var(--ff-body)', whiteSpace: 'nowrap',
              }}
            >
              {action.icon && <div style={{ width: 13, height: 13 }}>{action.icon}</div>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}