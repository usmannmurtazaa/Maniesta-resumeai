import { useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

interface AutosaveOptions {
  onSave: (data: any) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export function useAutosave<T>({ onSave, delay = 1500, enabled = true }: AutosaveOptions) {
  const saveRef = useRef(onSave);
  saveRef.current = onSave;

  const debouncedSave = useDebouncedCallback(async (data: T) => {
    await saveRef.current(data);
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
    debouncedSave.flush();
  }, [debouncedSave]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return { save, flush };
}