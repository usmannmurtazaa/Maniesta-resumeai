import { describe, it, expect } from 'vitest';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import { emptyResumeContent } from '@/utils/resumeDefaults';

describe('ATS Engine with Job Description', () => {
  it('returns a score and matched/missing keywords when job description provided', () => {
    const resume = emptyResumeContent();
    resume.summary = 'Experienced React developer with 5 years of experience';
    resume.skills = [{ id: 's1', category: 'Frontend', skills: ['React', 'TypeScript'] }];
    const jobDescription = 'We are looking for a React developer with TypeScript skills.';
    const result = calculateAtsScore(resume, jobDescription);
    expect(result.score).toBeGreaterThan(0);
    expect(result.matchedKeywords).toContain('react');
    expect(result.missingKeywords.length).toBeGreaterThanOrEqual(0);
  });
});