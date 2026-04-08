const API_URL = import.meta.env.VITE_API_URL || 'StockSense';

/* ── Status ── */
export const STOCK_STATUS = {
  IN_STOCK:    'In Stock',
  LOW_STOCK:   'Low Stock',
  OUT_OF_STOCK:'Out of Stock',
  OVERSTOCK:   'Overstock',
};

export const STATUS_COLOR = {
  'In Stock':    'teal',
  'Low Stock':   'amber',
  'Out of Stock':'red',
  'Overstock':   'purple',
};

export const ALERT_LEVEL = {
  CRITICAL: 'critical',
  WARNING:  'warning',
  INFO:     'info',
};

/* ── Roles ── */
export const ROLES = {
  ADMIN:  'admin',
  STAFF:  'staff',
  VIEWER: 'viewer',
};

export const ROLE_PERMISSIONS = {
  admin:  ['create','read','update','delete','export','manage_users'],
  staff:  ['create','read','update','export'],
  viewer: ['read'],
};

/* ── Categories ── */
export const CATEGORIES = [
  'Electronics','Furniture','Appliances','Clothing',
  'Food & Beverage','Hardware','Stationery','Other',
];

/* ── Warehouses ── */
export const WAREHOUSES = ['WH-Alpha','WH-Beta','WH-Gamma'];

/* ── Chart Palette ── */
export const CHART_COLORS = {
  teal:   '#00D4AA',
  amber:  '#F5A623',
  red:    '#FF4D6D',
  purple: '#8B7CF8',
  blue:   '#4DA6FF',
  tealA:  'rgba(0,212,170,0.12)',
  amberA: 'rgba(245,166,35,0.10)',
  redA:   'rgba(255,77,109,0.12)',
  purpleA:'rgba(139,124,248,0.12)',
};

export const CHART_FONT = "'JetBrains Mono', monospace";

export const CHART_TOOLTIP = {
  backgroundColor: '#111E33',
  titleColor:      '#EEF2FF',
  bodyColor:       '#7A90B8',
  borderColor:     'rgba(255,255,255,0.1)',
  borderWidth:     1,
  padding:         12,
};

/* ── Months ── */
export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/* ── Pagination ── */
export const PAGE_SIZE = 10;

/* ── API Endpoints (relative to base URL) ── */
export const ENDPOINTS = {
  LOGIN:      '/auth/login/',
  LOGOUT:     '/auth/logout/',
  REGISTER:   '/auth/register/',
  ME:         '/auth/me/',
  REFRESH:    '/auth/token/refresh/',

  PRODUCTS:   '/inventory/products/',
  PRODUCT:    (id) => `/inventory/products/${id}/`,

  ALERTS:     '/alerts/',
  ALERT:      (id) => `/alerts/${id}/`,
  RESOLVE:    (id) => `/alerts/${id}/resolve/`,

  WAREHOUSES: '/warehouses/',
  WAREHOUSE:  (id) => `/warehouses/${id}/`,

  USERS:      '/users/',
  USER:       (id) => `/users/${id}/`,

  AUDIT_LOGS: '/audit-logs/',

  REPORTS:    '/reports/',
  REPORT_STOCK_MOVEMENT: '/reports/stock-movement/',
  REPORT_VALUATION:      '/reports/valuation/',
  REPORT_ALERTS:         '/reports/alerts/',

  DASHBOARD_STATS:  '/dashboard/stats/',
  DASHBOARD_CHARTS: '/dashboard/charts/',
};