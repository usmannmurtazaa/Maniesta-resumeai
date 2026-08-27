import { describe, it, expect, vi } from 'vitest';
import { authService } from '@/services/firebase/auth';

vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal<typeof import('firebase/auth')>();
  return {
    ...actual,
    getAuth: vi.fn(() => ({ currentUser: null })),
    signInWithEmailAndPassword: vi.fn().mockResolvedValue({ user: { uid: '123' } }),
    createUserWithEmailAndPassword: vi.fn().mockResolvedValue({ user: { uid: '456' } }),
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
    sendPasswordResetEmail: vi.fn(),
    GoogleAuthProvider: vi.fn(),
    onAuthStateChanged: vi.fn(),
  };
});

describe('authService', () => {
  it('login calls signInWithEmailAndPassword', async () => {
    const result = await authService.login('test@example.com', 'password');
    expect(result.user.uid).toBe('123');
  });
});