import { useEffect, useState, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/user/userService';
import type { JobPreferences } from '@/types/job.types';

export function useJobPreferences() {
  const user = useAuthStore((s) => s.user);
  const [preferences, setPreferences] = useState<JobPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    userService
      .getUserData(user.uid)
      .then((data) => {
        setPreferences((data?.jobPreferences as JobPreferences) || null);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load preferences'))
      .finally(() => setLoading(false));
  }, [user]);

  const updatePreferences = useCallback(
    async (newPrefs: JobPreferences) => {
      if (!user) return;
      setError(null);
      try {
        await userService.updateJobPreferences(user.uid, newPrefs);
        setPreferences(newPrefs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update preferences');
        throw err;
      }
    },
    [user]
  );

  return { preferences, loading, error, updatePreferences };
}
