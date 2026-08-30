import { useCallback, useEffect, useState } from 'react';
import { useAdminStore } from '@/store/adminStore';
import { adminService } from '@/services/admin/adminService';
import { ATSTable } from './ATSTable';
import { ATSStats } from './ATSStats';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';

export function ATSManagement() {
  const { atsAnalyses, setAtsAnalyses, setLoading } = useAdminStore();
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchAnalyses = useCallback(async () => {
    setLoading('ats', true);
    try {
      const { analyses } = await adminService.getATSAnalyses({ limit: 100 });
      setAtsAnalyses(analyses, null, false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ATS analyses');
    } finally {
      setLoading('ats', false);
      setInitialLoading(false);
    }
  }, [setLoading, setAtsAnalyses]);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  if (initialLoading) {
    return <TableSkeleton rows={6} columns={6} />;
  }

  if (error) {
    return (
      <ErrorState title="Error loading ATS analyses" message={error} onRetry={fetchAnalyses} />
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">ATS Analysis Management</h2>
      <ATSStats analyses={atsAnalyses} />
      {atsAnalyses.length === 0 ? (
        <EmptyState
          title="No ATS analyses found"
          description="ATS history will appear here once users run analyses."
        />
      ) : (
        <ATSTable analyses={atsAnalyses} />
      )}
    </div>
  );
}
