import { Handler } from '@netlify/functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
  });
}

const db = admin.firestore();

export const handler: Handler = async () => {
  try {
    const now = new Date();
    const soon = new Date(now.getTime() + 48 * 60 * 60 * 1000); // within next 48 hours

    // Get users with savedJobs (array field exists and not empty)
    // Since Firestore doesn't support 'array != []', we can query users where savedJobs is not null
    const usersSnapshot = await db.collection('users')
      .where('savedJobs', '!=', null)
      .get();

    if (usersSnapshot.empty) return { statusCode: 200, body: JSON.stringify({ processed: 0 }) };

    let processed = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const savedJobs = userData.savedJobs || [];
      if (savedJobs.length === 0) continue;

      for (const jobId of savedJobs) {
        const jobSnapshot = await db.collection('jobs').doc(jobId).get();
        if (!jobSnapshot.exists) continue;
        const job = jobSnapshot.data();
        if (!job?.deadline || !job.deadline.toDate) continue;

        const deadline = job.deadline.toDate();
        if (deadline > now && deadline < soon) {
          // Check duplicate
          const duplicateQuery = await db.collection('notifications')
            .where('userId', '==', userDoc.id)
            .where('jobId', '==', jobId)
            .where('type', '==', 'deadline-reminder')
            .limit(1)
            .get();

          if (duplicateQuery.empty) {
            await db.collection('notifications').add({
              userId: userDoc.id,
              type: 'deadline-reminder',
              title: 'Job application deadline approaching',
              message: `The application deadline for ${job.title} at ${job.companyName} is ${deadline.toLocaleDateString()}.`,
              jobId,
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
    console.error('Error creating deadline reminders:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};