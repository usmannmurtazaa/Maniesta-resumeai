import { describe, it, expect, beforeEach, vi } from 'vitest';
import { handler } from '@netlify/functions/admin-create-job';
import * as admin from 'firebase-admin';

describe('admin-create-job integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects non-admin', async () => {
    (admin.auth() as any).verifyIdToken.mockResolvedValue({ uid: 'user1', admin: false });
    const event = { headers: { authorization: 'Bearer token' }, body: '{}' };
    const result = await handler(event as any);
    expect(result.statusCode).toBe(403);
  });
});