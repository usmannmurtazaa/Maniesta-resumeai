import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

interface AutosaveOptions<T> {
  onSave: (data: T) => Promise<void> | void;
  delay?: number;
  enabled?: boolean;
}

interface AutosaveResult<T> {
  save: (data: T) => void;
  flush: () => void;
  cancel: () => void;
  isSaving: boolean;
  error: string | null;
  lastSavedAt: Date | null;
}

export function useAutosave<T>({
  onSave,
  delay = 1500,
  enabled = true,
}: AutosaveOptions<T>): AutosaveResult<T> {
  const saveRef = useRef(onSave);
  saveRef.current = onSave;

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const pendingRef = useRef(false);

  const debouncedSave = useDebouncedCallback(async (data: T) => {
    if (!enabled) return;
    if (pendingRef.current) return; // Avoid overlapping saves
    pendingRef.current = true;
    setIsSaving(true);
    setError(null);
    try {
      await saveRef.current(data);
      setLastSavedAt(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      pendingRef.current = false;
      setIsSaving(false);
    }
  }, delay);

  const save = useCallback(
    (data: T) => {
      if (enabled) {
        debouncedSave(data);
      }
    },
    [debouncedSave, enabled]
  );

  const flush = useCallback(() => {
    if (pendingRef.current) return;
    debouncedSave.flush();
  }, [debouncedSave]);

  const cancel = useCallback(() => {
    debouncedSave.cancel();
  }, [debouncedSave]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
      pendingRef.current = false;
      setIsSaving(false);
    };
  }, [debouncedSave]);

  return { save, flush, cancel, isSaving, error, lastSavedAt };
}
