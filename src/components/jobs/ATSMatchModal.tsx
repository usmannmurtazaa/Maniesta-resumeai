import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/store/authStore';
import { resumeService } from '@/services/firebase/firestore';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import type { Job } from '@/types/job.types';
import type { Resume } from '@/types/resume.types';

interface Props {
  job: Job;
  onClose: () => void;
}

export function ATSMatchModal({ job, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [matchResult, setMatchResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (user) {
      resumeService.getUserResumes(user.uid).then((res) => {
        setResumes(res);
        setLoading(false);
        if (res.length > 0) setSelectedResume(res[0]);
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedResume && job) {
      setCalculating(true);
      const result = calculateAtsScore(selectedResume.content, job.description);
      setMatchResult(result);
      setCalculating(false);
    }
  }, [selectedResume, job]);

  if (loading) {
    return (
      <Modal onClose={onClose}>
        <div className="p-4 flex justify-center"><Spinner /></div>
      </Modal>
    );
  }

  if (resumes.length === 0) {
    return (
      <Modal onClose={onClose}>
        <div className="p-4 text-center">
          <p className="mb-4">You need a resume to check ATS match.</p>
          <Link to={`/builder?jobId=${job.id}`} className="inline-block rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
            Create Resume
          </Link>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">ATS Match for {job.title}</h3>
        <select
          value={selectedResume?.id}
          onChange={(e) => setSelectedResume(resumes.find((r) => r.id === e.target.value) || null)}
          className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm mb-4"
        >
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>{resume.title}</option>
          ))}
        </select>

        {calculating ? (
          <div className="flex justify-center py-4"><Spinner /></div>
        ) : matchResult ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">{matchResult.score}%</p>
              <p className="text-sm text-gray-500">Overall Match</p>
            </div>
            <div>
              <h4 className="font-medium">Matched Keywords</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {matchResult.matchedKeywords.map((kw: string) => (
                  <span key={kw} className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">{kw}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium">Missing Keywords</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {matchResult.missingKeywords.map((kw: string) => (
                  <span key={kw} className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-800">{kw}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium">Recommendations</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {matchResult.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            {selectedResume && (
              <div className="flex justify-end">
                <Link
                  to={`/builder/${selectedResume.id}?jobId=${job.id}`}
                  className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
                >
                  Optimize This Resume
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
}