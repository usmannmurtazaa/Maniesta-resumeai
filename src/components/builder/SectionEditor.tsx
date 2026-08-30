import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AIActionButton } from '@/components/ai/AIActionButton';
import { AISuggestionModal } from '@/components/ai/AISuggestionModal';
import {
  PlusIcon,
  TrashIcon,
  ChevronIcon,
  UserIcon,
  FileTextIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  WrenchIcon,
  FolderIcon,
  AwardIcon,
  GlobeIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon,
} from '@/components/ui/icons';
import { cn } from '@/utils/cn';
import type { AIActionType } from '@/types/ai.types';

type SectionKey =
  | 'personalInfo'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'awards'
  | 'volunteer';

const sectionMeta: Record<SectionKey, { label: string; icon: React.ReactNode }> = {
  personalInfo: { label: 'Personal Information', icon: <UserIcon size={18} /> },
  summary: { label: 'Summary', icon: <FileTextIcon size={18} /> },
  experience: { label: 'Experience', icon: <BriefcaseIcon size={18} /> },
  education: { label: 'Education', icon: <GraduationCapIcon size={18} /> },
  skills: { label: 'Skills', icon: <WrenchIcon size={18} /> },
  projects: { label: 'Projects', icon: <FolderIcon size={18} /> },
  certifications: { label: 'Certifications', icon: <AwardIcon size={18} /> },
  languages: { label: 'Languages', icon: <GlobeIcon size={18} /> },
  awards: { label: 'Awards', icon: <TrophyIcon size={18} /> },
  volunteer: { label: 'Volunteer Experience', icon: <HeartIcon size={18} /> },
};

export default function SectionEditor() {
  const { currentResume, updateContent } = useResumeStore();
  const prefersReducedMotion = useReducedMotion();
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    personalInfo: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    awards: true,
    volunteer: true,
  });

  // AI modal state
  const [aiModal, setAiModal] = useState<{
    originalText: string;
    action: AIActionType;
    target: {
      section: SectionKey;
      field: string;
      id?: string;
    };
  } | null>(null);

  if (!currentResume) return null;
  const content = currentResume.content;

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Open AI modal for a field
  const openAIModal = (section: SectionKey, field: string, originalText: string, id?: string) => {
    setAiModal({
      originalText,
      action: 'improve',
      target: { section, field, id },
    });
  };

  // Handle accepted AI suggestion
  const handleAIAccept = (suggestion: string) => {
    if (!aiModal) return;
    const { section, field, id } = aiModal.target;

    updateContent((c) => {
      if (section === 'summary') {
        c.summary = suggestion;
      } else if (section === 'experience') {
        const exp = c.experience.find((e) => e.id === id);
        if (exp) (exp as any)[field] = suggestion;
      } else if (section === 'projects') {
        const proj = c.projects.find((p) => p.id === id);
        if (proj) (proj as any)[field] = suggestion;
      } else if (section === 'awards') {
        const award = c.awards.find((a) => a.id === id);
        if (award) (award as any)[field] = suggestion;
      } else if (section === 'volunteer') {
        const vol = c.volunteer.find((v) => v.id === id);
        if (vol) (vol as any)[field] = suggestion;
      } else if (section === 'education') {
        const edu = c.education.find((e) => e.id === id);
        if (edu) (edu as any)[field] = suggestion;
      } else if (section === 'certifications') {
        const cert = c.certifications.find((c) => c.id === id);
        if (cert) (cert as any)[field] = suggestion;
      } else if (section === 'skills') {
        const cat = c.skills.find((s) => s.id === id);
        if (cat && field === 'skills') {
          cat.skills = suggestion
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        } else if (cat) {
          (cat as any)[field] = suggestion;
        }
      }
    });

    setAiModal(null);
  };

  // Update functions (unchanged)
  const updatePersonal = (field: string, value: string) => {
    updateContent((c) => {
      c.personalInfo = { ...c.personalInfo, [field]: value };
    });
  };

  const updateSummary = (value: string) => {
    updateContent((c) => {
      c.summary = value;
    });
  };

  const addExperience = () => {
    updateContent((c) => {
      c.experience.push({
        id: crypto.randomUUID(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      });
    });
  };
  const updateExperience = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const exp = c.experience.find((e) => e.id === id);
      if (exp) (exp as any)[field] = value;
    });
  };
  const removeExperience = (id: string) => {
    updateContent((c) => {
      c.experience = c.experience.filter((e) => e.id !== id);
    });
  };

  const addEducation = () => {
    updateContent((c) => {
      c.education.push({
        id: crypto.randomUUID(),
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    });
  };
  const updateEducation = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const edu = c.education.find((e) => e.id === id);
      if (edu) (edu as any)[field] = value;
    });
  };
  const removeEducation = (id: string) => {
    updateContent((c) => {
      c.education = c.education.filter((e) => e.id !== id);
    });
  };

  const addSkillCategory = () => {
    updateContent((c) => {
      c.skills.push({
        id: crypto.randomUUID(),
        category: '',
        skills: [],
      });
    });
  };
  const updateSkillCategory = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const cat = c.skills.find((s) => s.id === id);
      if (cat) (cat as any)[field] = value;
    });
  };
  const removeSkillCategory = (id: string) => {
    updateContent((c) => {
      c.skills = c.skills.filter((s) => s.id !== id);
    });
  };
  const updateSkillList = (id: string, value: string) => {
    updateContent((c) => {
      const cat = c.skills.find((s) => s.id === id);
      if (cat) {
        cat.skills = value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
    });
  };

  const addProject = () => {
    updateContent((c) => {
      c.projects.push({
        id: crypto.randomUUID(),
        name: '',
        role: '',
        description: '',
        technologies: [],
        url: '',
      });
    });
  };
  const updateProject = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const proj = c.projects.find((p) => p.id === id);
      if (proj) (proj as any)[field] = value;
    });
  };
  const removeProject = (id: string) => {
    updateContent((c) => {
      c.projects = c.projects.filter((p) => p.id !== id);
    });
  };

  const addCertification = () => {
    updateContent((c) => {
      c.certifications.push({
        id: crypto.randomUUID(),
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        url: '',
      });
    });
  };
  const updateCertification = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const cert = c.certifications.find((cer) => cer.id === id);
      if (cert) (cert as any)[field] = value;
    });
  };
  const removeCertification = (id: string) => {
    updateContent((c) => {
      c.certifications = c.certifications.filter((cer) => cer.id !== id);
    });
  };

  const addLanguage = () => {
    updateContent((c) => {
      c.languages.push({
        id: crypto.randomUUID(),
        name: '',
        proficiency: '',
      });
    });
  };
  const updateLanguage = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const lang = c.languages.find((l) => l.id === id);
      if (lang) (lang as any)[field] = value;
    });
  };
  const removeLanguage = (id: string) => {
    updateContent((c) => {
      c.languages = c.languages.filter((l) => l.id !== id);
    });
  };

  const addAward = () => {
    updateContent((c) => {
      c.awards.push({
        id: crypto.randomUUID(),
        title: '',
        issuer: '',
        date: '',
        description: '',
      });
    });
  };
  const updateAward = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const award = c.awards.find((a) => a.id === id);
      if (award) (award as any)[field] = value;
    });
  };
  const removeAward = (id: string) => {
    updateContent((c) => {
      c.awards = c.awards.filter((a) => a.id !== id);
    });
  };

  const addVolunteer = () => {
    updateContent((c) => {
      c.volunteer.push({
        id: crypto.randomUUID(),
        organization: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    });
  };
  const updateVolunteer = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const vol = c.volunteer.find((v) => v.id === id);
      if (vol) (vol as any)[field] = value;
    });
  };
  const removeVolunteer = (id: string) => {
    updateContent((c) => {
      c.volunteer = c.volunteer.filter((v) => v.id !== id);
    });
  };

  const renderSectionHeader = (key: SectionKey, title: string, onAdd?: () => void) => {
    const isOpen = openSections[key];
    return (
      <div className="flex items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-4">
        <button
          onClick={() => toggleSection(key)}
          className="group flex flex-1 items-center gap-2 text-left"
          aria-expanded={isOpen}
        >
          <ChevronIcon
            size={18}
            className={cn(
              'text-gray-400 transition-transform duration-200 group-hover:text-primary-500',
              isOpen ? 'rotate-90' : ''
            )}
          />
          <span className="font-semibold text-gray-900">{title}</span>
        </button>
        {onAdd && (
          <Button size="sm" variant="soft" onClick={onAdd} className="shrink-0 group">
            <PlusIcon size={16} className="mr-1 transition-transform group-hover:rotate-90" />
            Add
          </Button>
        )}
      </div>
    );
  };

  const renderAnimatedContainer = (key: SectionKey, children: React.ReactNode) => (
    <AnimatePresence initial={false}>
      {openSections[key] && (
        <motion.div
          key={`content-${key}`}
          initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="px-4 pb-5 sm:px-5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Helper component for AI button next to textareas
  const AIField = ({
    value,
    onChange,
    onAI,
    label,
    rows = 4,
    isTextarea = true,
  }: {
    value: string;
    onChange: (val: string) => void;
    onAI: () => void;
    label: string;
    rows?: number;
    isTextarea?: boolean;
  }) => (
    <div className="relative">
      {isTextarea ? (
        <Textarea
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
        />
      ) : (
        <Input label={label} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      <button
        onClick={onAI}
        className="absolute right-2 top-9 text-gray-400 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
        aria-label={`AI improve ${label}`}
        title="Improve with AI"
      >
        <SparklesIcon size={16} />
      </button>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Personal Information */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('personalInfo', sectionMeta.personalInfo.label)}
        {renderAnimatedContainer(
          'personalInfo',
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={content.personalInfo.fullName}
              onChange={(e) => updatePersonal('fullName', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={content.personalInfo.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
            />
            <Input
              label="Phone"
              value={content.personalInfo.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
            />
            <Input
              label="Location"
              value={content.personalInfo.location}
              onChange={(e) => updatePersonal('location', e.target.value)}
            />
            <Input
              label="LinkedIn"
              value={content.personalInfo.linkedin || ''}
              onChange={(e) => updatePersonal('linkedin', e.target.value)}
            />
            <Input
              label="Website"
              value={content.personalInfo.website || ''}
              onChange={(e) => updatePersonal('website', e.target.value)}
            />
            <Input
              label="Title"
              value={content.personalInfo.title || ''}
              onChange={(e) => updatePersonal('title', e.target.value)}
            />
          </div>
        )}
      </Card>

      {/* Summary with AI */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('summary', sectionMeta.summary.label)}
        {renderAnimatedContainer(
          'summary',
          <AIField
            label="Professional Summary"
            value={content.summary}
            onChange={updateSummary}
            onAI={() => openAIModal('summary', 'summary', content.summary)}
            rows={4}
          />
        )}
      </Card>

      {/* Experience */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('experience', sectionMeta.experience.label, addExperience)}
        {renderAnimatedContainer(
          'experience',
          <div className="space-y-4">
            <AnimatePresence>
              {content.experience.map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                    <Input
                      label="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                    <Input
                      label="Location"
                      value={exp.location || ''}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        type="date"
                        value={exp.startDate || ''}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                      <Input
                        label="End Date"
                        type="date"
                        value={exp.endDate || ''}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                  <AIField
                    label="Description"
                    value={exp.description || ''}
                    onChange={(val) => updateExperience(exp.id, 'description', val)}
                    onAI={() =>
                      openAIModal('experience', 'description', exp.description || '', exp.id)
                    }
                    rows={4}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Education */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('education', sectionMeta.education.label, addEducation)}
        {renderAnimatedContainer(
          'education',
          <div className="space-y-4">
            <AnimatePresence>
              {content.education.map((edu) => (
                <motion.div
                  key={edu.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    />
                    <Input
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                    <Input
                      label="Field of Study"
                      value={edu.field || ''}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    />
                    <Input
                      label="Location"
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        type="date"
                        value={edu.startDate || ''}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      />
                      <Input
                        label="End Date"
                        type="date"
                        value={edu.endDate || ''}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                  <AIField
                    label="Description"
                    value={edu.description || ''}
                    onChange={(val) => updateEducation(edu.id, 'description', val)}
                    onAI={() =>
                      openAIModal('education', 'description', edu.description || '', edu.id)
                    }
                    rows={3}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Skills */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('skills', sectionMeta.skills.label, addSkillCategory)}
        {renderAnimatedContainer(
          'skills',
          <div className="space-y-4">
            <AnimatePresence>
              {content.skills.map((cat) => (
                <motion.div
                  key={cat.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <Input
                    label="Category"
                    value={cat.category}
                    onChange={(e) => updateSkillCategory(cat.id, 'category', e.target.value)}
                  />
                  <AIField
                    label="Skills (comma-separated)"
                    value={cat.skills.join(', ')}
                    onChange={(val) => updateSkillList(cat.id, val)}
                    onAI={() => openAIModal('skills', 'skills', cat.skills.join(', '), cat.id)}
                    isTextarea={false}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeSkillCategory(cat.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Projects */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('projects', sectionMeta.projects.label, addProject)}
        {renderAnimatedContainer(
          'projects',
          <div className="space-y-4">
            <AnimatePresence>
              {content.projects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Project Name"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    />
                    <Input
                      label="Role"
                      value={proj.role || ''}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                    />
                  </div>
                  <AIField
                    label="Description"
                    value={proj.description}
                    onChange={(val) => updateProject(proj.id, 'description', val)}
                    onAI={() => openAIModal('projects', 'description', proj.description, proj.id)}
                    rows={4}
                  />
                  <Input
                    label="Technologies (comma-separated)"
                    value={proj.technologies?.join(', ') || ''}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        'technologies',
                        e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                  <Input
                    label="URL"
                    value={proj.url || ''}
                    onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeProject(proj.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Certifications */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('certifications', sectionMeta.certifications.label, addCertification)}
        {renderAnimatedContainer(
          'certifications',
          <div className="space-y-4">
            <AnimatePresence>
              {content.certifications.map((cert) => (
                <motion.div
                  key={cert.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <Input
                    label="Name"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  />
                  <Input
                    label="Issuer"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Date"
                      type="date"
                      value={cert.date || ''}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                    />
                    <Input
                      label="Credential ID"
                      value={cert.credentialId || ''}
                      onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                    />
                  </div>
                  <Input
                    label="URL"
                    value={cert.url || ''}
                    onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeCertification(cert.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Languages */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('languages', sectionMeta.languages.label, addLanguage)}
        {renderAnimatedContainer(
          'languages',
          <div className="space-y-4">
            <AnimatePresence>
              {content.languages.map((lang) => (
                <motion.div
                  key={lang.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Language"
                      value={lang.name}
                      onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                    />
                    <Input
                      label="Proficiency"
                      value={lang.proficiency || ''}
                      onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeLanguage(lang.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Awards */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('awards', sectionMeta.awards.label, addAward)}
        {renderAnimatedContainer(
          'awards',
          <div className="space-y-4">
            <AnimatePresence>
              {content.awards.map((award) => (
                <motion.div
                  key={award.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <Input
                    label="Title"
                    value={award.title}
                    onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                  />
                  <Input
                    label="Issuer"
                    value={award.issuer || ''}
                    onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                  />
                  <Input
                    label="Date"
                    type="date"
                    value={award.date || ''}
                    onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                  />
                  <AIField
                    label="Description"
                    value={award.description || ''}
                    onChange={(val) => updateAward(award.id, 'description', val)}
                    onAI={() =>
                      openAIModal('awards', 'description', award.description || '', award.id)
                    }
                    rows={3}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeAward(award.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* Volunteer */}
      <Card className="overflow-hidden border-white/40 bg-white/70 backdrop-blur-md shadow-soft">
        {renderSectionHeader('volunteer', sectionMeta.volunteer.label, addVolunteer)}
        {renderAnimatedContainer(
          'volunteer',
          <div className="space-y-4">
            <AnimatePresence>
              {content.volunteer.map((vol) => (
                <motion.div
                  key={vol.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Organization"
                      value={vol.organization}
                      onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                    />
                    <Input
                      label="Role"
                      value={vol.role || ''}
                      onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      type="date"
                      value={vol.startDate || ''}
                      onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                    />
                    <Input
                      label="End Date"
                      type="date"
                      value={vol.endDate || ''}
                      onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)}
                    />
                  </div>
                  <AIField
                    label="Description"
                    value={vol.description || ''}
                    onChange={(val) => updateVolunteer(vol.id, 'description', val)}
                    onAI={() =>
                      openAIModal('volunteer', 'description', vol.description || '', vol.id)
                    }
                    rows={3}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeVolunteer(vol.id)}
                  >
                    <TrashIcon size={16} className="mr-1" /> Remove
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>

      {/* AI Modal */}
      {aiModal && (
        <AISuggestionModal
          originalText={aiModal.originalText}
          action={aiModal.action}
          onClose={() => setAiModal(null)}
          onAccept={handleAIAccept}
        />
      )}
    </div>
  );
}
