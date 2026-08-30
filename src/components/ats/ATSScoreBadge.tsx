import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ATSIcon } from '@/components/ui/icons';

interface ATSScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: {
    circle: 56,
    strokeWidth: 5,
    text: 'text-xl',
    label: 'text-xs',
  },
  md: {
    circle: 72,
    strokeWidth: 6,
    text: 'text-2xl',
    label: 'text-sm',
  },
  lg: {
    circle: 96,
    strokeWidth: 8,
    text: 'text-3xl',
    label: 'text-base',
  },
};

function getScoreColor(score: number): string {
  if (score >= 80) return '#10B981'; // green
  if (score >= 60) return '#F59E0B'; // yellow
  if (score >= 40) return '#F97316'; // orange
  return '#EF4444'; // red
}

export function ATSScoreBadge({
  score,
  size = 'md',
  showLabel = true,
  animated = true,
  className,
}: ATSScoreBadgeProps) {
  const prefersReducedMotion = useReducedMotion();
  const { circle, strokeWidth, text, label } = sizeMap[size];
  const radius = (circle - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(Math.max(score, 0), 100) / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={circle}
          height={circle}
          viewBox={`0 0 ${circle} ${circle}`}
          className="-rotate-90"
        >
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={
              animated && !prefersReducedMotion
                ? { strokeDashoffset: circumference }
                : { strokeDashoffset: offset }
            }
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: animated && !prefersReducedMotion ? 1 : 0, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('font-bold text-gray-900 leading-none', text)}>{score}</span>
          {showLabel && <span className={cn('text-gray-500 mt-1', label)}>ATS</span>}
        </div>
      </div>
    </div>
  );
}
