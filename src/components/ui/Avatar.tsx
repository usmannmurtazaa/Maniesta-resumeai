interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };
  return src ? (
    <img src={src} alt={alt || 'avatar'} className={`${sizes[size]} rounded-full object-cover ${className}`} />
  ) : (
    <div className={`${sizes[size]} rounded-full bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}>
      {alt?.[0]?.toUpperCase() || '?'}
    </div>
  );
}