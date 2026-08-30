import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { jobService } from '@/services/jobs/jobService';
import { JobDetail } from '@/components/jobs/JobDetail';
import { Spinner } from '@/components/ui/Spinner';
import { Skeleton } from '@/components/ui/Skeleton';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import { ErrorState } from '@/components/common/ErrorState';
import { DashboardFooter } from '@/components/common/DashboardFooter';
import type { Job } from '@/types/job.types';

export function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (jobId) {
      setLoading(true);
      setError(null);
      jobService
        .getJob(jobId)
        .then((j) => setJob(j))
        .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load job'))
        .finally(() => setLoading(false));
    }
  }, [jobId]);

  if (loading) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !job) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Jobs" to="/jobs" />
          <ErrorState
            title="Job not found"
            message={error || 'The job you are looking for may have been removed.'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary-200/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <BackButton label="Back to Jobs" to="/jobs" />

          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <JobDetail job={job} />
          </motion.div>
        </div>

        <DashboardFooter />
      </div>
    </PageTransition>
  );
}
