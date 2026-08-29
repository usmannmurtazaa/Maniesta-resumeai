import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [usersSnapshot, resumesSnapshot, atsSnapshot, jobsSnapshot] = await Promise.all([
    db.collection('users').get(),
    db.collection('resumes').get(),
    db.collection('atsAnalyses').get(),
    db.collection('jobs').get(),
  ]);

  const users = usersSnapshot.docs;
  const resumes = resumesSnapshot.docs;
  const ats = atsSnapshot.docs;
  const jobs = jobsSnapshot.docs;

  const countSince = (docs: any[], date: Date) =>
    docs.filter((d) => (d.data().createdAt?.toDate?.() || new Date(0)) >= date).length;

  const averageScore =
    ats.length > 0
      ? Math.round(ats.reduce((acc, d) => acc + (d.data().score || 0), 0) / ats.length)
      : 0;

  return {
    statusCode: 200,
    body: JSON.stringify({
      users: {
        total: users.length,
        newToday: countSince(users, startOfDay),
        newThisWeek: countSince(users, startOfWeek),
        newThisMonth: countSince(users, startOfMonth),
        activeUsers: users.filter((d) => !d.data().disabled).length,
      },
      resumes: {
        total: resumes.length,
        createdToday: countSince(resumes, startOfDay),
        createdThisWeek: countSince(resumes, startOfWeek),
        createdThisMonth: countSince(resumes, startOfMonth),
      },
      ats: {
        totalAnalyses: ats.length,
        averageScore,
        analysesToday: countSince(ats, startOfDay),
        analysesThisWeek: countSince(ats, startOfWeek),
        analysesThisMonth: countSince(ats, startOfMonth),
        jobMatches: ats.filter((d) => d.data().jobId).length,
      },
      jobs: {
        total: jobs.length,
        published: jobs.filter((d) => d.data().status === 'published').length,
        scheduled: jobs.filter((d) => d.data().status === 'scheduled').length,
        featured: jobs.filter((d) => d.data().featured).length,
        savedByUsers: 0,
      },
    }),
  };
};