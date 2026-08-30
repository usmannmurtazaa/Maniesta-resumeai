import { create } from 'zustand';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/services/firebase/config';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (isAdmin: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAdmin: false,
  setUser: (user) => set({ user }),
  setAdmin: (isAdmin) => set({ isAdmin }),
  setLoading: (loading) => set({ loading }),
}));

// Initialize auth listener
onAuthStateChanged(auth, async (user) => {
  useAuthStore.getState().setUser(user);
  if (user) {
    const token = await user.getIdTokenResult();
    useAuthStore.getState().setAdmin(!!token.claims.admin);
  } else {
    useAuthStore.getState().setAdmin(false);
  }
  useAuthStore.getState().setLoading(false);
});
