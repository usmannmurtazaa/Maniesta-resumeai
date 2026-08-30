import { ResumePreview } from '@/components/resume/ResumePreview';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { resumeService } from '@/services/firebase/firestore';

export function ResumeViewer() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    if (resumeId) {
      resumeService.getResume(resumeId).then(setResume);
    }
  }, [resumeId]);

  if (!resume) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <ResumePreview resume={resume} />
    </div>
  );
}
