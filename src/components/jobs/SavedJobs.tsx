import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobs/jobService';
import { JobCard } from './JobCard';
import { BackButton } from '@/components/common/BackButton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { BookmarkIcon } from '@/components/ui/icons';
import type { Job } from '@/types/job.types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export function SavedJobs() {
  const user = useAuthStore((s) => s.user);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (user) {
      setLoading(true);
      setError(null);
      jobService
        .getSavedJobs(user.uid)
        .then(setJobs)
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load saved jobs'))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleUnsave = async (jobId: string) => {
    if (!user) return;
    await jobService.unsaveJob(user.uid, jobId);
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="mb-6 h-10 w-32 rounded-lg" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BackButton label="Back to Jobs" to="/jobs" />
        <ErrorState
          title="Error loading saved jobs"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BackButton label="Back to Jobs" to="/jobs" />

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-4"
        >
          <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
          <p className="mt-1 text-sm text-gray-500">Your bookmarked opportunities.</p>
        </motion.div>

        {jobs.length === 0 ? (
          <EmptyState
            title="No saved jobs"
            description="You have not saved any jobs yet."
            icon={<BookmarkIcon size={48} className="text-gray-300" />}
          />
        ) : (
          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="show"
            className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <JobCard job={job} isSaved={true} onUnsave={handleUnsave} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
