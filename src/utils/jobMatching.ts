import type { JobPreferences, Job } from '@/types/job.types';

/**
 * Deterministic job matching score.
 * Returns a number between 0 and 100, higher means better match.
 */
export function calculateJobMatchScore(preferences: JobPreferences, job: Job): number {
  if (!preferences) return 0;
  let score = 0;
  const weights = {
    category: 20,
    location: 15,
    workMode: 15,
    experienceLevel: 15,
    employmentType: 15,
    skills: 20,
  };

  if (preferences.categories?.includes(job.category)) score += weights.category;
  if (preferences.locations?.some((loc) => job.location.toLowerCase().includes(loc.toLowerCase()))) {
    score += weights.location;
  }
  if (preferences.workModes?.includes(job.workMode)) score += weights.workMode;
  if (preferences.experienceLevels?.includes(job.experienceLevel)) score += weights.experienceLevel;
  if (preferences.employmentTypes?.includes(job.employmentType)) score += weights.employmentType;

  if (preferences.skills && preferences.skills.length > 0) {
    const jobSkills = [...job.requiredSkills, ...job.preferredSkills];
    const matched = preferences.skills.filter((skill) =>
      jobSkills.some((js) => js.toLowerCase() === skill.toLowerCase())
    ).length;
    const skillRatio = Math.min(matched / preferences.skills.length, 1);
    score += Math.round(weights.skills * skillRatio);
  }

  return Math.min(score, 100);
}