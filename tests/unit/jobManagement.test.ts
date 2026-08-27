import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jobService } from '@/services/jobs/jobService';

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    getDocs: vi.fn(),
    getDoc: vi.fn(),
    doc: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    startAfter: vi.fn(),
  };
});

import * as firestore from 'firebase/firestore';

describe('jobService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getPublishedJobs returns published jobs', async () => {
    const mockJobs = [{ id: '1', title: 'Dev', status: 'published' }];
    (firestore.getDocs as any).mockResolvedValue({
      docs: mockJobs.map((job) => ({ id: job.id, data: () => job })),
      size: mockJobs.length,
    });
    (firestore.collection as any).mockReturnValue('jobs');
    (firestore.query as any).mockReturnValue('query');
    const result = await jobService.getPublishedJobs({}, 20);
    expect(result.jobs).toHaveLength(1);
    expect(result.jobs[0].title).toBe('Dev');
  });

  it('getJob returns null if not found', async () => {
    (firestore.getDoc as any).mockResolvedValue({ exists: () => false });
    const result = await jobService.getJob('nonexistent');
    expect(result).toBeNull();
  });
});