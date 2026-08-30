import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db, auth } from './_shared/firebaseAdmin';
import { logAdminAction } from './_shared/adminLogger';

export const handler: Handler = async (event) => {
  const { uid: adminUid, error } = await verifyAdminToken(event);
  if (error) return error;

  const body = JSON.parse(event.body || '{}');
  const { userId, disabled } = body;
  if (!userId || typeof disabled !== 'boolean')
    return { statusCode: 400, body: JSON.stringify({ message: 'Invalid input' }) };

  await db.collection('users').doc(userId).update({ disabled });
  await logAdminAction(adminUid, disabled ? 'disable_user' : 'enable_user', 'user', userId);

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
