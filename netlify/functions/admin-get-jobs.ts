import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const snapshot = await db.collection('jobs').get();
  const jobs = snapshot.docs.map((doc: any) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      publishedAt: data.publishedAt?.toDate?.() || null,
      scheduledAt: data.scheduledAt?.toDate?.() || null,
      deadline: data.deadline?.toDate?.() || null,
      createdAt: data.createdAt?.toDate?.() || null,
      updatedAt: data.updatedAt?.toDate?.() || null,
    };
  });

  return {
    statusCode: 200,
    body: JSON.stringify(jobs),
  };
};
