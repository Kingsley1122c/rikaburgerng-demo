import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import '../../admin/styles/admin.css';

const AdminLoginPage = () => {
  const { adminLogin, isAuthLoading, authError, setAuthError, isAuthenticated, user } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setAuthError('');
    try {
      await adminLogin(form);
      navigate(location.state?.from || ROUTES.ADMIN_DASHBOARD, { replace: true });
    } catch {
      // handled in context
    }
  };

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }

    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return (
    <section className="admin-login-page">
      <article className="admin-login-card" aria-label="Admin login form">
        <h1>Admin Login</h1>
        <p style={{ color: 'var(--admin-muted)', marginBottom: 12 }}>
          Secure access for restaurant managers and staff.
        </p>
        <p className="admin-chip" style={{ marginBottom: 12 }}>Demo credentials: admin@rikaburgerng.com / admin123</p>
        {authError ? <p className="auth-error">{authError}</p> : null}

        <form onSubmit={submit} className="auth-form" noValidate>
          <label htmlFor="admin-email" className="sr-only">Admin email</label>
          <input
            id="admin-email"
            className="admin-input"
            type="email"
            aria-label="Admin email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Admin email"
            required
          />
          <div className="password-row">
            <label htmlFor="admin-password" className="sr-only">Admin password</label>
            <input
              id="admin-password"
              className="admin-input"
              type={showPassword ? 'text' : 'password'}
              aria-label="Admin password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="Password"
              required
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className="admin-btn" disabled={isAuthLoading}>
            {isAuthLoading ? 'Signing In...' : 'Sign In to Admin'}
          </button>
        </form>
      </article>
    </section>
  );
};

export default AdminLoginPage;
