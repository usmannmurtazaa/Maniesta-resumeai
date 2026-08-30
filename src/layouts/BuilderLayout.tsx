import { Outlet, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';

export function BuilderLayout() {
  const { user, loading } = useAuthStore();
  const prefersReducedMotion = useReducedMotion();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated background decorative blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <main className="relative z-10 h-screen">
        <Outlet />
      </main>
    </div>
  );
}
