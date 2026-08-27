import { useEffect, useState } from 'react';
import { notificationService } from '@/services/notifications/notificationService';
import { useAuthStore } from '@/store/authStore';
import type { AppNotification } from '@/types/notification.types';

export function NotificationManagement() {
  const user = useAuthStore((s) => s.user);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (user) {
      // For admin, we might need all notifications; for now, we show current admin's notifications.
      notificationService.getUserNotifications(user.uid, 50).then(setNotifications);
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Management</h2>
      <p>Total notifications: {notifications.length}</p>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 border rounded-lg">
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-gray-600">{n.message}</p>
            <p className="text-xs text-gray-400">{n.createdAt.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}