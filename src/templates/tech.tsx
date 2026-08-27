import { ResumePreview } from '@/components/resume/ResumePreview';
import type { Resume } from '@/types/resume.types';

export function TechTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="tech-template">
      <ResumePreview resume={{ ...resume, designSettings: { ...resume.designSettings, fontFamily: 'mono' } }} />
    </div>
  );
}