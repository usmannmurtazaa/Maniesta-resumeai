process.env.FIREBASE_SERVICE_ACCOUNT = '{}';

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// --- Mock firebase/auth ---
vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  return {
    ...actual,
    getAuth: vi.fn(() => ({ currentUser: null })),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
    GoogleAuthProvider: vi.fn(),
    onAuthStateChanged: vi.fn(),
  };
});

// --- Mock firebase/firestore ---
vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    getFirestore: vi.fn(() => ({})),
    collection: vi.fn(() => ({})),
    doc: vi.fn(() => ({})),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    setDoc: vi.fn(),
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

// --- Mock firebase/storage ---
vi.mock('firebase/storage', async () => {
  const actual = await vi.importActual('firebase/storage');
  return {
    ...actual,
    getStorage: vi.fn(() => ({})),
    ref: vi.fn(),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn(),
  };
});

// --- Mock firebase-admin ---
vi.mock('firebase-admin', () => {
  const auth = {
    verifyIdToken: vi.fn(),
  };
  const firestore = {
    collection: vi.fn(),
    Timestamp: {
      now: vi.fn(() => new Date()),
      fromDate: vi.fn((date) => date),
    },
    FieldValue: {
      serverTimestamp: vi.fn(() => new Date()),
    },
  };
  return {
    apps: [],
    initializeApp: vi.fn(),
    credential: { cert: vi.fn() },
    auth: () => auth,
    firestore: () => firestore,
  };
});
