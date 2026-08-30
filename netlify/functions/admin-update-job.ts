import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';
import { logAdminAction } from './_shared/adminLogger';
import { jobUpdateSchema } from '../../src/utils/validators';

export const handler: Handler = async (event) => {
  const { uid, error } = await verifyAdminToken(event);
  if (error) return error;

  const body = JSON.parse(event.body || '{}');
  const { jobId, ...jobData } = body;
  if (!jobId) return { statusCode: 400, body: JSON.stringify({ message: 'jobId required' }) };

  const parsed = jobUpdateSchema.safeParse(jobData);
  if (!parsed.success)
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid input', errors: parsed.error.flatten() }),
    };

  const data = parsed.data;
  const updateData: any = { ...data, updatedAt: new Date() };
  if (data.status === 'published' && !data.publishedAt) {
    updateData.publishedAt = new Date();
  }

  await db.collection('jobs').doc(jobId).update(updateData);
  await logAdminAction(uid, 'update_job', 'job', jobId);
  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
