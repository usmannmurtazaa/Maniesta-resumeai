import { useResumeStore } from '@/store/resumeStore';
import type { Resume } from '@/types/resume.types';

export function ResumePreview({ resume }: { resume: Resume }) {
  const { designSettings } = resume;
  const { content } = resume;

  const fontClass = {
    inter: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
    lato: 'font-sans', // assume default
    montserrat: 'font-sans',
  }[designSettings.fontFamily] || 'font-sans';

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[designSettings.fontSize] || 'text-base';

  const spacingClass = {
    compact: 'space-y-2',
    normal: 'space-y-4',
    relaxed: 'space-y-6',
  }[designSettings.spacing] || 'space-y-4';

  return (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${fontClass} ${fontSizeClass} ${spacingClass}`} style={{ color: designSettings.color }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">{content.personalInfo.fullName}</h1>
        {content.personalInfo.title && <p className="text-gray-600">{content.personalInfo.title}</p>}
        <div className="flex flex-wrap justify-center gap-x-4 text-sm mt-2">
          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          {content.personalInfo.location && <span>{content.personalInfo.location}</span>}
          {content.personalInfo.linkedin && <span>{content.personalInfo.linkedin}</span>}
          {content.personalInfo.website && <span>{content.personalInfo.website}</span>}
        </div>
      </header>

      {content.summary && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
          <p className="whitespace-pre-wrap">{content.summary}</p>
        </section>
      )}

      {content.experience.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
          <div className="space-y-4">
            {content.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.position} - {exp.company}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                {exp.description && <p className="mt-1 whitespace-pre-wrap">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc pl-5 mt-1">
                    {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.education.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
          <div className="space-y-4">
            {content.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-medium">{edu.degree} - {edu.institution}</h3>
                {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                <span className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </span>
                {edu.description && <p className="mt-1 whitespace-pre-wrap">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
          <div className="space-y-2">
            {content.skills.map((skillCat) => (
              <div key={skillCat.id}>
                <h3 className="font-medium">{skillCat.category}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillCat.skills.map((skill, i) => (
                    <span key={i} className="bg-gray-100 rounded px-2 py-1 text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
          <div className="space-y-4">
            {content.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-medium">{proj.name}</h3>
                {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                <p className="mt-1 whitespace-pre-wrap">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="bg-gray-100 rounded px-2 py-1 text-sm">{tech}</span>
                    ))}
                  </div>
                )}
                {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-primary-600">{proj.url}</a>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Certifications</h2>
          <div className="space-y-2">
            {content.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                {cert.date && <span className="text-sm text-gray-500">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.languages.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Languages</h2>
          <ul className="list-disc pl-5">
            {content.languages.map((lang) => (
              <li key={lang.id}>{lang.name} {lang.proficiency && `(${lang.proficiency})`}</li>
            ))}
          </ul>
        </section>
      )}

      {content.awards.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Awards</h2>
          <div className="space-y-2">
            {content.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-medium">{award.title}</h3>
                {award.issuer && <p className="text-sm text-gray-600">{award.issuer}</p>}
                {award.date && <span className="text-sm text-gray-500">{award.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.volunteer.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold border-b mb-2">Volunteer Experience</h2>
          <div className="space-y-4">
            {content.volunteer.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-medium">{vol.role} - {vol.organization}</h3>
                {vol.startDate && <span className="text-sm text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</span>}
                {vol.description && <p className="mt-1 whitespace-pre-wrap">{vol.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {content.customSections.map((section) => (
        <section key={section.id}>
          <h2 className="text-xl font-semibold border-b mb-2">{section.title}</h2>
          <div className="space-y-4">
            {section.entries.map((entry) => (
              <div key={entry.id}>
                {entry.title && <h3 className="font-medium">{entry.title}</h3>}
                {entry.subtitle && <p className="text-sm text-gray-600">{entry.subtitle}</p>}
                {entry.date && <span className="text-sm text-gray-500">{entry.date}</span>}
                {entry.description && <p className="mt-1 whitespace-pre-wrap">{entry.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}