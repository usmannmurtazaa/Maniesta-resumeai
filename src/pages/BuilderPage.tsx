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
import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { SaveIcon, PrinterIcon, ArrowLeftIcon, ATSIcon } from '@/components/ui/icons';
import { emptyResumeContent, DEFAULT_SECTION_ORDER, defaultDesignSettings } from '@/utils/resumeDefaults';

const TEMPLATES = ['modern', 'classic', 'creative', 'tech', 'elegant'];

export default function BuilderPage() {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const navigate = useNavigate();
  const { currentResume, setResume, isDirty, setDirty } = useResumeStore();
  const { isMobilePreviewOpen, toggleMobilePreview } = useUIStore();
  const { showToast } = useToast();

  // Initialize resume immediately (no Firestore read for new resume)
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
    if (currentResume?.content && currentResume.jobDescription) {
      const result = calculateAtsScore(currentResume.content, currentResume.jobDescription);
      if (currentResume.atsScore !== result.score) {
        const updated = { ...currentResume, atsScore: result.score };
        setResume(updated);
        setDirty(true);
      }
    }
  }, [currentResume, setResume, setDirty]);

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

  const handleTemplateChange = (templateId: string) => {
    if (currentResume) {
      const updated = { ...currentResume, templateId };
      setResume(updated);
      setDirty(true);
    }
  };

  if (!currentResume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Builder Header */}
      <header className="border-b border-white/40 bg-white/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <BackButton label="My Resumes" to="/dashboard" />
            <h1 className="hidden md:block text-lg font-semibold text-gray-900">
              {currentResume.title || 'Untitled Resume'}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {currentResume.atsScore !== null && currentResume.atsScore !== undefined && (
              <Badge variant="accent" className="hidden sm:inline-flex">
                <ATSIcon size={14} className="mr-1" />
                ATS: {currentResume.atsScore}
              </Badge>
            )}

            <Select
              value={currentResume.templateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-36"
              aria-label="Select template"
            >
              {TEMPLATES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </Select>

            <Button variant="outline" size="sm" onClick={printResume} className="hidden sm:inline-flex">
              <PrinterIcon size={16} className="mr-1" />
              Print
            </Button>

            <Button size="sm" onClick={flush} disabled={!isDirty}>
              <SaveIcon size={16} className="mr-1" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main builder area */}
      <div className="flex flex-1 overflow-hidden">
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
      </div>

      {/* Mobile toggle button */}
      <button
        onClick={toggleMobilePreview}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary-600 p-4 text-white shadow-lg md:hidden"
        aria-label="Toggle preview"
      >
        {isMobilePreviewOpen ? 'Edit' : 'Preview'}
      </button>
    </div>
  );
}