import { create } from 'zustand';
import type { AppNotification } from '@/types/notification.types';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  newJobsCount: number;
  setNotifications: (notifications: AppNotification[]) => void;
  setUnreadCount: (count: number) => void;
  setNewJobsCount: (count: number) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  newJobsCount: 0,
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }),
  setUnreadCount: (unreadCount) => set({ unreadCount }),
  setNewJobsCount: (newJobsCount) => set({ newJobsCount }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));