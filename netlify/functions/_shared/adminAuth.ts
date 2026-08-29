import { auth } from './firebaseAdmin';

export async function verifyAdminToken(event: any) {
  const authHeader = event.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return {
      uid: '',
      error: {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      },
    };
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await auth.verifyIdToken(token);
    if (!decoded.admin) {
      return {
        uid: decoded.uid,
        error: {
          statusCode: 403,
          body: JSON.stringify({ message: 'Forbidden' }),
        },
      };
    }
    return { uid: decoded.uid };
  } catch (err) {
    return {
      uid: '',
      error: {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid token' }),
      },
    };
  }
}