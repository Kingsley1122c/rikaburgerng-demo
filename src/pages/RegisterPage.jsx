import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import './AuthPages.css';

const RegisterPage = () => {
  const { register, isAuthLoading, authError, setAuthError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    setAuthError('');

    if (form.fullName.trim().length < 3) {
      setLocalError('Please provide your full name.');
      return;
    }

    if (!form.email.includes('@')) {
      setLocalError('Please provide a valid email.');
      return;
    }

    if (form.password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await register(form);
      navigate(ROUTES.ACCOUNT, { replace: true });
    } catch {
      // Auth error handled in context
    }
  };

  return (
    <section className="auth-page">
      <article className="auth-card" aria-label="Register form">
        <h1>Create Account</h1>
        <p>Join RikaburgerNG for faster checkout, rewards, and order tracking.</p>
        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {localError ? <div className="auth-error">{localError}</div> : null}
          {authError ? <div className="auth-error">{authError}</div> : null}

          <input
            type="text"
            aria-label="Full name"
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
            placeholder="Full name"
            autoComplete="name"
            required
          />
          <input
            type="email"
            aria-label="Email address"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email address"
            autoComplete="email"
            required
          />
          <input
            type="tel"
            aria-label="Phone number"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="Phone number"
            autoComplete="tel"
          />
          <div className="password-row">
            <input
              type={showPassword ? 'text' : 'password'}
              aria-label="Password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="Password"
              autoComplete="new-password"
              required
            />
            <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            aria-label="Confirm password"
            value={form.confirmPassword}
            onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
            placeholder="Confirm password"
            autoComplete="new-password"
            required
          />

          <Button type="submit" className="auth-submit" disabled={isAuthLoading}>
            {isAuthLoading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </article>
    </section>
  );
};

export default RegisterPage;
