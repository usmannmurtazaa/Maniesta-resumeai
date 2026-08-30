import { describe, it, expect } from 'vitest';
import { calculateJobMatchScore } from '@/services/jobs/jobMatching';

describe('Job matching', () => {
  it('returns high score for matching preferences', () => {
    const prefs = { categories: ['Engineering'], workModes: ['remote'], skills: ['React'] };
    const job = {
      category: 'Engineering',
      workMode: 'remote',
      requiredSkills: ['React'],
      preferredSkills: [],
    };
    const score = calculateJobMatchScore(prefs as any, job as any);
    expect(score).toBeGreaterThan(2);
  });

  it('returns low score for non-matching', () => {
    const prefs = { categories: ['Design'] };
    const job = { category: 'Engineering' };
    const score = calculateJobMatchScore(prefs as any, job as any);
    expect(score).toBeLessThan(1);
  });
});
