import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import type { JobPreferences } from '@/types/job.types';

const USERS_COLLECTION = 'users';

/**
 * Converts Firestore Timestamp to JavaScript Date.
 */
function toDate(value: any): Date | null {
  if (!value) return null;
  return value.toDate ? value.toDate() : new Date(value);
}

export const userService = {
  /**
   * Fetches the user's Firestore document data.
   * Returns `null` if the document does not exist.
   */
  async getUserData(userId: string) {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  },

  /**
   * Updates the user's job preferences.
   * Uses setDoc with merge:true so the document is created if it doesn't exist.
   */
  async updateJobPreferences(userId: string, preferences: JobPreferences): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(docRef, { jobPreferences: preferences }, { merge: true });
  },

  /**
   * Updates the timestamp of when the user last saw jobs.
   */
  async updateLastSeenJobsAt(userId: string, timestamp: Date): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(docRef, { lastSeenJobsAt: timestamp }, { merge: true });
  },

  /**
   * Retrieves the timestamp of when the user last saw jobs.
   * Returns `null` if not set or document missing.
   */
  async getLastSeenJobsAt(userId: string): Promise<Date | null> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    const data = snap.data();
    return toDate(data.lastSeenJobsAt);
  },

  /**
   * Adds a job ID to the user's saved jobs list.
   * Creates the document if missing.
   */
  async addSavedJob(userId: string, jobId: string): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    const existing: string[] = snap.exists() ? snap.data()?.savedJobs || [] : [];
    if (!existing.includes(jobId)) {
      await setDoc(docRef, { savedJobs: [...existing, jobId] }, { merge: true });
    }
  },

  /**
   * Removes a job ID from the user's saved jobs list.
   * Creates the document if missing (no-op).
   */
  async removeSavedJob(userId: string, jobId: string): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    const existing: string[] = snap.exists() ? snap.data()?.savedJobs || [] : [];
    await setDoc(docRef, { savedJobs: existing.filter((id) => id !== jobId) }, { merge: true });
  },

  /**
   * Retrieves all saved job IDs for the user.
   * Returns empty array if document missing.
   */
  async getSavedJobIds(userId: string): Promise<string[]> {
    const docRef = doc(db, USERS_COLLECTION, userId);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data()?.savedJobs || [] : [];
  },
};
