import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white/70 backdrop-blur-md border border-white/30 shadow-soft transition-all duration-300 hover:shadow-medium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}