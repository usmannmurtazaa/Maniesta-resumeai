import { ResumeContent } from '@/types/resume.types';
import { ATSResult, ATSBreakdown } from '@/types/ats.types';

const ACTION_VERBS = [
  'led',
  'managed',
  'developed',
  'created',
  'implemented',
  'designed',
  'launched',
  'increased',
  'decreased',
  'improved',
  'optimized',
  'built',
  'delivered',
  'coordinated',
  'achieved',
  'generated',
  'reduced',
  'negotiated',
  'trained',
  'mentored',
  'streamlined',
  'automated',
  'engineered',
  'architected',
  'executed',
  'analyzed',
  'resolved',
  'spearheaded',
];

const SOFT_SKILLS = [
  'communication',
  'leadership',
  'teamwork',
  'problem solving',
  'adaptability',
  'time management',
];
const HARD_SKILL_PATTERNS = [
  /python/i,
  /javascript/i,
  /react/i,
  /node/i,
  /sql/i,
  /aws/i,
  /docker/i,
  /machine learning/i,
  /data analysis/i,
];

function scoreContactInfo(personalInfo: ResumeContent['personalInfo']): number {
  const fields = [
    personalInfo.fullName,
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
  ];
  const filled = fields.filter((field) => field && field.trim().length > 0).length;
  return Math.round((filled / fields.length) * 100);
}

function scoreSectionCompleteness(resume: ResumeContent): number {
  const sections = [
    resume.summary.trim().length,
    resume.experience.length,
    resume.education.length,
    resume.skills.length,
    resume.projects.length,
    resume.certifications.length,
    resume.languages.length,
  ];
  const filled = sections.filter((value) => value > 0).length;
  return Math.round((filled / sections.length) * 100);
}

function scoreActionVerbs(resume: ResumeContent): number {
  const text = [
    resume.summary,
    ...resume.experience.flatMap((e) => [e.description, ...(e.achievements || [])]),
  ]
    .join(' ')
    .toLowerCase();
  const found = ACTION_VERBS.filter((verb) => text.includes(verb)).length;
  return Math.min(100, Math.round((found / ACTION_VERBS.length) * 100));
}

function scoreQuantification(resume: ResumeContent): number {
  const text = [
    resume.summary,
    ...resume.experience.flatMap((e) => [e.description, ...(e.achievements || [])]),
  ].join(' ');
  const hasNumbers =
    /\d+%|\d+\s*(users|customers|team|people|dollars|revenue|years|months|projects)/i.test(text);
  return hasNumbers ? 100 : 20;
}

function scoreReadability(resume: ResumeContent): number {
  const text = resume.summary + ' ' + resume.experience.map((e) => e.description).join(' ');
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  const avgWordLength = words.reduce((acc, w) => acc + w.length, 0) / words.length;
  const sentenceCount = (text.match(/[.!?]+/g) || []).length + 1;
  const avgSentenceLength = words.length / sentenceCount;
  const score = 100 - (avgWordLength > 6 ? 10 : 0) - (avgSentenceLength > 20 ? 10 : 0);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreSkills(resume: ResumeContent): number {
  const allSkills = resume.skills.flatMap((s) => s.skills);
  const hard = allSkills.filter((s) => HARD_SKILL_PATTERNS.some((p) => p.test(s))).length;
  const soft = allSkills.filter((s) => SOFT_SKILLS.includes(s.toLowerCase())).length;
  return Math.min(100, hard * 20 + soft * 10);
}

function scoreGenericKeywords(resume: ResumeContent): number {
  const text = JSON.stringify(resume).toLowerCase();
  const keywordList = [
    'react',
    'javascript',
    'typescript',
    'node',
    'python',
    'sql',
    'aws',
    'docker',
    'leadership',
    'communication',
  ];
  const found = keywordList.filter((k) => text.includes(k)).length;
  return Math.round((found / keywordList.length) * 100);
}

function matchKeywords(
  resume: ResumeContent,
  jobDescription: string
): { matched: string[]; missing: string[] } {
  const jobText = jobDescription.toLowerCase();
  const resumeText = JSON.stringify(resume).toLowerCase();
  const keywords = extractKeywords(jobText);
  const matched = keywords.filter((k) => resumeText.includes(k));
  const missing = keywords.filter((k) => !resumeText.includes(k));
  return { matched, missing };
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'and',
    'the',
    'for',
    'with',
    'you',
    'will',
    'are',
    'our',
    'from',
    'that',
    'this',
    'have',
    'has',
    'not',
    'but',
    'all',
    'any',
    'can',
    'may',
    'should',
    'would',
    'could',
    'about',
    'into',
    'over',
    'after',
    'before',
    'between',
    'under',
    'again',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'what',
    'who',
    'whom',
    'which',
    'such',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'only',
    'own',
    'same',
    'than',
    'too',
    'very',
    'just',
    'because',
    'while',
    'although',
    'though',
    'even',
    'if',
    'unless',
    'until',
    'when',
    'whenever',
    'wherever',
    'whereas',
    'whereby',
    'whereupon',
    'wherewithal',
    'thereby',
    'therefore',
    'therein',
    'thereof',
    'thereon',
    'thereto',
    'therewith',
    'thereupon',
    'therewithal',
  ]);
  const words = text.match(/\b[a-zA-Z][a-zA-Z0-9+#.]{2,}\b/g) || [];
  const filtered = words.filter((w) => !stopWords.has(w) && w.length > 2);
  return Array.from(new Set(filtered)).slice(0, 50);
}

function generateRecommendations(breakdown: ATSBreakdown, missingKeywords: string[]): string[] {
  const recs: string[] = [];
  if (breakdown.contactInfo < 80)
    recs.push('Add complete contact information (name, email, phone, location).');
  if (breakdown.sectionCompleteness < 70)
    recs.push('Fill in more resume sections like Summary, Experience, Education, Skills.');
  if (breakdown.actionVerbs < 50) recs.push('Use more action verbs to describe your achievements.');
  if (breakdown.quantification < 50)
    recs.push('Add quantifiable metrics to your experience (e.g., increased X by Y%).');
  if (missingKeywords.length > 0)
    recs.push(`Consider adding relevant keywords: ${missingKeywords.slice(0, 5).join(', ')}`);
  if (breakdown.readability < 60)
    recs.push('Improve readability by shortening sentences and using simple language.');
  if (breakdown.skills < 50) recs.push('Add more skills relevant to your target role.');
  return recs;
}

function generateWarnings(resume: ResumeContent): string[] {
  const warnings: string[] = [];
  if (!resume.personalInfo.fullName) warnings.push('Missing full name.');
  if (!resume.personalInfo.email) warnings.push('Missing email address.');
  if (!resume.personalInfo.phone) warnings.push('Missing phone number.');
  if (resume.experience.length === 0) warnings.push('No work experience listed.');
  if (resume.education.length === 0) warnings.push('No education listed.');
  if (resume.skills.length === 0) warnings.push('No skills listed.');
  return warnings;
}

export function calculateAtsScore(resume: ResumeContent, jobDescription?: string): ATSResult {
  const breakdown: ATSBreakdown = {
    contactInfo: scoreContactInfo(resume.personalInfo),
    sectionCompleteness: scoreSectionCompleteness(resume),
    actionVerbs: scoreActionVerbs(resume),
    quantification: scoreQuantification(resume),
    keywords: 0,
    readability: scoreReadability(resume),
    skills: scoreSkills(resume),
  };

  if (jobDescription) {
    const { matched, missing } = matchKeywords(resume, jobDescription);
    breakdown.keywords = Math.round((matched.length / (matched.length + missing.length)) * 100);
    breakdown.jobMatch = breakdown.keywords;
    const overall = Math.round(
      breakdown.contactInfo * 0.1 +
        breakdown.sectionCompleteness * 0.2 +
        breakdown.actionVerbs * 0.15 +
        breakdown.quantification * 0.15 +
        breakdown.keywords * 0.2 +
        breakdown.readability * 0.1 +
        breakdown.skills * 0.1
    );
    return {
      score: Math.min(100, overall),
      breakdown,
      matchedKeywords: matched,
      missingKeywords: missing,
      recommendations: generateRecommendations(breakdown, missing),
      warnings: generateWarnings(resume),
    };
  }

  breakdown.keywords = scoreGenericKeywords(resume);
  const overall = Math.round(
    breakdown.contactInfo * 0.1 +
      breakdown.sectionCompleteness * 0.2 +
      breakdown.actionVerbs * 0.15 +
      breakdown.quantification * 0.15 +
      breakdown.keywords * 0.2 +
      breakdown.readability * 0.1 +
      breakdown.skills * 0.1
  );
  return {
    score: Math.min(100, overall),
    breakdown,
    matchedKeywords: [],
    missingKeywords: [],
    recommendations: generateRecommendations(breakdown, []),
    warnings: generateWarnings(resume),
  };
}
