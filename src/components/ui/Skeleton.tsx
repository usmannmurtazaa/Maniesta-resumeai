import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string;
  height?: string;
}

export function Skeleton({
  className,
  variant = 'text',
  animation = 'pulse',
  width,
  height,
}: SkeletonProps) {
  const baseClasses = cn(
    'relative overflow-hidden bg-gray-200/70',
    animation === 'pulse' && 'animate-pulse',
    animation === 'wave' &&
      'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-shimmer',
    animation === 'none' && 'bg-gray-200',
    variant === 'text' && 'rounded-md',
    variant === 'circular' && 'rounded-full',
    variant === 'rectangular' && 'rounded-lg',
    className
  );

  return <div aria-hidden="true" style={{ width, height }} className={cn(baseClasses)} />;
}
