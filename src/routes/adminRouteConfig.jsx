import React from 'react';
import {
  AdminDashboardPage,
  AdminOrdersPage,
  AdminMenuPage,
  AdminCategoriesPage,
  AdminCustomersPage,
  AdminReviewsPage,
  AdminInventoryPage,
  AdminCouponsPage,
  AdminAnalyticsPage,
  AdminMessagesPage,
  AdminStaffPage,
  AdminSettingsPage,
} from './lazyPages';

export const adminRoutes = [
  { index: true, element: <AdminDashboardPage />, permission: 'dashboard:view' },
  { path: 'dashboard', element: <AdminDashboardPage />, permission: 'dashboard:view' },
  { path: 'orders', element: <AdminOrdersPage />, permission: 'orders:manage' },
  { path: 'menu', element: <AdminMenuPage />, permission: 'menu:manage' },
  { path: 'categories', element: <AdminCategoriesPage />, permission: 'categories:manage' },
  { path: 'customers', element: <AdminCustomersPage />, permission: 'customers:view' },
  { path: 'reviews', element: <AdminReviewsPage />, permission: 'reviews:manage' },
  { path: 'inventory', element: <AdminInventoryPage />, permission: 'inventory:manage' },
  { path: 'coupons', element: <AdminCouponsPage />, permission: 'coupons:manage' },
  { path: 'analytics', element: <AdminAnalyticsPage />, permission: 'analytics:view' },
  { path: 'messages', element: <AdminMessagesPage />, permission: 'messages:manage' },
  { path: 'staff', element: <AdminStaffPage />, permission: 'staff:manage' },
  { path: 'settings', element: <AdminSettingsPage />, permission: 'settings:manage' },
];
