export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  entityType: 'user' | 'resume' | 'job' | 'notification' | 'system';
  entityId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
