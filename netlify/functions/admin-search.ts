import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const query = (event.queryStringParameters?.query || '').toLowerCase();
  if (!query) return { statusCode: 200, body: JSON.stringify([]) };

  const results: any[] = [];

  // Search users
  const usersSnapshot = await db.collection('users').limit(5).get();
  usersSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const name = (data.displayName || '').toLowerCase();
    const email = (data.email || '').toLowerCase();
    if (name.includes(query) || email.includes(query)) {
      results.push({
        type: 'user',
        id: doc.id,
        title: data.displayName || data.email,
        subtitle: data.email,
      });
    }
  });

  // Search resumes
  const resumesSnapshot = await db.collection('resumes').limit(5).get();
  resumesSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.title?.toLowerCase().includes(query)) {
      results.push({ type: 'resume', id: doc.id, title: data.title, subtitle: 'Resume' });
    }
  });

  // Search jobs
  const jobsSnapshot = await db.collection('jobs').limit(5).get();
  jobsSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (
      data.title?.toLowerCase().includes(query) ||
      data.companyName?.toLowerCase().includes(query)
    ) {
      results.push({ type: 'job', id: doc.id, title: data.title, subtitle: data.companyName });
    }
  });

  return { statusCode: 200, body: JSON.stringify(results) };
};
