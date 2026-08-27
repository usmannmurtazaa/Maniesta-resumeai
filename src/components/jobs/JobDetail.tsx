import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobs/jobService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ResumeSelectionModal } from './ResumeSelectionModal';
import { ATSMatchModal } from './ATSMatchModal';
import type { Job } from '@/types/job.types';
import { formatDate } from '@/utils/dateUtils';

export function JobDetail({ job }: { job: Job }) {
  const user = useAuthStore((s) => s.user);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      if (saved) {
        await jobService.unsaveJob(user.uid, job.id);
        setSaved(false);
      } else {
        await jobService.saveJob(user.uid, job.id);
        setSaved(true);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          {job.companyLogo ? (
            <img src={job.companyLogo} alt={`${job.companyName} logo`} className="h-16 w-16 rounded-xl object-cover" />
          ) : (
            <div className="h-16 w-16 rounded-xl bg-gray-100 flex items-center justify-center text-2xl text-gray-400">
              {job.companyName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              {job.featured && <Badge variant="warning">Featured</Badge>}
            </div>
            <p className="text-lg text-gray-500">{job.companyName}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
              <span>{job.location}</span>
              <span>{job.workMode}</span>
              <span>{job.employmentType}</span>
              <span>{job.experienceLevel}</span>
              {job.salary && <span>{job.salary}</span>}
              {job.publishedAt && <span>Published {formatDate(job.publishedAt)}</span>}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full p-2 text-gray-400 hover:text-yellow-500"
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900">Description</h2>
          <p className="mt-2 whitespace-pre-wrap text-gray-700">{job.description}</p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-gray-900">Required Skills</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {job.requiredSkills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Preferred Skills</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {job.preferredSkills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900">Qualifications</h3>
          <ul className="mt-2 list-disc pl-5 text-gray-700">
            {job.qualifications.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-primary-600 px-6 py-2 text-white hover:bg-primary-700 transition-colors"
          >
            Apply Now
          </a>
          <Button variant="outline" onClick={() => setShowATSModal(true)}>
            Check ATS Match
          </Button>
          <Button variant="outline" onClick={() => setShowResumeModal(true)}>
            Optimize My Resume
          </Button>
        </div>
      </div>

      {showResumeModal && <ResumeSelectionModal job={job} onClose={() => setShowResumeModal(false)} />}
      {showATSModal && <ATSMatchModal job={job} onClose={() => setShowATSModal(false)} />}
    </div>
  );
}