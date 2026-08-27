import {
  collection,
  doc,
  getDocs,
  query,
  where,
  limit,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { userService } from '@/services/user/userService';
import type { AppNotification } from '@/types/notification.types';

const NOTIFICATIONS_COLLECTION = 'notifications';
const JOBS_COLLECTION = 'jobs';

export const notificationService = {
  async getUserNotifications(userId: string, limitCount = 20): Promise<AppNotification[]> {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      limit(limitCount * 2) // fetch extra to sort
    );
    const snapshot = await getDocs(q);
    const notifications = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
    } as AppNotification));

    // Sort by createdAt descending, then slice
    notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return notifications.slice(0, limitCount);
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, { read: true });
  },

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    const snapshot = await getDocs(q);
    await Promise.all(snapshot.docs.map((docSnap) => updateDoc(docSnap.ref, { read: true })));
  },

  async getNewJobsCount(userId: string): Promise<number> {
    const lastSeen = await userService.getLastSeenJobsAt(userId);
    const jobsQuery = query(collection(db, JOBS_COLLECTION), where('status', '==', 'published'));
    const snapshot = await getDocs(jobsQuery);
    if (!lastSeen) return snapshot.size;
    const lastSeenTime = lastSeen.getTime();
    return snapshot.docs.filter((docSnap) => {
      const publishedAt = docSnap.data().publishedAt?.toDate?.();
      return publishedAt && publishedAt.getTime() > lastSeenTime;
    }).length;
  },

  async markJobsAsSeen(userId: string): Promise<void> {
    await userService.updateLastSeenJobsAt(userId, new Date());
  },
};