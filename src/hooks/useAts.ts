import { useCallback, useState } from 'react';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import type { ResumeContent } from '@/types/resume.types';
import type { ATSResult } from '@/types/ats.types';

export function useAts() {
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback((content: ResumeContent, jobDescription?: string) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = calculateAtsScore(content, jobDescription);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ATS analysis failed');
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, analyze };
}
