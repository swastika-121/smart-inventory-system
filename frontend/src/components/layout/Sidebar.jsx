import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Icons from '../common/Icons';
import '../../styles/components/sidebar.css';

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',       icon: Icons.home,      section: 'main' },
  { id: 'inventory',  label: 'Inventory',        icon: Icons.box,       section: 'main' },
  { id: 'alerts',     label: 'Alerts',           icon: Icons.bell,      section: 'main', badge: true },
  { id: 'analytics',  label: 'Analytics',        icon: Icons.chart,     section: 'main' },
  { id: 'warehouses', label: 'Warehouses',        icon: Icons.warehouse, section: 'manage' },
  { id: 'reports',    label: 'Reports',           icon: Icons.file,      section: 'manage' },
  { id: 'users',      label: 'Users',             icon: Icons.users,     section: 'manage', adminOnly: true },
  { id: 'auditlog',   label: 'Audit Log',         icon: Icons.log,       section: 'manage', adminOnly: true },
];

export default function Sidebar({ page, setPage, alertCount = 0 }) {
  const { user, logout, isAdmin } = useAuth();

  const mainItems   = NAV.filter((n) => n.section === 'main'   && (!n.adminOnly || isAdmin));
  const manageItems = NAV.filter((n) => n.section === 'manage' && (!n.adminOnly || isAdmin));

  return (
    <div className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand">
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
          </div>
          <div className="brand-name">Stock<span>Sense</span></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main</div>
        {mainItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item${page === item.id ? ' active' : ''}`}
            onClick={() => setPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.badge && alertCount > 0 && (
              <span className="nav-badge">{alertCount}</span>
            )}
          </div>
        ))}

        {manageItems.length > 0 && (
          <>
            <div className="nav-section-label">Management</div>
            {manageItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item${page === item.id ? ' active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user">
            <div className="avatar">
              {(user.first_name || user.name || user.email || 'A').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="user-name">
                {user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email}
              </div>
              <div className="user-role">{user.role} account</div>
            </div>
          </div>
        )}
        <button className="logout-btn" onClick={logout}>
          <div style={{ width: 16, height: 16 }}>{Icons.logout}</div>
          Log Out
        </button>
      </div>
    </div>
  );
}
