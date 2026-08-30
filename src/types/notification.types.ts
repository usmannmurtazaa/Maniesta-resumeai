export type NotificationType = 'job-match' | 'deadline-reminder' | 'featured-match';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  jobId?: string;
  read: boolean;
  createdAt: Date;
}
