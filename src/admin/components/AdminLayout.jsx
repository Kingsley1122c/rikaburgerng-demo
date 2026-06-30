import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import '../../admin/styles/admin.css';

const links = [
  { label: 'Dashboard', to: ROUTES.ADMIN_DASHBOARD },
  { label: 'Orders', to: ROUTES.ADMIN_ORDERS },
  { label: 'Menu', to: ROUTES.ADMIN_MENU },
  { label: 'Categories', to: ROUTES.ADMIN_CATEGORIES },
  { label: 'Customers', to: ROUTES.ADMIN_CUSTOMERS },
  { label: 'Reviews', to: ROUTES.ADMIN_REVIEWS },
  { label: 'Inventory', to: ROUTES.ADMIN_INVENTORY },
  { label: 'Coupons', to: ROUTES.ADMIN_COUPONS },
  { label: 'Analytics', to: ROUTES.ADMIN_ANALYTICS },
  { label: 'Messages', to: ROUTES.ADMIN_MESSAGES },
  { label: 'Staff', to: ROUTES.ADMIN_STAFF },
  { label: 'Settings', to: ROUTES.ADMIN_SETTINGS },
];

const formatBreadcrumb = (pathname) => {
  const chunks = pathname.split('/').filter(Boolean);
  if (!chunks.length) return 'Dashboard';
  return chunks.map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1)).join(' / ');
};

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" aria-label="Admin navigation sidebar">
        <h1 className="admin-brand">RikaburgerNG Admin</h1>
        <p className="admin-chip">{user?.fullName || 'Admin'}</p>
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
              end={link.to === ROUTES.ADMIN_DASHBOARD}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <strong>Admin Platform</strong>
            <p className="admin-breadcrumb" aria-live="polite">{formatBreadcrumb(location.pathname)}</p>
          </div>
          <div className="admin-actions">
            <button type="button" className="admin-btn secondary" aria-label="View admin notifications">Notifications</button>
            <button type="button" className="admin-btn secondary" aria-label="Sign out from admin" onClick={logout}>Sign out</button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
