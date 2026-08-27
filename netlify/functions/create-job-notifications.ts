import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';
import { calculateJobMatchScore } from '../../src/utils/jobMatching';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
  });
}

const db = admin.firestore();

export const handler: Handler = async () => {
  try {
    const now = new Date();
    const since = new Date(now.getTime() - 24 * 60 * 60 * 1000); // last 24 hours

    // Get users with jobPreferences
    const usersSnapshot = await db.collection('users')
      .where('jobPreferences', '!=', null)
      .get();

    if (usersSnapshot.empty) return { statusCode: 200, body: JSON.stringify({ processed: 0 }) };

    // Get jobs published in the last 24 hours
    const jobsSnapshot = await db.collection('jobs')
      .where('status', '==', 'published')
      .where('publishedAt', '>=', since)
      .get();

    if (jobsSnapshot.empty) return { statusCode: 200, body: JSON.stringify({ processed: 0 }) };

    const jobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    let processed = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const preferences = userData.jobPreferences;
      if (!preferences) continue;

      const userId = userDoc.id;

      for (const job of jobs) {
        const score = calculateJobMatchScore(preferences, job);
        // Create notification if score >= 60 (threshold)
        if (score >= 60) {
          // Check for duplicates
          const duplicateQuery = await db.collection('notifications')
            .where('userId', '==', userId)
            .where('jobId', '==', job.id)
            .where('type', '==', 'job-match')
            .limit(1)
            .get();

          if (duplicateQuery.empty) {
            await db.collection('notifications').add({
              userId,
              type: 'job-match',
              title: 'New job matches your preferences',
              message: `${job.title} at ${job.companyName} matches your preferences.`,
              jobId: job.id,
              read: false,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            processed++;
          }
        }
      }
    }

    return { statusCode: 200, body: JSON.stringify({ processed }) };
  } catch (error) {
    console.error('Error creating job notifications:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};