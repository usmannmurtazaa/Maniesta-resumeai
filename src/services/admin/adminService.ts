import { auth } from '@/services/firebase/config';
import type { AdminUser, AdminResume, AdminATS, AdminAnalytics, AdminSearchResult } from '@/types/admin.types';
import type { Job } from '@/types/job.types';

const BASE_URL = '/.netlify/functions';

async function getToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return user.getIdToken();
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `Error ${response.status}`);
  }
  return response.json();
}

export const adminService = {
  getUsers: (filters?: { search?: string; status?: string; admin?: boolean; limit?: number; startAfter?: string }) =>
    request<{ users: AdminUser[]; lastVisible: string | null }>(`/admin-get-users?${new URLSearchParams(filters as any).toString()}`),

  getUser: (userId: string) =>
    request<{ user: AdminUser }>(`/admin-get-user?userId=${userId}`),

  getUserResumes: (userId: string) =>
    request<{ resumes: AdminResume[] }>(`/admin-get-resumes?userId=${userId}`),

  getATSAnalyses: (filters?: { userId?: string; limit?: number; startAfter?: string }) =>
    request<{ analyses: AdminATS[]; lastVisible: string | null }>(`/admin-get-ats?${new URLSearchParams(filters as any).toString()}`),

  getAnalytics: () =>
    request<AdminAnalytics>(`/admin-get-analytics`),

  search: (query: string) =>
    request<AdminSearchResult[]>(`/admin-search?query=${encodeURIComponent(query)}`),

  updateUserStatus: (userId: string, disabled: boolean) =>
    request<{ success: boolean }>(`/admin-update-user`, { method: 'PUT', body: JSON.stringify({ userId, disabled }) }),

  createJob: (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) =>
    request<{ id: string }>(`/admin-create-job`, { method: 'POST', body: JSON.stringify(jobData) }),

  updateJob: (jobId: string, jobData: Partial<Job>) =>
    request<{ success: boolean }>(`/admin-update-job`, { method: 'PUT', body: JSON.stringify({ jobId, ...jobData }) }),

  deleteJob: (jobId: string) =>
    request<{ success: boolean }>(`/admin-delete-job`, { method: 'DELETE', body: JSON.stringify({ jobId }) }),

  getJobs: () => request<Job[]>('/admin-get-jobs'),
};