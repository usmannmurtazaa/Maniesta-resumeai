import { useRef, useCallback } from 'react';

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T & { cancel: () => void; flush: () => void } {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debounced = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]) as T & { cancel: () => void; flush: () => void };

  debounced.cancel = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  debounced.flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      callbackRef.current();
    }
  };

  return debounced;
}