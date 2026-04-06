import React from 'react';
import { Spinner } from '../common/Loader';

const VARIANTS = {
  primary: {
    background: 'var(--amber)', color: '#000',
    border: '1px solid var(--amber)', fontWeight: 700,
  },
  secondary: {
    background: 'var(--card)', color: 'var(--text1)',
    border: '1px solid var(--border)',
  },
  ghost: {
    background: 'transparent', color: 'var(--text2)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'var(--red-glow)', color: 'var(--red)',
    border: '1px solid var(--red-glow)',
  },
  outline: {
    background: 'transparent', color: 'var(--amber)',
    border: '1px solid var(--amber)',
  },
};

const SIZES = {
  sm: { padding: '6px 14px', fontSize: 12, borderRadius: 8 },
  md: { padding: '9px 18px', fontSize: 13, borderRadius: 10 },
  lg: { padding: '13px 24px', fontSize: 15, borderRadius: 10 },
  full: { padding: '13px 24px', fontSize: 15, borderRadius: 10, width: '100%' },
};

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  loading = false,
  disabled = false,
  icon = null,
  iconRight = null,
  onClick,
  type = 'button',
  style: extraStyle = {},
}) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, cursor: disabled || loading ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--ff-body)', fontWeight: 500,
    transition: 'all 0.18s', outline: 'none',
    opacity: disabled ? 0.5 : 1,
    ...VARIANTS[variant],
    ...SIZES[size],
    ...extraStyle,
  };

  return (
    <button type={type} style={base} onClick={onClick} disabled={disabled || loading}>
      {loading ? <Spinner size={14} color={variant === 'primary' ? '#000' : 'currentColor'} /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
