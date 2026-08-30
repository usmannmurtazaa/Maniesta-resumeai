import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const { user, loading, isAdmin, setUser, setAdmin, setLoading } = useAuthStore();

  return {
    user,
    loading,
    isAdmin,
    setUser,
    setAdmin,
    setLoading,
  };
}
