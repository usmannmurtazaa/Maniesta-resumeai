import { Navigate } from 'react-router-dom';
import { AdminLayout } from '@/layouts/AdminLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { BuilderLayout } from '@/layouts/BuilderLayout';

// Public pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';

// User pages
import DashboardPage from '@/pages/DashboardPage';
import BuilderPage from '@/pages/BuilderPage';
import SettingsPage from '@/pages/SettingsPage';

// Jobs pages (user-facing)
import { JobsPage } from '@/pages/JobsPage';
import { JobDetailPage } from '@/pages/JobDetailPage';
import { SavedJobsPage } from '@/pages/SavedJobsPage';

// Admin pages
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import AdminUsersPage from '@/pages/AdminUsersPage';
import AdminUserDetailPage from '@/pages/AdminUserDetailPage';
import AdminResumesPage from '@/pages/AdminResumesPage';
import AdminATSPage from '@/pages/AdminATSPage';
import AdminJobsPage from '@/pages/AdminJobsPage';
import AdminNotificationsPage from '@/pages/AdminNotificationsPage';
import AdminAnalyticsPage from '@/pages/AdminAnalyticsPage';

export const routes = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '/builder/:resumeId',
    element: <BuilderLayout />,
  },
  {
    path: '/builder',
    element: <BuilderLayout />,
  },
  // Jobs user-facing routes
  {
    path: '/jobs',
    element: <JobsPage />,
  },
  {
    path: '/jobs/saved',
    element: <SavedJobsPage />,
  },
  {
    path: '/jobs/:jobId',
    element: <JobDetailPage />,
  },
  // Admin routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'users/:userId', element: <AdminUserDetailPage /> },
      { path: 'resumes', element: <AdminResumesPage /> },
      { path: 'ats', element: <AdminATSPage /> },
      { path: 'jobs', element: <AdminJobsPage /> },
      { path: 'notifications', element: <AdminNotificationsPage /> },
      { path: 'analytics', element: <AdminAnalyticsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];