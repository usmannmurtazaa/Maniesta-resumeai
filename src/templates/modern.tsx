import { ResumePreview } from '@/components/resume/ResumePreview';
import type { Resume } from '@/types/resume.types';

export function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="modern-template">
      <ResumePreview resume={{ ...resume, designSettings: { ...resume.designSettings, fontFamily: 'inter' } }} />
    </div>
  );
}