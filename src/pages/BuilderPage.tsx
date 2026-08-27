import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import { useUIStore } from '@/store/uiStore';
import { jobService } from '@/services/jobs/jobService';
import { resumeService } from '@/services/firebase/firestore';
import { calculateAtsScore } from '@/services/ats/atsEngine';
import { useAutosave } from '@/hooks/useAutosave';
import { useToast } from '@/contexts/ToastContext';
import { printResume } from '@/services/pdf/printUtils';
import EditorPanel from '@/components/builder/EditorPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';
import { Button } from '@/components/ui/Button';
import { SaveIcon, PrinterIcon } from '@/components/ui/icons';
import { emptyResumeContent, DEFAULT_SECTION_ORDER, defaultDesignSettings } from '@/utils/resumeDefaults';

export default function BuilderPage() {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const navigate = useNavigate();
  const { currentResume, setResume, isDirty, setDirty } = useResumeStore();
  const { isMobilePreviewOpen, toggleMobilePreview } = useUIStore();
  const { showToast } = useToast();

  // Load or create resume
  useEffect(() => {
    if (resumeId) {
      resumeService.getResume(resumeId).then((resume) => {
        if (resume) setResume(resume);
      });
    } else {
      const newResume: any = {
        id: '',
        userId: '',
        title: 'Untitled Resume',
        templateId: 'modern',
        content: emptyResumeContent(),
        sectionOrder: DEFAULT_SECTION_ORDER,
        designSettings: defaultDesignSettings(),
        atsScore: null,
        jobDescription: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setResume(newResume);
    }
  }, [resumeId, setResume]);

  // Load job description if jobId present
  useEffect(() => {
    if (jobId && currentResume) {
      jobService.getJob(jobId).then((job) => {
        if (job && currentResume.jobDescription !== job.description) {
          const updated = { ...currentResume, jobDescription: job.description };
          setResume(updated);
          setDirty(true);
        }
      });
    }
  }, [jobId, currentResume, setResume, setDirty]);

  // Recalculate ATS score when content or jobDescription changes
  useEffect(() => {
  if (jobId && currentResume) {
    jobService.getJob(jobId).then((job) => {
      if (job && currentResume.jobDescription !== job.description) {
        const updated = { ...currentResume, jobDescription: job.description };
        setResume(updated);
        setDirty(true);
      }
    });
  }
}, [jobId, currentResume, setResume, setDirty]);

  const handleSave = async (data: any) => {
    if (!currentResume) return;
    if (!currentResume.id) {
      const newResume = await resumeService.createResume(currentResume);
      setResume(newResume);
      navigate(`/builder/${newResume.id}`, { replace: true });
      showToast('success', 'Resume created');
    } else {
      await resumeService.updateResume(currentResume.id, currentResume);
      showToast('success', 'Resume saved');
    }
  };

  const { save, flush } = useAutosave({
    onSave: handleSave,
    enabled: currentResume !== null,
  });

  useEffect(() => {
    if (currentResume && isDirty) {
      save(currentResume);
    }
  }, [currentResume, isDirty, save]);

  if (!currentResume) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Editor Panel */}
      <div
        className={`editor-panel w-full md:w-1/2 lg:w-2/5 border-r border-gray-200 overflow-y-auto bg-white ${
          isMobilePreviewOpen ? 'hidden md:block' : 'block'
        }`}
      >
        <EditorPanel />
      </div>
      {/* Preview Panel */}
      <div
        className={`preview-panel w-full md:w-1/2 lg:w-3/5 bg-gray-100 overflow-y-auto p-6 ${
          isMobilePreviewOpen ? 'block' : 'hidden md:block'
        }`}
      >
        <PreviewPanel />
      </div>
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobilePreview}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary-600 p-4 text-white shadow-lg md:hidden"
        aria-label="Toggle preview"
      >
        {isMobilePreviewOpen ? 'Edit' : 'Preview'}
      </button>
      {/* Manual save button */}
      <button
        onClick={flush}
        className="fixed bottom-4 left-4 z-50 rounded-full bg-green-600 p-4 text-white shadow-lg md:hidden"
        aria-label="Save now"
      >
        <SaveIcon size={20} />
      </button>
      {/* Print button */}
      <button
        onClick={printResume}
        className="fixed bottom-4 left-24 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg md:hidden"
        aria-label="Print resume"
      >
        <PrinterIcon size={20} />
      </button>
    </div>
  );
}