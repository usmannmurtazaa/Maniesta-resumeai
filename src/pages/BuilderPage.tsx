import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
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
import { SaveIcon, PrinterIcon, ATSIcon } from '@/components/ui/icons';
import {
  emptyResumeContent,
  DEFAULT_SECTION_ORDER,
  defaultDesignSettings,
} from '@/utils/resumeDefaults';

const TEMPLATES = ['modern', 'classic', 'creative', 'tech', 'elegant'];

export default function BuilderPage() {
  const { resumeId } = useParams<{ resumeId?: string }>();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { currentResume, setResume, isDirty, setDirty } = useResumeStore();
  const { isMobilePreviewOpen, toggleMobilePreview } = useUIStore();
  const { showToast } = useToast();

  const [manualSaving, setManualSaving] = useState(false);
  const savingRef = useRef(false); // prevent concurrent saves

  // Initialize resume immediately (no Firestore read for new resume)
  useEffect(() => {
    if (resumeId) {
      resumeService.getResume(resumeId).then((resume) => {
        if (resume) setResume(resume);
      });
    } else {
      const newResume: any = {
        id: '',
        userId: user?.uid || '',
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
  }, [resumeId, user?.uid, setResume]);

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
    if (!currentResume || savingRef.current) return; // guard against re-entry
    savingRef.current = true;
    try {
      if (!currentResume.id) {
        const newResume = await resumeService.createResume(currentResume);
        setResume(newResume);
        navigate(`/builder/${newResume.id}`, { replace: true });
        showToast('success', 'Resume created');
      } else {
        await resumeService.updateResume(currentResume.id, currentResume);
        showToast('success', 'Resume saved');
      }
      setDirty(false);
    } catch (error) {
      console.error('Save error:', error);
      showToast('error', 'Failed to save resume');
    } finally {
      savingRef.current = false;
    }
  };

  const { save, flush } = useAutosave({
    onSave: handleSave,
    enabled: currentResume !== null,
  });

  // Autosave when dirty (only if manual save is not active)
  useEffect(() => {
    if (currentResume && isDirty && !savingRef.current) {
      save(currentResume);
    }
  }, [currentResume, isDirty, save]);

  const handleManualSave = async () => {
    if (!currentResume || manualSaving || savingRef.current) return;
    setManualSaving(true);
    try {
      await handleSave(currentResume);
    } finally {
      setManualSaving(false);
    }
  };

  const handleTemplateChange = (templateId: string) => {
    if (currentResume) {
      const updated = { ...currentResume, templateId };
      setResume(updated);
      setDirty(true);
    }
  };

  if (!currentResume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Builder Header */}
      <header className="border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 min-w-0">
            <BackButton label="My Resumes" to="/dashboard" />
            <h1 className="hidden md:block text-lg font-semibold text-gray-900 truncate">
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
              className="w-32 sm:w-36"
              aria-label="Select template"
            >
              {TEMPLATES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={printResume}
              className="hidden sm:inline-flex"
            >
              <PrinterIcon size={16} className="mr-1" />
              Print
            </Button>

            <Button
              size="sm"
              onClick={handleManualSave}
              disabled={manualSaving || savingRef.current || !isDirty}
              loading={manualSaving}
            >
              <SaveIcon size={16} className="mr-1" />
              {manualSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main builder area */}
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`editor-panel w-full md:w-1/2 lg:w-2/5 border-r border-gray-200 overflow-y-auto bg-white ${
            isMobilePreviewOpen ? 'hidden md:block' : 'block'
          }`}
        >
          <EditorPanel />
        </div>
        <div
          className={`preview-panel w-full md:w-1/2 lg:w-3/5 bg-gray-100 overflow-y-auto p-6 ${
            isMobilePreviewOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <PreviewPanel />
        </div>
      </div>

      {/* Mobile toggle (single) */}
      <button
        onClick={toggleMobilePreview}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-primary-600 px-6 py-3 text-white shadow-lg md:hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Toggle preview"
      >
        {isMobilePreviewOpen ? 'Edit' : 'Preview'}
      </button>
    </div>
  );
}
