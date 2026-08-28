import { ResumePreview } from '@/components/resume/ResumePreview';
import type { Resume } from '@/types/resume.types';

export function ModernTemplate({ resume }: { resume: Resume }) {
  return <ResumePreview resume={resume} />;
}