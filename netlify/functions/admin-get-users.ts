import { Handler } from '@netlify/functions';
import { verifyAdminToken } from './_shared/adminAuth';
import { db } from './_shared/firebaseAdmin';

export const handler: Handler = async (event) => {
  const { error } = await verifyAdminToken(event);
  if (error) return error;

  const params = event.queryStringParameters || {};
  const limit = parseInt(params.limit || '20');
  const startAfter = params.startAfter ? params.startAfter : null;
  const search = params.search?.toLowerCase();
  const status = params.status;
  const adminFilter = params.admin;

  let query: any = db.collection('users');
  if (status === 'active') query = query.where('disabled', '==', false);
  if (status === 'disabled') query = query.where('disabled', '==', true);
  if (adminFilter === 'true') query = query.where('admin', '==', true);
  if (adminFilter === 'false') query = query.where('admin', '==', false);
  if (startAfter) query = query.startAfter(startAfter);
  query = query.limit(limit);

  const snapshot = await query.get();
  const users: any[] = [];
  snapshot.forEach((doc: any) => {
    const data = doc.data();
    if (search) {
      const name = (data.displayName || '').toLowerCase();
      const email = (data.email || '').toLowerCase();
      if (!name.includes(search) && !email.includes(search)) return;
    }
    users.push({
      id: doc.id,
      email: data.email,
      displayName: data.displayName || null,
      photoURL: data.photoURL || null,
      createdAt: data.createdAt?.toDate?.() || null,
      lastLoginAt: data.lastLoginAt?.toDate?.() || null,
      disabled: data.disabled || false,
      admin: data.admin || false,
    });
  });

  const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;
  return {
    statusCode: 200,
    body: JSON.stringify({
      users,
      lastVisible,
    }),
  };
};