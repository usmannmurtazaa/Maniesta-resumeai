import type { JobPreferences, Job } from '@/types/job.types';

/**
 * Calculates a deterministic match score between a user's job preferences
 * and a job posting. The score ranges from 0 to 100.
 */
export function calculateJobMatchScore(
  preferences: JobPreferences | null | undefined,
  job: Job
): number {
  if (!preferences || !job) return 0;

  let score = 0;
  const weights = {
    category: 20,
    location: 15,
    workMode: 15,
    experienceLevel: 15,
    employmentType: 15,
    skills: 20,
  };

  // Category match
  if (preferences.categories?.includes(job.category)) {
    score += weights.category;
  }

  // Location match (fuzzy includes)
  if (
    preferences.locations?.some((loc) => job.location?.toLowerCase().includes(loc.toLowerCase()))
  ) {
    score += weights.location;
  }

  // Work mode match
  if (preferences.workModes?.includes(job.workMode)) {
    score += weights.workMode;
  }

  // Experience level match
  if (preferences.experienceLevels?.includes(job.experienceLevel)) {
    score += weights.experienceLevel;
  }

  // Employment type match
  if (preferences.employmentTypes?.includes(job.employmentType)) {
    score += weights.employmentType;
  }

  // Skills match
  if (preferences.skills && preferences.skills.length > 0) {
    const jobSkills = [...(job.requiredSkills || []), ...(job.preferredSkills || [])];
    const normalizedJobSkills = jobSkills.map((s) => s.trim().toLowerCase());
    const matched = preferences.skills.filter((skill) =>
      normalizedJobSkills.includes(skill.trim().toLowerCase())
    ).length;
    const skillRatio = Math.min(matched / preferences.skills.length, 1);
    score += Math.round(weights.skills * skillRatio);
  }

  // Clamp between 0 and 100
  return Math.max(0, Math.min(score, 100));
}
