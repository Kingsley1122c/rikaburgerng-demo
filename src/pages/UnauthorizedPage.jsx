import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import Button from '../components/ui/Button';
import '../admin/styles/admin.css';

const UnauthorizedPage = () => {
  return (
    <section className="admin-unauthorized">
      <article className="admin-login-card" aria-label="Unauthorized access message">
        <h1>Unauthorized Access</h1>
        <p style={{ color: 'var(--admin-muted)', marginBottom: 12 }}>
          You do not have permission to access this page.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button as={Link} to={ROUTES.HOME}>Back to Website</Button>
          <Button as={Link} to={ROUTES.ADMIN_LOGIN} variant="ghost">Admin Login</Button>
        </div>
      </article>
    </section>
  );
};

export default UnauthorizedPage;
