import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { ResumeUpload } from '@/components/resume/ResumeUpload';
import { useNavigate } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import { useToast } from '@/contexts/ToastContext';
import { emptyResumeContent, DEFAULT_SECTION_ORDER, defaultDesignSettings } from '@/utils/resumeDefaults';

interface Props {
  onClose: () => void;
}

export function ResumeUploadModal({ onClose }: Props) {
  const navigate = useNavigate();
  const setResume = useResumeStore((s) => s.setResume);
  const { showToast } = useToast();

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
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Upload Resume</h3>
        <ResumeUpload onParsed={handleParsed} />
      </div>
    </Modal>
  );
}