import { useCallback, useEffect, useState } from 'react';
import { useJobStore } from '@/store/jobStore';
import { jobService } from '@/services/jobs/jobService';
import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCardSkeleton } from '@/components/jobs/JobCardSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { PageTransition } from '@/components/common/PageTransition';

export function JobsPage() {
  const {
    jobs,
    featuredJobs,
    filters,
    setJobs,
    appendJobs,
    setFeaturedJobs,
    loading,
    setLoading,
    lastVisible,
    setFilters,
  } = useJobStore();
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(
    async (reset: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const cursor = reset ? null : useJobStore.getState().lastVisible;
        const result = await jobService.getPublishedJobs(filters, 20, cursor);
        if (reset) {
          setJobs(result.jobs, result.lastVisible);
        } else {
          appendJobs(result.jobs, result.lastVisible);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    },
    [filters, setJobs, appendJobs, setLoading]
  );

  useEffect(() => {
    const fetchFeatured = async () => {
      const featured = await jobService.getFeaturedJobs(5);
      setFeaturedJobs(featured);
    };
    fetchFeatured();
  }, [setFeaturedJobs]);

  useEffect(() => {
    fetchJobs(true);
  }, [fetchJobs]);

  if (error) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <ErrorState title="Error loading jobs" message={error} onRetry={() => fetchJobs(true)} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Daily Jobs</h1>
        <p className="mt-2 text-lg text-gray-500">Find your next opportunity</p>

        {featuredJobs.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Featured Jobs</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <JobFilters onFilterChange={setFilters} />
        </div>

        {loading && jobs.length === 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : !loading && jobs.length === 0 ? (
          <EmptyState title="No jobs found" description="Try adjusting your filters." />
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {lastVisible && !loading && (
          <div className="mt-6 text-center">
            <button
              onClick={() => fetchJobs(false)}
              className="text-primary-600 hover:text-primary-800"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}