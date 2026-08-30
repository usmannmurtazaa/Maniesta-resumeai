import { motion, useReducedMotion } from 'framer-motion';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';

export function AuthLayout() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      {/* Animated decorative blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, -15, 0], x: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-yellow-200/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/40 bg-white/70 p-8 shadow-glass backdrop-blur-xl"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <Outlet />
      </motion.div>

      {/* Minimal footer */}
      <div className="absolute bottom-4 z-10 text-center text-sm text-gray-400">
        <p>
          <Link to="/" className="hover:text-primary-600 transition-colors">
            Maniesta ResumeAI
          </Link>{' '}
          – Build ATS-optimized resumes with AI.
        </p>
      </div>
    </div>
  );
}
