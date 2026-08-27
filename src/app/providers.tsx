import React from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}