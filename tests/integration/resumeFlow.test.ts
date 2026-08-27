import { describe, it, expect, vi } from 'vitest';

vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/firestore')>();
  return {
    ...actual,
    getFirestore: vi.fn(() => ({})),
    collection: vi.fn(() => ({})),
    doc: vi.fn(() => ({ id: 'generated-id' })),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    startAfter: vi.fn(),
    Timestamp: {
      now: vi.fn(() => new Date()),
      fromDate: vi.fn((date) => date),
    },
    FieldValue: {
      serverTimestamp: vi.fn(() => new Date()),
    },
  };
});

import { resumeService } from '@/services/firebase/firestore';

describe('resumeService', () => {
  it('createResume returns a resume object', async () => {
    const resume = await resumeService.createResume({ userId: 'u1', title: 'My Resume' });
    expect(resume.id).toBeDefined();
    expect(resume.title).toBe('My Resume');
  });
});