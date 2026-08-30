import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

interface StatItem {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
  bgColor?: string;
}

interface DashboardStatsProps {
  stats: StatItem[];
  className?: string;
}

export function DashboardStats({ stats, className }: DashboardStatsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={prefersReducedMotion ? {} : { y: -4 }}
          className="h-full"
        >
          <Card className="h-full p-5 border-white/40 bg-white/70 backdrop-blur-md shadow-soft hover:shadow-glass transition-shadow">
            <div className="flex items-center justify-between">
              <div
                className={cn('rounded-xl p-3', stat.bgColor || 'bg-primary-100 text-primary-600')}
              >
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
