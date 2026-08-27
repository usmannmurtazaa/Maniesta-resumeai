import React from 'react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
        className
      )}
      {...props}
    />
  );
}