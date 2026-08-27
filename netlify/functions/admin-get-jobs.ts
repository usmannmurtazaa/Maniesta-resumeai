import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const snapshot = await db.collection('jobs').get();
  const jobs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    publishedAt: doc.data().publishedAt?.toDate?.() || null,
    scheduledAt: doc.data().scheduledAt?.toDate?.() || null,
    deadline: doc.data().deadline?.toDate?.() || null,
    createdAt: doc.data().createdAt?.toDate?.() || null,
    updatedAt: doc.data().updatedAt?.toDate?.() || null,
  }));
  return { statusCode: 200, body: JSON.stringify(jobs) };
};