import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobs/jobService';
import { JobCard } from '@/components/jobs/JobCard';
import { Spinner } from '@/components/ui/Spinner';
import { BookmarkIcon } from '@/components/ui/icons';
import { PageTransition } from '@/components/common/PageTransition';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import type { Job } from '@/types/job.types';

export function SavedJobsPage() {
  const user = useAuthStore((s) => s.user);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      jobService
        .getSavedJobs(user.uid)
        .then((savedJobs) => setJobs(savedJobs))
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
      <div className="p-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <ErrorState title="Error loading saved jobs" message={error} onRetry={() => window.location.reload()} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        {jobs.length === 0 ? (
          <EmptyState
            title="No saved jobs"
            description="You have not saved any jobs yet."
            icon={<BookmarkIcon size={48} className="text-gray-300" />}
          />
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} isSaved={true} onUnsave={handleUnsave} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}