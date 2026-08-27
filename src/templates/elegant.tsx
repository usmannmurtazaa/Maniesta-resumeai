import { ResumePreview } from '@/components/resume/ResumePreview';
import type { Resume } from '@/types/resume.types';

export function ElegantTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="elegant-template">
      <ResumePreview resume={{ ...resume, designSettings: { ...resume.designSettings, fontFamily: 'serif', spacing: 'relaxed' } }} />
    </div>
  );
}