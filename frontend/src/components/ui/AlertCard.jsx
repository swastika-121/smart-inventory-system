import React from 'react';
import Button from './Button';
import { Badge } from './Badge';
import Icons from '../common/Icons';
import { formatRelativeTime } from '../../utils/formatters';

const LEVEL_STYLE = {
  critical: { borderColor: 'var(--red)',    iconBg: 'var(--red-glow)',    icon: Icons.info,  badgeColor: 'red' },
  warning:  { borderColor: 'var(--amber)',  iconBg: 'var(--amber-glow)', icon: Icons.alert, badgeColor: 'amber' },
  info:     { borderColor: 'var(--purple)', iconBg: 'var(--purple-glow)', icon: Icons.box,  badgeColor: 'purple' },
};

export default function AlertCard({ alert, onResolve, resolving = false }) {
  const level = alert.level || 'warning';
  const style = LEVEL_STYLE[level] || LEVEL_STYLE.warning;

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderLeft: `3px solid ${style.borderColor}`,
      borderRadius: 'var(--radius)', padding: '20px 24px',
      display: 'flex', alignItems: 'flex-start', gap: 16,
      transition: 'transform 0.2s',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      {/* Icon */}
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        background: style.iconBg, display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        color: style.borderColor,
      }}>
        <div style={{ width: 20, height: 20 }}>{style.icon}</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--ff-head)', fontSize: 15, fontWeight: 700 }}>{alert.title}</div>
          <Badge label={level} color={style.badgeColor} />
          {alert.resolved && <Badge label="Resolved" color="teal" />}
        </div>
        <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{alert.product}</div>
        <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{alert.message || alert.msg}</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 12, color: 'var(--text3)' }}>{alert.sku}</span>
          <span style={{
            display: 'inline-flex', padding: '3px 8px', background: 'var(--bg2)',
            borderRadius: 6, fontFamily: 'var(--ff-mono)', fontSize: 11, color: 'var(--text2)',
          }}>{alert.warehouse}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'var(--ff-mono)', whiteSpace: 'nowrap' }}>
          {alert.created_at ? formatRelativeTime(alert.created_at) : alert.time}
        </div>
        {!alert.resolved && onResolve && (
          <Button size="sm" variant="ghost" onClick={() => onResolve(alert.id)} loading={resolving}>
            Resolve
          </Button>
        )}
      </div>
    </div>
  );
}
