import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const params = event.queryStringParameters || {};
  const limit = parseInt(params.limit || '20');
  const startAfter = params.startAfter || null;
  const userId = params.userId;

  let query: any = db.collection('atsAnalyses');
  if (userId) query = query.where('userId', '==', userId);
  if (startAfter) query = query.startAfter(startAfter);
  query = query.limit(limit);

  const snapshot = await query.get();
  const analyses = snapshot.docs.map((doc: any) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      resumeId: data.resumeId,
      jobId: data.jobId || null,
      score: data.score,
      jobMatchScore: data.jobMatchScore || null,
      matchedKeywords: data.matchedKeywords || [],
      missingKeywords: data.missingKeywords || [],
      recommendations: data.recommendations || [],
      warnings: data.warnings || [],
      createdAt: data.createdAt?.toDate?.() || null,
    };
  });

  const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;
  return {
    statusCode: 200,
    body: JSON.stringify({ analyses, lastVisible }),
  };
};