import React, { useState } from 'react';
import { useAuth }      from './hooks/useAuth';
import AppLayout        from './components/layout/AppLayout';
import AuthWrapper      from './pages/auth/AuthWrapper';
import Dashboard        from './pages/Dashboard';
import Inventory        from './pages/Inventory';
import Alerts           from './pages/Alerts';
import Analytics        from './pages/Analytics';
import Warehouses       from './pages/Warehouses';
import Reports          from './pages/Reports';
import Users            from './pages/Users';
import AuditLog         from './pages/AuditLog';
import { PageLoader }   from './components/common/Loader';
import Icons            from './components/common/Icons';

const PAGE_MAP = {
  dashboard:  { component: Dashboard,  title: 'Dashboard'       },
  inventory:  { component: Inventory,  title: 'Inventory'       },
  alerts:     { component: Alerts,     title: 'Alerts'          },
  analytics:  { component: Analytics,  title: 'Analytics'       },
  warehouses: { component: Warehouses, title: 'Warehouses'      },
  reports:    { component: Reports,    title: 'Reports'         },
  users:      { component: Users,      title: 'User Management' },
  auditlog:   { component: AuditLog,   title: 'Audit Log'       },
};

export default function App() {
  const { user, loading } = useAuth();
  const [page, setPage]   = useState('dashboard');

  if (loading) return <PageLoader />;
  if (!user)   return <AuthWrapper />;

  const { component: PageComponent, title } = PAGE_MAP[page] || PAGE_MAP.dashboard;

  const topbarActions = [
    {
      label: 'Export',
      icon: Icons.download,
      onClick: () => setPage('reports'),
    },
    {
      label: '+ Add Product',
      icon: Icons.plus,
      primary: true,
      onClick: () => setPage('inventory'),
    },
  ];

  return (
    <AppLayout
      page={page}
      setPage={setPage}
      topbarTitle={title}
      topbarActions={topbarActions}
    >
      <PageComponent />
    </AppLayout>
  );
}
