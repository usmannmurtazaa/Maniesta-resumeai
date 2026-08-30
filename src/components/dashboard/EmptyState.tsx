import { EmptyState as CommonEmptyState } from '@/components/common/EmptyState';
import { cn } from '@/utils/cn';

interface DashboardEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: DashboardEmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/40 bg-white/50 backdrop-blur-sm p-2',
        className
      )}
    >
      <CommonEmptyState
        icon={icon}
        title={title}
        description={description}
        action={action}
        secondaryAction={secondaryAction}
      />
    </div>
  );
}
