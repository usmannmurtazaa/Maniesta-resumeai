import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import type { AdminUser, AdminResume, AdminATS, AdminAnalytics, AdminSearchResult } from '@/types/admin.types';
import type { Job } from '@/types/job.types';

// Helper to convert Firestore Timestamp to Date
function toDate(value: any): Date | null {
  if (!value) return null;
  return value.toDate ? value.toDate() : new Date(value);
}

export const adminService = {
  async getUsers(filters?: { search?: string; status?: string; admin?: boolean; limit?: number }) {
    let q = query(collection(db, 'users'));
    if (filters?.limit) q = query(q, limit(filters.limit));
    const snapshot = await getDocs(q);
    let users = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        email: data.email,
        displayName: data.displayName || null,
        photoURL: data.photoURL || null,
        createdAt: toDate(data.createdAt),
        lastLoginAt: toDate(data.lastLoginAt),
        disabled: data.disabled || false,
        admin: data.admin || false,
      } as AdminUser;
    });

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      users = users.filter(
        (u) =>
          u.email?.toLowerCase().includes(s) ||
          (u.displayName || '').toLowerCase().includes(s)
      );
    }
    if (filters?.status === 'active') users = users.filter((u) => !u.disabled);
    if (filters?.status === 'disabled') users = users.filter((u) => u.disabled);
    if (filters?.admin === true) users = users.filter((u) => u.admin);
    if (filters?.admin === false) users = users.filter((u) => !u.admin);

    return { users, lastVisible: null };
  },

  async getUser(userId: string) {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('User not found');
    const data = snap.data();
    const user: AdminUser = {
      id: userId,
      email: data.email,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      createdAt: toDate(data.createdAt),
      lastLoginAt: toDate(data.lastLoginAt),
      disabled: data.disabled || false,
      admin: data.admin || false,
    };
    return { user };
  },

  async getUserResumes(userId: string) {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const resumes = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId,
        title: data.title,
        templateId: data.templateId,
        atsScore: data.atsScore ?? null,
        jobDescriptionAttached: !!data.jobDescription,
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      } as AdminResume;
    });
    return { resumes };
  },

  async getAllResumes() {
    const snapshot = await getDocs(collection(db, 'resumes'));
    const resumes = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId,
        title: data.title,
        templateId: data.templateId,
        atsScore: data.atsScore ?? null,
        jobDescriptionAttached: !!data.jobDescription,
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      } as AdminResume;
    });
    return { resumes };
  },

  async getATSAnalyses(filters?: { userId?: string; limit?: number }) {
    let q = query(collection(db, 'atsAnalyses'));
    if (filters?.userId) q = query(q, where('userId', '==', filters.userId));
    if (filters?.limit) q = query(q, limit(filters.limit));
    const snapshot = await getDocs(q);
    const analyses = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId,
        resumeId: data.resumeId,
        jobId: data.jobId || null,
        score: data.score,
        jobMatchScore: data.jobMatchScore ?? null,
        matchedKeywords: data.matchedKeywords || [],
        missingKeywords: data.missingKeywords || [],
        recommendations: data.recommendations || [],
        warnings: data.warnings || [],
        createdAt: toDate(data.createdAt),
      } as AdminATS;
    });
    return { analyses, lastVisible: null };
  },

  async getAnalytics(): Promise<AdminAnalytics> {
    const [usersSnapshot, resumesSnapshot, atsSnapshot, jobsSnapshot] = await Promise.all([
      getDocs(collection(db, 'users')),
      getDocs(collection(db, 'resumes')),
      getDocs(collection(db, 'atsAnalyses')),
      getDocs(collection(db, 'jobs')),
    ]);

    const users = usersSnapshot.docs;
    const resumes = resumesSnapshot.docs;
    const ats = atsSnapshot.docs;
    const jobs = jobsSnapshot.docs;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const countSince = (docs: any[], date: Date) =>
      docs.filter((d) => (toDate(d.data().createdAt) || new Date(0)) >= date).length;

    const averageScore =
      ats.length > 0
        ? Math.round(ats.reduce((acc, d) => acc + (d.data().score || 0), 0) / ats.length)
        : 0;

    return {
      users: {
        total: users.length,
        newToday: countSince(users, startOfDay),
        newThisWeek: countSince(users, startOfWeek),
        newThisMonth: countSince(users, startOfMonth),
        activeUsers: users.filter((d) => !d.data().disabled).length,
      },
      resumes: {
        total: resumes.length,
        createdToday: countSince(resumes, startOfDay),
        createdThisWeek: countSince(resumes, startOfWeek),
        createdThisMonth: countSince(resumes, startOfMonth),
      },
      ats: {
        totalAnalyses: ats.length,
        averageScore,
        analysesToday: countSince(ats, startOfDay),
        analysesThisWeek: countSince(ats, startOfWeek),
        analysesThisMonth: countSince(ats, startOfMonth),
        jobMatches: ats.filter((d) => d.data().jobId).length,
      },
      jobs: {
        total: jobs.length,
        published: jobs.filter((d) => d.data().status === 'published').length,
        scheduled: jobs.filter((d) => d.data().status === 'scheduled').length,
        featured: jobs.filter((d) => d.data().featured).length,
        savedByUsers: 0,
      },
    };
  },

  async getJobs(): Promise<Job[]> {
    const snapshot = await getDocs(collection(db, 'jobs'));
    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        publishedAt: toDate(data.publishedAt),
        scheduledAt: toDate(data.scheduledAt),
        deadline: toDate(data.deadline),
        createdAt: toDate(data.createdAt),
        updatedAt: toDate(data.updatedAt),
      } as Job;
    });
  },

  async search(queryText: string): Promise<AdminSearchResult[]> {
    const results: AdminSearchResult[] = [];
    const q = queryText.toLowerCase();

    const usersSnap = await getDocs(collection(db, 'users'));
    usersSnap.forEach((docSnap) => {
      const data = docSnap.data();
      const name = (data.displayName || '').toLowerCase();
      const email = (data.email || '').toLowerCase();
      if (name.includes(q) || email.includes(q)) {
        results.push({ type: 'user', id: docSnap.id, title: data.displayName || data.email, subtitle: data.email });
      }
    });

    const resumesSnap = await getDocs(collection(db, 'resumes'));
    resumesSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.title?.toLowerCase().includes(q)) {
        results.push({ type: 'resume', id: docSnap.id, title: data.title, subtitle: 'Resume' });
      }
    });

    const jobsSnap = await getDocs(collection(db, 'jobs'));
    jobsSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (
        data.title?.toLowerCase().includes(q) ||
        data.companyName?.toLowerCase().includes(q)
      ) {
        results.push({ type: 'job', id: docSnap.id, title: data.title, subtitle: data.companyName });
      }
    });

    return results;
  },

  // Write operations still require server-side admin checks.
  // For now, they call the existing Netlify functions.
  async createJob(jobData: any) {
    const response = await fetch('/.netlify/functions/admin-create-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async updateJob(jobId: string, jobData: any) {
    const response = await fetch('/.netlify/functions/admin-update-job', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, ...jobData }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async deleteJob(jobId: string) {
    const response = await fetch('/.netlify/functions/admin-delete-job', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId }),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};