import React from 'react';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from '../components/common/ProtectedRoute';
import GuestRoute from '../components/common/GuestRoute';
import {
  HomePage,
  MenuPage,
  GalleryPage,
  AboutPage,
  ContactPage,
  CartPage,
  CheckoutPage,
  OrderTrackingPage,
  WishlistPage,
  AccountPage,
  NotificationsPage,
  SettingsPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  UnauthorizedPage,
  FaqPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  NotFoundPage,
} from './lazyPages';

export const appRoutes = [
  { index: true, element: <HomePage /> },
  { path: ROUTES.MENU.slice(1), element: <MenuPage /> },
  { path: ROUTES.GALLERY.slice(1), element: <GalleryPage /> },
  { path: ROUTES.ABOUT.slice(1), element: <AboutPage /> },
  { path: ROUTES.CONTACT.slice(1), element: <ContactPage /> },
  { path: ROUTES.CART.slice(1), element: <CartPage /> },
  {
    path: ROUTES.CHECKOUT.slice(1),
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ORDER_TRACKING.slice(1),
    element: (
      <ProtectedRoute>
        <OrderTrackingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.WISHLIST.slice(1),
    element: (
      <ProtectedRoute>
        <WishlistPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.ACCOUNT.slice(1),
    element: (
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.NOTIFICATIONS.slice(1),
    element: (
      <ProtectedRoute>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.SETTINGS.slice(1),
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.LOGIN.slice(1),
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.REGISTER.slice(1),
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD.slice(1),
    element: (
      <GuestRoute>
        <ForgotPasswordPage />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.RESET_PASSWORD.slice(1),
    element: (
      <GuestRoute>
        <ResetPasswordPage />
      </GuestRoute>
    ),
  },
  { path: ROUTES.UNAUTHORIZED.slice(1), element: <UnauthorizedPage /> },
  { path: ROUTES.FAQ.slice(1), element: <FaqPage /> },
  { path: ROUTES.PRIVACY_POLICY.slice(1), element: <PrivacyPolicyPage /> },
  { path: ROUTES.TERMS_OF_SERVICE.slice(1), element: <TermsOfServicePage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
];
