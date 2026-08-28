import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jobService } from '@/services/jobs/jobService';
import { JobDetail } from '@/components/jobs/JobDetail';
import { Spinner } from '@/components/ui/Spinner';
import { PageTransition } from '@/components/common/PageTransition';
import { BackButton } from '@/components/common/BackButton';
import type { Job } from '@/types/job.types';

export function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      jobService.getJob(jobId).then((j) => {
        setJob(j);
        setLoading(false);
      });
    }
  }, [jobId]);

  if (loading) return <div className="p-8 flex justify-center"><Spinner /></div>;
  if (!job) return <div className="p-8 text-center">Job not found</div>;

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <BackButton label="Back to Jobs" to="/jobs" />
        <JobDetail job={job} />
      </div>
    </PageTransition>
  );
}