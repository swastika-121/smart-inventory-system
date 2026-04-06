import React from 'react';

export function Spinner({ size = 24, color = 'var(--amber)' }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <path d="M12 2a10 10 0 0 1 0 20" />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '60vh', flexDirection: 'column', gap: 16,
    }}>
      <Spinner size={36} />
      <div style={{ fontSize: 13, color: 'var(--text3)', fontFamily: 'var(--ff-mono)' }}>
        Loading…
      </div>
    </div>
  );
}

export function TableLoader({ rows = 5, cols = 6 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} style={{ padding: '13px 20px' }}>
              <div style={{
                height: 14,
                borderRadius: 6,
                background: 'var(--card2)',
                width: c === 0 ? '80px' : c === 1 ? '60%' : '40%',
                animation: 'pulse 1.5s ease-in-out infinite',
              }} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function CardSkeleton({ height = 120 }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', height,
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  );
}

export default PageLoader;
