import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import type { Job, JobFilters } from '@/types/job.types';

const JOBS_COLLECTION = 'jobs';

export const jobService = {
  async getPublishedJobs(
    filters: JobFilters = {},
    pageSize = 20
  ): Promise<{ jobs: Job[]; lastVisible: null }> {
    const q = query(
      collection(db, JOBS_COLLECTION),
      where('status', '==', 'published'),
      limit(50)
    );

    const snapshot = await getDocs(q);
    let jobs = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      publishedAt: docSnap.data().publishedAt?.toDate?.() || null,
      scheduledAt: docSnap.data().scheduledAt?.toDate?.() || null,
      deadline: docSnap.data().deadline?.toDate?.() || null,
      createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
      updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(),
    } as Job));

    jobs.sort((a, b) => (b.publishedAt?.getTime?.() || 0) - (a.publishedAt?.getTime?.() || 0));

    if (filters.search) {
      const s = filters.search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(s) ||
          j.companyName.toLowerCase().includes(s) ||
          j.tags.some((tag) => tag.toLowerCase().includes(s))
      );
    }
    if (filters.category) jobs = jobs.filter((j) => j.category === filters.category);
    if (filters.location) jobs = jobs.filter((j) => j.location.toLowerCase().includes(filters.location!.toLowerCase()));
    if (filters.workMode) jobs = jobs.filter((j) => j.workMode === filters.workMode);
    if (filters.employmentType) jobs = jobs.filter((j) => j.employmentType === filters.employmentType);
    if (filters.experienceLevel) jobs = jobs.filter((j) => j.experienceLevel === filters.experienceLevel);
    if (filters.featured !== undefined) jobs = jobs.filter((j) => j.featured === filters.featured);

    return { jobs: jobs.slice(0, pageSize), lastVisible: null };
  },

  async getFeaturedJobs(limitCount = 5): Promise<Job[]> {
    const q = query(collection(db, JOBS_COLLECTION), where('status', '==', 'published'), limit(50));
    const snapshot = await getDocs(q);
    const jobs = snapshot.docs
      .map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        publishedAt: docSnap.data().publishedAt?.toDate?.() || null,
      } as Job))
      .filter((job) => job.featured)
      .sort((a, b) => (b.publishedAt?.getTime?.() || 0) - (a.publishedAt?.getTime?.() || 0));
    return jobs.slice(0, limitCount);
  },

  async getJob(jobId: string): Promise<Job | null> {
    const docRef = doc(db, JOBS_COLLECTION, jobId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      ...data,
      id: snap.id,
      publishedAt: data.publishedAt?.toDate?.() || null,
      scheduledAt: data.scheduledAt?.toDate?.() || null,
      deadline: data.deadline?.toDate?.() || null,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      updatedAt: data.updatedAt?.toDate?.() || new Date(),
    } as Job;
  },

  async saveJob(userId: string, jobId: string) {
    const { userService } = await import('@/services/user/userService');
    await userService.addSavedJob(userId, jobId);
  },

  async unsaveJob(userId: string, jobId: string) {
    const { userService } = await import('@/services/user/userService');
    await userService.removeSavedJob(userId, jobId);
  },

  async getSavedJobs(userId: string): Promise<Job[]> {
    const { userService } = await import('@/services/user/userService');
    const savedIds = await userService.getSavedJobIds(userId);
    if (savedIds.length === 0) return [];

    const jobs: Job[] = [];
    const chunkSize = 10;
    for (let i = 0; i < savedIds.length; i += chunkSize) {
      const chunk = savedIds.slice(i, i + chunkSize);
      const q = query(collection(db, JOBS_COLLECTION), where('__name__', 'in', chunk));
      const snapshot = await getDocs(q);
      snapshot.docs.forEach((docSnap) => {
        jobs.push({
          id: docSnap.id,
          ...docSnap.data(),
          publishedAt: docSnap.data().publishedAt?.toDate?.() || null,
          scheduledAt: docSnap.data().scheduledAt?.toDate?.() || null,
          deadline: docSnap.data().deadline?.toDate?.() || null,
          createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date(),
        } as Job);
      });
    }
    return jobs;
  },
};