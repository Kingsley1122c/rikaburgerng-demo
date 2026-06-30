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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollToTop();

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
