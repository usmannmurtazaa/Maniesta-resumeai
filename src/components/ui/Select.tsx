import React from 'react';
import { cn } from '@/utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'block w-full rounded-md border border-gray-300 py-2 px-3 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}