import { useResumeStore } from '@/store/resumeStore';
import { templates } from '@/templates';

export default function PreviewPanel() {
  const { currentResume } = useResumeStore();
  if (!currentResume) return null;
  const TemplateComponent = templates[currentResume.templateId as keyof typeof templates] || templates.modern;
  return (
    <div className="print-area bg-white shadow rounded p-6">
      <TemplateComponent resume={currentResume} />
    </div>
  );
}