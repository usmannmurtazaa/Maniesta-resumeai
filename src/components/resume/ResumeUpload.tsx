import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/contexts/ToastContext';
import { parseResumeText } from '@/services/parser/parseResume';
import { Spinner } from '@/components/ui/Spinner';

interface ResumeUploadProps {
  onParsed: (content: any) => void;
}

export function ResumeUpload({ onParsed }: ResumeUploadProps) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToast();
  const [parsing, setParsing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      showToast('error', 'Please upload a PDF or DOCX file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'File size must be less than 5MB.');
      return;
    }

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
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {parsing ? (
            <Spinner className="h-8 w-8" />
          ) : (
            <>
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">Click to upload PDF or DOCX</p>
              <p className="text-xs text-gray-500">Max 5MB</p>
            </>
          )}
        </div>
        <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} />
      </label>
    </div>
  );
}

function mapTextToResume(text: string): any {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
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