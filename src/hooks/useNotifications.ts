import { useEffect, useCallback } from 'react';
import { useNotificationStore } from '@/store/notificationStore';
import { notificationService } from '@/services/notifications/notificationService';
import { useAuthStore } from '@/store/authStore';

export function useNotifications() {
  const user = useAuthStore((s) => s.user);
  const {
    notifications,
    unreadCount,
    newJobsCount,
    setNotifications,
    setNewJobsCount,
    markAsRead,
    markAllAsRead: markAllAsReadLocal,
  } = useNotificationStore();

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const [notifs, newJobs] = await Promise.all([
        notificationService.getUserNotifications(user.uid),
        notificationService.getNewJobsCount(user.uid),
      ]);
      setNotifications(notifs);
      setNewJobsCount(newJobs);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, [user, setNotifications, setNewJobsCount]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markOneAsRead = useCallback(
    async (id: string) => {
      if (!user) return;
      await notificationService.markNotificationAsRead(id);
      markAsRead(id);
    },
    [user, markAsRead]
  );

  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    await notificationService.markAllNotificationsAsRead(user.uid);
    await notificationService.markJobsAsSeen(user.uid);
    markAllAsReadLocal();
    setNewJobsCount(0);
  }, [user, markAllAsReadLocal, setNewJobsCount]);

  return {
    notifications,
    unreadCount,
    newJobsCount,
    markOneAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
}
