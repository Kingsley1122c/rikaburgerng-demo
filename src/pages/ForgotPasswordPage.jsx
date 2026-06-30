import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const { forgotPassword, isAuthLoading, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [localError, setLocalError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setLocalError('');
    setAuthError('');
    setSuccessMessage('');

    if (!email.includes('@')) {
      setLocalError('Please provide a valid email address.');
      return;
    }

    try {
      const response = await forgotPassword({ email });
      setSuccessMessage(response.message);
    } catch {
      // Auth error handled by context
    }
  };

  return (
    <section className="auth-page">
      <article className="auth-card" aria-label="Forgot password form">
        <h1>Forgot Password</h1>
        <p>Enter your email and we will simulate sending a reset link.</p>
        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {localError ? <div className="auth-error">{localError}</div> : null}
          {authError ? <div className="auth-error">{authError}</div> : null}
          {successMessage ? <div className="auth-success">{successMessage}</div> : null}

          <input
            type="email"
            aria-label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            autoComplete="email"
            required
          />

          <Button type="submit" className="auth-submit" disabled={isAuthLoading}>
            {isAuthLoading ? 'Submitting...' : 'Send Reset Link'}
          </Button>
        </form>

        <p className="auth-link">
          Back to <Link to={ROUTES.LOGIN}>Login</Link>
        </p>
      </article>
    </section>
  );
};

export default ForgotPasswordPage;
