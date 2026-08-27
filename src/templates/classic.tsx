import { ResumePreview } from '@/components/resume/ResumePreview';
import type { Resume } from '@/types/resume.types';

export function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="classic-template">
      <ResumePreview resume={{ ...resume, designSettings: { ...resume.designSettings, fontFamily: 'serif' } }} />
    </div>
  );
}