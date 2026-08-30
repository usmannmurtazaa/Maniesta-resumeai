import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useJobStore } from '@/store/jobStore';
import { jobService } from '@/services/jobs/jobService';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageTransition } from '@/components/common/PageTransition';
import { DashboardFooter } from '@/components/common/DashboardFooter';
import { BackButton } from '@/components/common/BackButton';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

export function JobsPage() {
  const { jobs, featuredJobs, filters, setJobs, setFeaturedJobs, loading, setLoading, setFilters } =
    useJobStore();
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await jobService.getPublishedJobs(filters, 20);
      setJobs(result.jobs, null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [filters, setJobs, setLoading]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const featured = await jobService.getFeaturedJobs(5);
      setFeaturedJobs(featured);
    };
    fetchFeatured();
  }, [setFeaturedJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (error) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <BackButton label="Back to Dashboard" to="/dashboard" />
          <ErrorState title="Error loading jobs" message={error} onRetry={fetchJobs} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Decorative blurred orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Dashboard" to="/dashboard" />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Daily Jobs</h1>
            <p className="mt-2 text-lg text-gray-500">Find your next opportunity</p>
          </motion.div>

          {featuredJobs.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="show"
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-gray-900">Featured Jobs</h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredJobs.map((job) => (
                  <motion.div key={job.id} variants={itemVariants}>
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mt-10">
            <JobFilters onFilterChange={setFilters} />
          </div>

          {loading && jobs.length === 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          ) : !loading && jobs.length === 0 ? (
            <EmptyState title="No jobs found" description="Try adjusting your filters." />
          ) : (
            <motion.div
              variants={containerVariants}
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="show"
              className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {jobs.map((job) => (
                <motion.div key={job.id} variants={itemVariants}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </PageTransition>
  );
}
