import { ResumePreview } from '@/components/resume/ResumePreview';
import type { Resume } from '@/types/resume.types';

export function CreativeTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="creative-template">
      <ResumePreview resume={{ ...resume, designSettings: { ...resume.designSettings, fontFamily: 'montserrat' } }} />
    </div>
  );
}