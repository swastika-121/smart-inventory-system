import React from 'react';

export default function EmptyState({
  icon = '📦',
  title = 'Nothing here yet',
  description = '',
  action = null,
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '64px 24px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--ff-head)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
        {title}
      </div>
      {description && (
        <div style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 360, lineHeight: 1.6 }}>
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: 24 }}>{action}</div>}
    </div>
  );
}
