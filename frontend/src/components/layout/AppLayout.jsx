import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ page, setPage, children, topbarTitle, topbarActions }) {
  return (
    <div className="app-layout">
      <Sidebar page={page} setPage={setPage} />
      <div className="main-area">
        <Topbar title={topbarTitle || pageTitles[page] || 'StockSense'} actions={topbarActions} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

const pageTitles = {
  dashboard:  'Dashboard',
  inventory:  'Inventory',
  alerts:     'Alerts',
  analytics:  'Analytics',
  warehouses: 'Warehouses',
  reports:    'Reports',
  users:      'User Management',
  auditlog:   'Audit Log',
};
