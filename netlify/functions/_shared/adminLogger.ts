import { db } from './firebaseAdmin';

export async function logAdminAction(
  adminId: string,
  action: string,
  entityType: string,
  entityId?: string,
  metadata?: any
) {
  await db.collection('adminLogs').add({
    adminId,
    action,
    entityType,
    entityId: entityId || null,
    metadata: metadata || null,
    createdAt: new Date(),
  });
}
