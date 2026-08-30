import { useRef, useCallback } from 'react';

interface DebouncedCallback<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): DebouncedCallback<T> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    lastArgsRef.current = null;
  }, []);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (lastArgsRef.current !== null) {
      callbackRef.current(...lastArgsRef.current);
      lastArgsRef.current = null;
    }
  }, []);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      lastArgsRef.current = args;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        lastArgsRef.current = null;
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ) as DebouncedCallback<T>;

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}
