import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { jobService } from '@/services/jobs/jobService';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ResumeSelectionModal } from './ResumeSelectionModal';
import { ATSMatchModal } from './ATSMatchModal';
import {
  BookmarkIcon,
  ExternalLinkIcon,
  ATSIcon,
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
} from '@/components/ui/icons';
import type { Job } from '@/types/job.types';
import { formatDate } from '@/utils/dateUtils';

export function JobDetail({ job }: { job: Job }) {
  const user = useAuthStore((s) => s.user);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <Card className="overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-glass">
        {/* Header */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={`${job.companyName} logo`}
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-black/5 shadow-soft"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-400 text-2xl font-bold text-white shadow-soft">
                  {job.companyName.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  {job.featured && <Badge variant="warning">Featured</Badge>}
                </div>
                <p className="mt-1 text-lg text-gray-600">{job.companyName}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPinIcon size={16} className="text-gray-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <BriefcaseIcon size={16} className="text-gray-400" />
                    {job.workMode}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon size={16} className="text-gray-400" />
                    {job.employmentType}
                  </span>
                  <span className="flex items-center gap-1">
                    <SparklesIcon size={16} className="text-gray-400" />
                    {job.experienceLevel}
                  </span>
                  {job.salary && <span className="font-medium text-gray-700">{job.salary}</span>}
                  {job.publishedAt && (
                    <span className="flex items-center gap-1">
                      <CalendarIcon size={16} className="text-gray-400" />
                      Published {formatDate(job.publishedAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <motion.button
              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                saved
                  ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
              }`}
              aria-label={saved ? 'Unsave job' : 'Save job'}
            >
              <BookmarkIcon size={18} className={saved ? 'text-yellow-500' : 'text-gray-400'} />
              {saved ? 'Saved' : 'Save'}
            </motion.button>
          </div>
        </div>

        {/* Content sections */}
        <div className="border-t border-gray-100 px-6 py-8 sm:px-8">
          <div className="space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-700">{job.description}</p>
            </section>

            {/* Skills */}
            <div className="grid gap-8 md:grid-cols-2">
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="info">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="font-semibold text-gray-900 mb-3">Preferred Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.preferredSkills.map((skill) => (
                    <Badge key={skill} variant="accent">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>

            {/* Qualifications */}
            <section>
              <h3 className="font-semibold text-gray-900 mb-3">Qualifications</h3>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {job.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:shadow-glass focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Apply Now
                <ExternalLinkIcon
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <Button variant="outline" onClick={() => setShowATSModal(true)}>
                <ATSIcon size={16} className="mr-2" />
                Check ATS Match
              </Button>
              <Button variant="outline" onClick={() => setShowResumeModal(true)}>
                <SparklesIcon size={16} className="mr-2" />
                Optimize My Resume
              </Button>
            </div>
            {job.deadline && (
              <p className="flex items-center gap-1 text-sm text-gray-500">
                <CalendarIcon size={16} />
                Deadline: {formatDate(job.deadline)}
              </p>
            )}
          </div>
        </div>
      </Card>

      {showResumeModal && (
        <ResumeSelectionModal job={job} onClose={() => setShowResumeModal(false)} />
      )}
      {showATSModal && <ATSMatchModal job={job} onClose={() => setShowATSModal(false)} />}
    </motion.div>
  );
}
