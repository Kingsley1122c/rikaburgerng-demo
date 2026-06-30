import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import './AuthPages.css';

const LoginPage = () => {
  const { login, isAuthLoading, authError, setAuthError } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (event) => {
    event.preventDefault();
    setAuthError('');
    setLocalError('');

    if (!form.email.includes('@')) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    try {
      await login(form);
      const fallback = ROUTES.ACCOUNT;
      navigate(location.state?.from || fallback, { replace: true });
    } catch {
      // Auth error is handled in context
    }
  };

  return (
    <section className="auth-page">
      <article className="auth-card" aria-label="Login form">
        <h1>Welcome Back</h1>
        <p>Sign in to manage orders, rewards, wishlist, and account settings.</p>
        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {localError ? <div className="auth-error">{localError}</div> : null}
          {authError ? <div className="auth-error">{authError}</div> : null}

          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email address"
            autoComplete="email"
            aria-label="Email"
            required
          />
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="Password"
              autoComplete="current-password"
              aria-label="Password"
              required
            />
            <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="auth-meta">
            <span>Use any email and password with 6+ chars.</span>
            <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
          </div>

          <Button type="submit" className="auth-submit" disabled={isAuthLoading}>
            {isAuthLoading ? 'Signing In...' : 'Login'}
          </Button>
        </form>

        <p className="auth-link">
          New to RikaburgerNG? <Link to={ROUTES.REGISTER}>Create an account</Link>
        </p>
      </article>
    </section>
  );
};

export default LoginPage;
