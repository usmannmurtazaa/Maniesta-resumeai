import { describe, it, expect } from 'vitest';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import { emptyResumeContent } from '@/utils/resumeDefaults';

describe('ATS Engine', () => {
  it('returns a score between 0 and 100', () => {
    const resume = emptyResumeContent();
    const result = calculateAtsScore(resume);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('gives higher score for complete resume', () => {
    const incomplete = emptyResumeContent();
    const complete = {
      ...incomplete,
      personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        location: 'NYC',
      },
      summary: 'Experienced software engineer...',
      experience: [{ id: '1', company: 'ABC', position: 'Engineer', description: 'Led team...' }],
      education: [{ id: '1', institution: 'MIT', degree: 'BS CS' }],
    };
    const scoreIncomplete = calculateAtsScore(incomplete).score;
    const scoreComplete = calculateAtsScore(complete).score;
    expect(scoreComplete).toBeGreaterThan(scoreIncomplete);
  });
});
