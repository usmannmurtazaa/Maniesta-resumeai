import { vi } from 'vitest';

const authInstance = {
  verifyIdToken: vi.fn(),
};

const firestoreInstance = {
  collection: vi.fn(() => {
    const query: any = {
      where: vi.fn(() => query),
      orderBy: vi.fn(() => query),
      limit: vi.fn(() => query),
      startAfter: vi.fn(() => query),
      get: vi.fn(async () => ({ docs: [] })),
    };
    return query;
  }),
  doc: vi.fn(() => ({
    set: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  })),
  Timestamp: {
    now: vi.fn(() => new Date()),
    fromDate: vi.fn((date: Date) => date),
  },
  FieldValue: {
    serverTimestamp: vi.fn(() => new Date()),
  },
};

export const apps: any[] = [];
export const initializeApp = vi.fn();
export const credential = { cert: vi.fn() };
export const auth = vi.fn(() => authInstance);
export const firestore = vi.fn(() => firestoreInstance);