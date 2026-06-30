import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import './AuthPages.css';

const ResetPasswordPage = () => {
  const { resetPassword, isAuthLoading, authError, setAuthError } = useAuth();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    setAuthError('');
    setSuccessMessage('');

    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      const response = await resetPassword({
        token: searchParams.get('token') || 'demo-token',
        password: form.password,
      });
      setSuccessMessage(response.message);
    } catch {
      // Auth error handled by context
    }
  };

  return (
    <section className="auth-page">
      <article className="auth-card" aria-label="Reset password form">
        <h1>Reset Password</h1>
        <p>Set a new password for your account.</p>
        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {localError ? <div className="auth-error">{localError}</div> : null}
          {authError ? <div className="auth-error">{authError}</div> : null}
          {successMessage ? <div className="auth-success">{successMessage}</div> : null}

          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              aria-label="New password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="New password"
              autoComplete="new-password"
              required
            />
            <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            aria-label="Confirm new password"
            value={form.confirmPassword}
            onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            placeholder="Confirm new password"
            autoComplete="new-password"
            required
          />

          <Button type="submit" className="auth-submit" disabled={isAuthLoading}>
            {isAuthLoading ? 'Updating...' : 'Reset Password'}
          </Button>
        </form>

        <p className="auth-link">
          Return to <Link to={ROUTES.LOGIN}>Login</Link>
        </p>
      </article>
    </section>
  );
};

export default ResetPasswordPage;
