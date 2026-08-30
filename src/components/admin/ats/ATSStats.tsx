import type { AdminATS } from '@/types/admin.types';
import { Card } from '@/components/ui/Card';

export function ATSStats({ analyses }: { analyses: AdminATS[] }) {
  const total = analyses.length;
  const average = total > 0 ? Math.round(analyses.reduce((acc, a) => acc + a.score, 0) / total) : 0;
  const highest = total > 0 ? Math.max(...analyses.map((a) => a.score)) : 0;
  const lowest = total > 0 ? Math.min(...analyses.map((a) => a.score)) : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <p className="text-sm text-gray-500">Total Analyses</p>
        <p className="text-2xl font-semibold">{total}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-gray-500">Average Score</p>
        <p className="text-2xl font-semibold">{average}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-gray-500">Highest</p>
        <p className="text-2xl font-semibold">{highest}</p>
      </Card>
      <Card className="p-4">
        <p className="text-sm text-gray-500">Lowest</p>
        <p className="text-2xl font-semibold">{lowest}</p>
      </Card>
    </div>
  );
}
