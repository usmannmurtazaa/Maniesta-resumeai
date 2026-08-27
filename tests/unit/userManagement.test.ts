import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from '@/services/user/userService';

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(),
    updateDoc: vi.fn(),
  };
});

import * as firestore from 'firebase/firestore';

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('addSavedJob adds job ID if not present', async () => {
    (firestore.doc as any).mockReturnValue('docRef');
    (firestore.getDoc as any).mockResolvedValue({
      data: () => ({ savedJobs: ['job1'] }),
    });
    (firestore.updateDoc as any).mockResolvedValue(undefined);
    await userService.addSavedJob('user1', 'job2');
    expect(firestore.updateDoc).toHaveBeenCalledWith('docRef', { savedJobs: ['job1', 'job2'] });
  });

  it('removeSavedJob removes job ID', async () => {
    (firestore.doc as any).mockReturnValue('docRef');
    (firestore.getDoc as any).mockResolvedValue({
      data: () => ({ savedJobs: ['job1', 'job2'] }),
    });
    (firestore.updateDoc as any).mockResolvedValue(undefined);
    await userService.removeSavedJob('user1', 'job1');
    expect(firestore.updateDoc).toHaveBeenCalledWith('docRef', { savedJobs: ['job2'] });
  });
});