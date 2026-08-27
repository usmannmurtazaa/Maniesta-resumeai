import { describe, it, expect, vi, beforeEach } from 'vitest';
import { notificationService } from '@/services/notifications/notificationService';
import { userService } from '@/services/user/userService';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(() => ({})),
  doc: vi.fn(() => ({})),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  Timestamp: { now: vi.fn(() => new Date()), fromDate: vi.fn((d) => d) },
  FieldValue: { serverTimestamp: vi.fn(() => new Date()) },
}));

vi.mock('@/services/user/userService', () => ({
  userService: {
    getLastSeenJobsAt: vi.fn(),
    updateLastSeenJobsAt: vi.fn(),
  },
}));

describe('notificationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getNewJobsCount returns 0 when no published jobs', async () => {
    (userService.getLastSeenJobsAt as any).mockResolvedValue(null);
    const { getDocs } = await import('firebase/firestore');
    (getDocs as any).mockResolvedValue({ size: 0, docs: [] });
    const count = await notificationService.getNewJobsCount('user1');
    expect(count).toBe(0);
  });

  it('markJobsAsSeen updates lastSeenJobsAt', async () => {
    await notificationService.markJobsAsSeen('user1');
    expect(userService.updateLastSeenJobsAt).toHaveBeenCalledWith('user1', expect.any(Date));
  });
});