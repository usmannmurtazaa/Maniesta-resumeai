import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';
import { logAdminAction } from './_shared/adminLogger';

export const handler: Handler = async (event) => {
  const { uid, error } = await verifyAdminToken(event);
  if (error) return error;

  const body = JSON.parse(event.body || '{}');
  const { jobId } = body;
  if (!jobId) return { statusCode: 400, body: JSON.stringify({ message: 'jobId required' }) };

  await db.collection('jobs').doc(jobId).delete();
  await logAdminAction(uid, 'delete_job', 'job', jobId);
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
