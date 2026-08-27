import * as admin from 'firebase-admin';

export async function verifyAdminToken(event: any): Promise<{ uid: string; error?: { statusCode: number; body: string } }> {
  const authHeader = event.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { uid: '', error: { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized' }) } };
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded.admin) {
      return { uid: decoded.uid, error: { statusCode: 403, body: JSON.stringify({ message: 'Forbidden' }) } };
    }
    return { uid: decoded.uid };
  } catch {
    return { uid: '', error: { statusCode: 401, body: JSON.stringify({ message: 'Invalid token' }) } };
  }
}