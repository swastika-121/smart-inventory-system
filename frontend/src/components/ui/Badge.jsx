import React from 'react';
import { STATUS_COLOR } from '../../utils/constants';

const COLOR_MAP = {
  teal:   { bg: 'var(--teal-glow)',   text: 'var(--teal)' },
  amber:  { bg: 'var(--amber-glow)',  text: 'var(--amber)' },
  red:    { bg: 'var(--red-glow)',    text: 'var(--red)' },
  purple: { bg: 'var(--purple-glow)', text: 'var(--purple)' },
  blue:   { bg: 'var(--blue-glow)',   text: 'var(--blue)' },
  green:  { bg: 'var(--teal-glow)',   text: 'var(--teal)' },
};

export function Badge({ label, color }) {
  const c = COLOR_MAP[color] || COLOR_MAP.teal;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 99,
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
      background: c.bg, color: c.text,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
      {label}
    </span>
  );
}

/** Auto-color badge from status string */
export function StatusBadge({ status }) {
  const color = STATUS_COLOR[status] || 'teal';
  return <Badge label={status} color={color} />;
}

export function RoleBadge({ role }) {
  const colorMap = { admin: 'amber', staff: 'blue', viewer: 'purple' };
  return <Badge label={role} color={colorMap[role] || 'blue'} />;
}

export default Badge;