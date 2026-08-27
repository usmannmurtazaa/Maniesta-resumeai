import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './config';
import type { Resume, Job, AppNotification } from '@/types';
import {
  DEFAULT_SECTION_ORDER,
  defaultDesignSettings,
  emptyResumeContent,
} from '@/utils/resumeDefaults';

export const resumeService = {
  async createResume(data: Partial<Resume>) {
    const docRef = doc(collection(db, 'resumes'));
    const resume: Resume = {
      id: docRef.id,
      userId: data.userId!,
      title: data.title || 'Untitled Resume',
      templateId: data.templateId || 'modern',
      content: data.content || emptyResumeContent(),
      sectionOrder: data.sectionOrder || DEFAULT_SECTION_ORDER,
      designSettings: data.designSettings || defaultDesignSettings(),
      atsScore: null,
      jobDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await setDoc(docRef, resume);
    return resume;
  },

  async updateResume(id: string, data: Partial<Resume>) {
    const docRef = doc(db, 'resumes', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
  },

  async getResume(id: string) {
    const docRef = doc(db, 'resumes', id);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as Resume) : null;
  },

  async getUserResumes(userId: string) {
    const q = query(collection(db, 'resumes'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const resumes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Resume));
    resumes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    return resumes;
  },

  async deleteResume(id: string) {
    const docRef = doc(db, 'resumes', id);
    await deleteDoc(docRef);
  },

  async duplicateResume(resumeId: string): Promise<Resume> {
    const original = await this.getResume(resumeId);
    if (!original) throw new Error('Resume not found');
    const newResume: Resume = {
      ...original,
      id: '',
      title: `${original.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.createResume(newResume);
  },
};

export const jobService = {
  async getJobs(filters?: { category?: string; workMode?: string; experienceLevel?: string; search?: string }) {
    const q = query(collection(db, 'jobs'), where('status', '==', 'published'), orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);
    let jobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Job));
    if (filters) {
      if (filters.category) jobs = jobs.filter((j) => j.category === filters.category);
      if (filters.workMode) jobs = jobs.filter((j) => j.workMode === filters.workMode);
      if (filters.experienceLevel) jobs = jobs.filter((j) => j.experienceLevel === filters.experienceLevel);
      if (filters.search) {
        const s = filters.search.toLowerCase();
        jobs = jobs.filter((j) => j.title.toLowerCase().includes(s) || j.companyName.toLowerCase().includes(s));
      }
    }
    return jobs;
  },
  async getJob(id: string) {
    const docRef = doc(db, 'jobs', id);
    const snap = await getDoc(docRef);
    return snap.exists() ? (snap.data() as Job) : null;
  },
};

export const notificationService = {
  async getUserNotifications(userId: string) {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as AppNotification));
  },
  async markRead(id: string, read: boolean = true) {
    const docRef = doc(db, 'notifications', id);
    await updateDoc(docRef, { read });
  },
  async markAllRead(userId: string) {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId), where('read', '==', false));
    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((d) => updateDoc(d.ref, { read: true })));
  },
  async deleteNotification(id: string) {
    const docRef = doc(db, 'notifications', id);
    await deleteDoc(docRef);
  },
};

export const userService = {
  async getUserData(userId: string) {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  },
  async updateJobPreferences(userId: string, prefs: any) {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { jobPreferences: prefs });
  },
  async updateLastSeenJobsAt(userId: string, timestamp: Date) {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { lastSeenJobsAt: timestamp });
  },
  async addSavedJob(userId: string, jobId: string) {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    const savedJobs = snap.data()?.savedJobs || [];
    if (!savedJobs.includes(jobId)) {
      await updateDoc(docRef, { savedJobs: [...savedJobs, jobId] });
    }
  },
  async removeSavedJob(userId: string, jobId: string) {
    const docRef = doc(db, 'users', userId);
    const snap = await getDoc(docRef);
    const savedJobs = snap.data()?.savedJobs || [];
    await updateDoc(docRef, { savedJobs: savedJobs.filter((id: string) => id !== jobId) });
  },
};