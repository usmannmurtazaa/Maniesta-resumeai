import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import type { JobPreferences } from '@/types/job.types';

const USERS_COLLECTION = 'users';

export const userService = {
  async getUserData(userId: string) {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  },

  async updateJobPreferences(userId: string, preferences: JobPreferences): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(docRef, { jobPreferences: preferences });
  },

  async updateLastSeenJobsAt(userId: string, timestamp: Date): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(docRef, { lastSeenJobsAt: timestamp });
  },

  async getLastSeenJobsAt(userId: string): Promise<Date | null> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    const timestamp = data.lastSeenJobsAt;
    if (!timestamp) return null;
    // Handle both Firestore Timestamp and plain Date/string
    return timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  },

  async addSavedJob(userId: string, jobId: string): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    const existing: string[] = snap.data()?.savedJobs || [];
    if (!existing.includes(jobId)) {
      await updateDoc(docRef, { savedJobs: [...existing, jobId] });
    }
  },

  async removeSavedJob(userId: string, jobId: string): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    const existing: string[] = snap.data()?.savedJobs || [];
    await updateDoc(docRef, { savedJobs: existing.filter((id) => id !== jobId) });
  },

  async getSavedJobIds(userId: string): Promise<string[]> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    return snap.data()?.savedJobs || [];
  },
};