import {
  collection,
  doc,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { userService } from '@/services/user/userService';
import type { AppNotification } from '@/types/notification.types';

const NOTIFICATIONS_COLLECTION = 'notifications';
const JOBS_COLLECTION = 'jobs';

/**
 * Converts Firestore Timestamp to JavaScript Date.
 */
function toDate(value: any): Date {
  if (!value) return new Date();
  return value.toDate ? value.toDate() : new Date(value);
}

export const notificationService = {
  /**
   * Retrieves the most recent notifications for a user.
   * The list is sorted by createdAt descending.
   */
  async getUserNotifications(userId: string, limitCount = 20): Promise<AppNotification[]> {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      limit(limitCount * 2) // Fetch extra to ensure enough after sort
    );
    const snapshot = await getDocs(q);
    const notifications = snapshot.docs.map(
      (docSnap) =>
        ({
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: toDate(docSnap.data().createdAt),
        }) as AppNotification
    );

    notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return notifications.slice(0, limitCount);
  },

  /**
   * Marks a single notification as read.
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, { read: true });
  },

  /**
   * Marks all unread notifications for a user as read.
   * Uses a batch write for atomicity and performance.
   */
  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;

    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
      batch.update(docSnap.ref, { read: true });
    });
    await batch.commit();
  },

  /**
   * Returns the number of published jobs that the user has not yet seen.
   * Uses the user's `lastSeenJobsAt` timestamp.
   */
  async getNewJobsCount(userId: string): Promise<number> {
    const lastSeen = await userService.getLastSeenJobsAt(userId);
    const jobsQuery = query(collection(db, JOBS_COLLECTION), where('status', '==', 'published'));
    const snapshot = await getDocs(jobsQuery);

    if (!lastSeen) {
      return snapshot.size;
    }

    const lastSeenTime = lastSeen.getTime();
    return snapshot.docs.filter((docSnap) => {
      const publishedAt = docSnap.data().publishedAt?.toDate?.();
      return publishedAt && publishedAt.getTime() > lastSeenTime;
    }).length;
  },

  /**
   * Updates the user's `lastSeenJobsAt` timestamp to now.
   */
  async markJobsAsSeen(userId: string): Promise<void> {
    await userService.updateLastSeenJobsAt(userId, new Date());
  },
};
