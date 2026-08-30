import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('firebase-admin', () => {
  const query = {
    where: vi.fn(() => query),
    orderBy: vi.fn(() => query),
    limit: vi.fn(() => query),
    startAfter: vi.fn(() => query),
    get: vi.fn(async () => {
      const docs: any[] = [];
      return {
        docs,
        forEach: (callback: (doc: any) => void) => docs.forEach(callback),
      };
    }),
  };
  const firestoreInstance = {
    collection: vi.fn(() => query),
    doc: vi.fn(() => ({
      set: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    })),
    Timestamp: {
      now: vi.fn(() => new Date()),
      fromDate: vi.fn((date) => date),
    },
    FieldValue: {
      serverTimestamp: vi.fn(() => new Date()),
    },
  };
  const authInstance = {
    verifyIdToken: vi.fn(),
  };
  return {
    apps: [],
    initializeApp: vi.fn(),
    credential: { cert: vi.fn() },
    auth: vi.fn(() => authInstance),
    firestore: vi.fn(() => firestoreInstance),
  };
});

import * as admin from 'firebase-admin';
import { handler } from '@netlify/functions/admin-get-users';

describe('admin-get-users integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty users for admin', async () => {
    (admin.auth() as any).verifyIdToken.mockResolvedValue({ uid: 'admin1', admin: true });
    const event = { headers: { authorization: 'Bearer token' }, queryStringParameters: {} };
    const result = await handler(event as any);
    expect(result.statusCode).toBe(200);
    const body = JSON.parse(result.body);
    expect(body.users).toEqual([]);
  });
});
