import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const userId = event.queryStringParameters?.userId;
  if (!userId) return { statusCode: 400, body: JSON.stringify({ message: 'userId required' }) };

  const snapshot = await db.collection('resumes').where('userId', '==', userId).get();
  const resumes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || null,
    updatedAt: doc.data().updatedAt?.toDate?.() || null,
  }));

  return { statusCode: 200, body: JSON.stringify({ resumes }) };
};
