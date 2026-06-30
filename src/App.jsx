import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './admin/components/AdminLayout';
import { ROUTES } from './constants/routes';
import { appRoutes } from './routes/routeConfig';
import { adminRoutes } from './routes/adminRouteConfig';
import Loader from './components/common/Loader';
import AdminRoute from './components/common/AdminRoute';
import { AdminLoginPage } from './routes/lazyPages';
import { useScrollToTop } from './hooks/useScrollToTop';

const pageTitles = [
  ['/', 'Home'],
  ['/menu', 'Menu'],
  ['/gallery', 'Gallery'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/cart', 'Cart'],
  ['/checkout', 'Checkout'],
  ['/order-tracking', 'Order Tracking'],
  ['/wishlist', 'Wishlist'],
  ['/account', 'My Account'],
  ['/notifications', 'Notifications'],
  ['/settings', 'Settings'],
  ['/login', 'Customer Login'],
  ['/register', 'Create Account'],
  ['/forgot-password', 'Forgot Password'],
  ['/reset-password', 'Reset Password'],
  ['/unauthorized', 'Unauthorized'],
  ['/faq', 'FAQ'],
  ['/privacy-policy', 'Privacy Policy'],
  ['/terms-of-service', 'Terms of Service'],
  ['/admin/login', 'Admin Login'],
  ['/admin/dashboard', 'Admin Dashboard'],
  ['/admin/orders', 'Admin Orders'],
  ['/admin/menu', 'Admin Menu'],
  ['/admin/categories', 'Admin Categories'],
  ['/admin/customers', 'Admin Customers'],
  ['/admin/reviews', 'Admin Reviews'],
  ['/admin/inventory', 'Admin Inventory'],
  ['/admin/coupons', 'Admin Coupons'],
  ['/admin/analytics', 'Admin Analytics'],
  ['/admin/messages', 'Admin Messages'],
  ['/admin/staff', 'Admin Staff'],
  ['/admin/settings', 'Admin Settings'],
];

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();

  React.useEffect(() => {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const match = pageTitles.find(([route]) => route === path);
    document.title = match ? `RikaburgerNG | ${match[1]}` : 'RikaburgerNG';
  }, [location.pathname]);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');

    if (redirect && redirect.startsWith('/')) {
      navigate(redirect, { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <React.Suspense fallback={<Loader label="Loading page" />}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLoginPage />} />
            <Route
              path={ROUTES.ADMIN_BASE}
              element={(
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              )}
            >
              {adminRoutes.map((route) => {
                if (route.index) {
                  return (
                    <Route
                      key="admin-index"
                      index
                      element={<AdminRoute requiredPermission={route.permission}>{route.element}</AdminRoute>}
                    />
                  );
                }

                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<AdminRoute requiredPermission={route.permission}>{route.element}</AdminRoute>}
                  />
                );
              })}
            </Route>

            <Route path={ROUTES.HOME} element={<MainLayout />}>
              {appRoutes.map((route) => {
                if (route.index) {
                  return <Route key="home-index" index element={route.element} />;
                }

                return <Route key={route.path} path={route.path} element={route.element} />;
              })}
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>
    </React.Suspense>
  );
}

export default App;
