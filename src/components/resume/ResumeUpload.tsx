import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/contexts/ToastContext';
import { parseResumeText } from '@/services/parser/parseResume';
import { Spinner } from '@/components/ui/Spinner';
import { UploadIcon, CheckCircleIcon, FileTextIcon } from '@/components/ui/icons';
import { cn } from '@/utils/cn';

interface ResumeUploadProps {
  onParsed: (content: any) => void;
}

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function ResumeUpload({ onParsed }: ResumeUploadProps) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToast();
  const [parsing, setParsing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleFiles = useCallback(
    async (file: File | undefined | null) => {
      if (!file) return;

      if (!ACCEPTED_TYPES.includes(file.type)) {
        showToast('error', 'Please upload a PDF or DOCX file.');
        return;
      }

      if (file.size > MAX_SIZE) {
        showToast('error', 'File size must be less than 5MB.');
        return;
      }

      setFileName(file.name);
      setParsing(true);

      try {
        const text = await parseResumeText(file);
        const content = mapTextToResume(text);
        onParsed(content);
        showToast('success', 'Resume parsed successfully');
      } catch (error) {
        console.error(error);
        showToast('error', 'Failed to parse resume. Please try again.');
      } finally {
        setParsing(false);
        if (inputRef.current) inputRef.current.value = '';
        setTimeout(() => setFileName(null), 3000);
      }
    },
    [onParsed, showToast]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFiles(file);
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx"
        onChange={(e) => handleFiles(e.target.files?.[0])}
      />

      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
        className={cn(
          'group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500',
          dragActive
            ? 'border-primary-500 bg-primary-50/70 shadow-glass'
            : 'border-gray-300 bg-white/50 hover:border-primary-400 hover:bg-white/80'
        )}
        aria-label="Upload resume"
      >
        <AnimatePresence mode="wait">
          {parsing ? (
            <motion.div
              key="parsing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Spinner size="lg" />
              <p className="mt-4 text-sm font-medium text-gray-700">
                Parsing {fileName || 'your resume'}...
              </p>
            </motion.div>
          ) : fileName ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <CheckCircleIcon size={48} className="text-green-500" />
              <p className="mt-4 text-sm font-medium text-gray-900">{fileName}</p>
              <p className="mt-1 text-xs text-gray-500">Click to upload another file</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <motion.span
                animate={dragActive && !prefersReducedMotion ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 0.6, repeat: dragActive ? Infinity : 0 }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 shadow-soft"
              >
                <UploadIcon size={32} />
              </motion.span>
              <p className="mt-4 text-base font-semibold text-gray-900">Drag & drop your resume</p>
              <p className="mt-1 text-sm text-gray-500">
                or <span className="text-primary-600 font-medium">browse files</span>
              </p>
              <p className="mt-3 text-xs text-gray-400">PDF or DOCX up to 5MB</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative corner icon */}
        <div className="pointer-events-none absolute right-4 top-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <FileTextIcon size={20} className="text-gray-300" />
        </div>
      </motion.button>
    </div>
  );
}

function mapTextToResume(text: string): any {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const content: any = {
    personalInfo: {
      fullName: lines[0] || '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    volunteer: [],
    customSections: [],
  };

  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  for (const line of lines) {
    if (emailRegex.test(line)) content.personalInfo.email = line.match(emailRegex)![0];
    if (phoneRegex.test(line)) content.personalInfo.phone = line.match(phoneRegex)![0];
  }

  if (lines.length > 3) {
    content.summary = lines.slice(1, 3).join(' ');
  }

  return content;
}
