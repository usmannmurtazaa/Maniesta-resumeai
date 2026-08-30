import { useEffect, useCallback } from 'react';
import { useJobStore } from '@/store/jobStore';
import { jobService } from '@/services/jobs/jobService';

export function useJobs() {
  const { jobs, featuredJobs, filters, setJobs, setFeaturedJobs, loading, setLoading, setFilters } =
    useJobStore();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const result = await jobService.getPublishedJobs(filters, 20);
      setJobs(result.jobs, null);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, setJobs, setLoading]);

  const fetchFeaturedJobs = useCallback(async () => {
    const featured = await jobService.getFeaturedJobs(5);
    setFeaturedJobs(featured);
  }, [setFeaturedJobs]);

  useEffect(() => {
    fetchFeaturedJobs();
  }, [fetchFeaturedJobs]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    featuredJobs,
    filters,
    loading,
    setFilters,
    refetchJobs: fetchJobs,
    refetchFeatured: fetchFeaturedJobs,
  };
}
