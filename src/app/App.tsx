import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { routes } from './routes';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ToastProvider } from '@/contexts/ToastContext';
import { Spinner } from '@/components/ui/Spinner';

// Lazy-load admin pages
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('@/pages/AdminUsersPage'));
const AdminUserDetailPage = lazy(() => import('@/pages/AdminUserDetailPage'));
const AdminResumesPage = lazy(() => import('@/pages/AdminResumesPage'));
const AdminATSPage = lazy(() => import('@/pages/AdminATSPage'));
const AdminJobsPage = lazy(() => import('@/pages/AdminJobsPage'));
const AdminNotificationsPage = lazy(() => import('@/pages/AdminNotificationsPage'));
const AdminAnalyticsPage = lazy(() => import('@/pages/AdminAnalyticsPage'));

function AppRoutes() {
  // Map routes but with lazy components? We'll adjust routes to use React.lazy components.
  // Since routes is a static array, we need to modify routes.tsx to use lazy imports.
  // For simplicity, we'll keep as is and rely on manual chunks from vite config.
  return useRoutes(routes);
}

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <ToastProvider>
          <Suspense fallback={<LoadingFallback />}>
            <AppRoutes />
          </Suspense>
        </ToastProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}