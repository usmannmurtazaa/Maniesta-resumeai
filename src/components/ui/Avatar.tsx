import { cn } from '@/utils/cn';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  ring?: boolean;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const sizeMap = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const statusColorMap = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

export function Avatar({ src, alt, size = 'md', className, ring = false, status }: AvatarProps) {
  const initials = alt
    ?.split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn('relative inline-block shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          title={alt}
          className={cn(
            sizeMap[size],
            'rounded-full object-cover',
            ring && 'ring-2 ring-white shadow-soft',
            'transition-transform duration-200 hover:scale-105'
          )}
        />
      ) : (
        <div
          title={alt}
          className={cn(
            sizeMap[size],
            'flex items-center justify-center rounded-full bg-gradient-to-br from-primary-200 to-accent-200 text-primary-700 font-semibold select-none',
            ring && 'ring-2 ring-white shadow-soft'
          )}
        >
          {initials || '?'}
        </div>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            size === 'xs' ? 'h-2 w-2' : size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5',
            statusColorMap[status]
          )}
          aria-label={status}
        />
      )}
    </div>
  );
}
