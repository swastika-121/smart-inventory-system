import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Topbar({ title, actions = [] }) {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-right">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            style={{
              padding: '8px 16px',
              background: action.primary ? 'var(--amber)' : 'var(--card)',
              border: `1px solid ${action.primary ? 'var(--amber)' : 'var(--border)'}`,
              borderRadius: 8,
              color: action.primary ? '#000' : 'var(--text1)',
              fontFamily: 'var(--ff-body)',
              fontSize: 13,
              fontWeight: action.primary ? 700 : 500,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all 0.18s',
            }}
          >
            {action.icon && <div style={{ width: 14, height: 14 }}>{action.icon}</div>}
            {action.label}
          </button>
        ))}
        {user && (
          <div
            className="avatar"
            style={{ cursor: 'default', marginLeft: 4 }}
            title={user.email}
          >
            {(user.first_name || user.name || user.email || 'A').charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}
