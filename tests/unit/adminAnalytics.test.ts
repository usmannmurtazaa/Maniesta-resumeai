import { describe, it, expect, vi, beforeEach } from 'vitest';

process.env.FIREBASE_SERVICE_ACCOUNT = '{}';

const mocks = vi.hoisted(() => {
  const authMock = { verifyIdToken: vi.fn() };
  const firestoreMock = {
    collection: vi.fn(() => ({
      get: vi.fn().mockResolvedValue({ docs: [] }),
    })),
  };
  return { authMock, firestoreMock };
});

vi.mock('firebase-admin', () => ({
  apps: [],
  initializeApp: vi.fn(),
  credential: { cert: vi.fn() },
  auth: () => mocks.authMock,
  firestore: () => mocks.firestoreMock,
}));

import * as admin from 'firebase-admin';
import { handler } from '@netlify/functions/admin-get-analytics';

describe('admin-get-analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty analytics for admin', async () => {
    mocks.authMock.verifyIdToken.mockResolvedValue({ uid: 'admin1', admin: true });
    const event = { headers: { authorization: 'Bearer token' } };
    const result = await handler(event as any);
    const body = JSON.parse(result.body);
    expect(body.users.total).toBe(0);
  });
});
