import { cn } from '@/utils/cn';

export function JobCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-5 shadow-soft backdrop-blur-md"
    >
      <div className="flex items-start gap-4 pr-10">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-4 w-3/4 rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
          <div className="h-3 w-1/3 rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-3 w-full rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-5/6 rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-2/3 rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>

      <div className="mt-5 flex justify-between border-t border-white/40 pt-4">
        <div className="h-3 w-24 rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-3 w-16 rounded-md bg-gray-200/80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>
    </div>
  );
}
