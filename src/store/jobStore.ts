import { create } from 'zustand';
import type { Job, JobFilters } from '@/types/job.types';

interface JobState {
  jobs: Job[];
  featuredJobs: Job[];
  selectedJob: Job | null;
  filters: JobFilters;
  loading: boolean;
  lastVisible: any;
  setJobs: (jobs: Job[], lastVisible?: any) => void;
  appendJobs: (jobs: Job[], lastVisible?: any) => void;
  setFeaturedJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setFilters: (filters: JobFilters) => void;
  setLoading: (loading: boolean) => void;
  clearJobs: () => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  featuredJobs: [],
  selectedJob: null,
  filters: {},
  loading: false,
  lastVisible: null,
  setJobs: (jobs, lastVisible = null) => set({ jobs, lastVisible, loading: false }),
  appendJobs: (newJobs, lastVisible = null) =>
    set((state) => ({
      jobs: [...state.jobs, ...newJobs],
      lastVisible,
      loading: false,
    })),
  setFeaturedJobs: (featuredJobs) => set({ featuredJobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  setFilters: (filters) => set({ filters, jobs: [], lastVisible: null }), // reset on filter change
  setLoading: (loading) => set({ loading }),
  clearJobs: () => set({ jobs: [], lastVisible: null }),
}));