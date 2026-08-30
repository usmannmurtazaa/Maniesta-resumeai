import { useEffect, useState } from 'react';
import { notificationService } from '@/services/notifications/notificationService';
import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { NotificationIcon } from '@/components/ui/icons';
import type { AppNotification } from '@/types/notification.types';

export function NotificationManagement() {
  const user = useAuthStore((s) => s.user);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      notificationService
        .getUserNotifications(user.uid, 50)
        .then(setNotifications)
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading notifications...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Notification Management</h2>
      {notifications.length === 0 ? (
        <EmptyState
          title="No notifications"
          description="There are no notifications to display."
          icon={<NotificationIcon size={48} className="text-gray-300" />}
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <Card key={n.id} className="p-4">
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-gray-600">{n.message}</p>
              <p className="text-xs text-gray-400">{n.createdAt.toLocaleString()}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
