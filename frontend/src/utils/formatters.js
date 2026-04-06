import { MONTHS } from './constants';

/* ── Currency ── */
export const formatCurrency = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(value);

export const formatCurrencyShort = (value) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
};

/* ── Numbers ── */
export const formatNumber = (value) =>
  new Intl.NumberFormat('en-US').format(value);

export const formatPercent = (value, decimals = 1) =>
  `${Number(value).toFixed(decimals)}%`;

/* ── Dates ── */
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  const date = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
};

export const formatRelativeTime = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)   return 'Just now';
  if (mins  < 60)  return `${mins} min ago`;
  if (hours < 24)  return `${hours} hr ago`;
  if (days  === 1) return 'Yesterday';
  return `${days} days ago`;
};

export const formatDateShort = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
};

/* ── Stock ── */
export const stockColor = (stock, min) => {
  if (stock === 0)        return 'var(--red)';
  if (stock < min)        return 'var(--amber)';
  if (stock > min * 5)    return 'var(--purple)';
  return 'var(--teal)';
};

export const stockStatusFromLevels = (stock, min) => {
  if (stock === 0)     return 'Out of Stock';
  if (stock < min)     return 'Low Stock';
  if (stock > min * 5) return 'Overstock';
  return 'In Stock';
};

/* ── Strings ── */
export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const truncate = (str, max = 40) =>
  str && str.length > max ? str.slice(0, max) + '…' : str;

/* ── SKU generation ── */
export const generateSKU = (name, category) => {
  const prefix = (name || '').replace(/\s+/g, '').slice(0, 3).toUpperCase();
  const rand   = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${rand}`;
};
