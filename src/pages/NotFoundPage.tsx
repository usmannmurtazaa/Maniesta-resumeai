import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/common/PageTransition';
import { ArrowLeftIcon, HomeIcon } from '@/components/ui/icons';

export default function NotFoundPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PageTransition>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
        {/* Decorative blurred orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/70 p-10 text-center shadow-glass backdrop-blur-xl"
        >
          <motion.div
            initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-7xl font-display font-extrabold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"
          >
            404
          </motion.div>

          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Page not found</h1>
          <p className="mt-2 text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto group">
                <ArrowLeftIcon
                  size={18}
                  className="mr-2 transition-transform group-hover:-translate-x-1"
                />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <HomeIcon size={18} className="mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
