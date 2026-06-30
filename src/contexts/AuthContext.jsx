import React, { createContext, useEffect, useState } from 'react';
import {
  adminLoginRequest,
  changePasswordRequest,
  forgotPasswordRequest,
  loginWithPassword,
  registerAccount,
  resetPasswordRequest,
  updateProfileRequest,
} from '../services/authService';

const STORAGE_KEY = 'rikaburgerng-auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (credentials) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      const nextUser = await loginWithPassword(credentials);
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const register = async (payload) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      const nextUser = await registerAccount(payload);
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const adminLogin = async (credentials) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      const nextUser = await adminLoginRequest(credentials);
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const forgotPassword = async (payload) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      return await forgotPasswordRequest(payload);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const resetPassword = async (payload) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      return await resetPasswordRequest(payload);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const updateProfile = async (payload) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      const nextUser = await updateProfileRequest({ ...user, ...payload });
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const changePassword = async (payload) => {
    setIsAuthLoading(true);
    setAuthError('');
    try {
      return await changePasswordRequest(payload);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAuthLoading,
    authError,
    setAuthError,
    login,
    adminLogin,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
