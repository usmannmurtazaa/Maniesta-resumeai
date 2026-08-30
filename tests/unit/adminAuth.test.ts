import { describe, it, expect, beforeEach, vi } from 'vitest';
import { verifyAdminToken } from '@netlify/functions/_shared/adminAuth';
import * as admin from 'firebase-admin';

describe('verifyAdminToken', () => {
  const mockAuth = admin.auth() as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects missing Authorization header', async () => {
    const event = { headers: {} };
    const result = await verifyAdminToken(event);
    expect(result.error?.statusCode).toBe(401);
  });

  it('rejects non-admin token', async () => {
    mockAuth.verifyIdToken.mockResolvedValue({ uid: 'user1', admin: false });
    const event = { headers: { authorization: 'Bearer valid-user-token' } };
    const result = await verifyAdminToken(event);
    expect(result.error?.statusCode).toBe(403);
  });

  it('accepts admin token', async () => {
    mockAuth.verifyIdToken.mockResolvedValue({ uid: 'admin1', admin: true });
    const event = { headers: { authorization: 'Bearer valid-admin-token' } };
    const result = await verifyAdminToken(event);
    expect(result.uid).toBe('admin1');
    expect(result.error).toBeUndefined();
  });

  it('rejects invalid token', async () => {
    mockAuth.verifyIdToken.mockRejectedValue(new Error('Invalid token'));
    const event = { headers: { authorization: 'Bearer bad-token' } };
    const result = await verifyAdminToken(event);
    expect(result.error?.statusCode).toBe(401);
  });
});
