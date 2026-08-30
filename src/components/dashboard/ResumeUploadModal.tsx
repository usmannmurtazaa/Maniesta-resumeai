import { motion, useReducedMotion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { ResumeUpload } from '@/components/resume/ResumeUpload';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import { useToast } from '@/contexts/ToastContext';
import { UploadIcon } from '@/components/ui/icons';
import {
  emptyResumeContent,
  DEFAULT_SECTION_ORDER,
  defaultDesignSettings,
} from '@/utils/resumeDefaults';

interface Props {
  onClose: () => void;
}

export function ResumeUploadModal({ onClose }: Props) {
  const navigate = useNavigate();
  const setResume = useResumeStore((s) => s.setResume);
  const { showToast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const handleParsed = (content: any) => {
    const resume: any = {
      id: '',
      userId: '',
      title: 'Imported Resume',
      templateId: 'modern',
      content,
      sectionOrder: DEFAULT_SECTION_ORDER,
      designSettings: defaultDesignSettings(),
      atsScore: null,
      jobDescription: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setResume(resume);
    showToast('success', 'Resume imported. Review and save.');
    navigate('/builder');
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 shadow-sm">
            <UploadIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
            <p className="mt-1 text-sm text-gray-500">
              Import an existing PDF or DOCX. We&apos;ll extract the text and let you review it.
            </p>
          </div>
        </div>

        <ResumeUpload onParsed={handleParsed} />
      </motion.div>
    </Modal>
  );
}
