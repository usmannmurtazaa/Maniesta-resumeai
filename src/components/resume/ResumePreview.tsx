import { useResumeStore } from '@/store/resumeStore';
import type { Resume } from '@/types/resume.types';
import { cn } from '@/utils/cn';

export function ResumePreview({ resume }: { resume: Resume }) {
  const { designSettings } = resume;
  const { content } = resume;

  const fontClass =
    {
      inter: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
      lato: 'font-sans',
      montserrat: 'font-sans',
    }[designSettings.fontFamily] || 'font-sans';

  const fontSizeClass =
    {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    }[designSettings.fontSize] || 'text-base';

  const spacingClass =
    {
      compact: 'space-y-3',
      normal: 'space-y-5',
      relaxed: 'space-y-7',
    }[designSettings.spacing] || 'space-y-5';

  return (
    <div
      className={cn(
        'mx-auto max-w-4xl bg-white px-6 py-8 sm:px-8 sm:py-10 print:px-0 print:py-0',
        fontClass,
        fontSizeClass,
        spacingClass,
        'print-area text-gray-800 antialiased'
      )}
      style={{ color: designSettings.color }}
    >
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {content.personalInfo.fullName}
        </h1>
        {content.personalInfo.title && (
          <p className="mt-1 text-base text-gray-600">{content.personalInfo.title}</p>
        )}
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {content.personalInfo.email && (
            <span className="break-words">{content.personalInfo.email}</span>
          )}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          {content.personalInfo.location && <span>{content.personalInfo.location}</span>}
          {content.personalInfo.linkedin && (
            <a
              href={content.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {content.personalInfo.website && (
            <a
              href={content.personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {content.summary && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Summary
          </h2>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed">{content.summary}</p>
        </section>
      )}

      {/* Experience */}
      {content.experience.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Experience
          </h2>
          <div className="mt-3 space-y-5">
            {content.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                      {exp.company && <span className="text-gray-700"> — {exp.company}</span>}
                    </h3>
                    {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate || 'N/A'} - {exp.current ? 'Present' : exp.endDate || 'N/A'}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-2 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {exp.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {content.education.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Education
          </h2>
          <div className="mt-3 space-y-4">
            {content.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.startDate || 'N/A'} - {edu.endDate || 'N/A'}
                  </span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
                {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                {edu.description && (
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {content.skills.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Skills
          </h2>
          <div className="mt-3 space-y-3">
            {content.skills.map((skillCat) => (
              <div key={skillCat.id}>
                <h3 className="font-medium text-gray-900">{skillCat.category}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skillCat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-gray-100 px-2.5 py-1 text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {content.projects.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Projects
          </h2>
          <div className="mt-3 space-y-5">
            {content.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                <p className="mt-1 whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-sm text-gray-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-primary-600 hover:underline"
                  >
                    View project
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {content.certifications.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Certifications
          </h2>
          <div className="mt-3 space-y-3">
            {content.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                {cert.date && <span className="text-sm text-gray-500">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {content.languages.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Languages
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {content.languages.map((lang) => (
              <li key={lang.id}>
                {lang.name}{' '}
                {lang.proficiency && <span className="text-gray-500">({lang.proficiency})</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Awards */}
      {content.awards.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Awards
          </h2>
          <div className="mt-3 space-y-3">
            {content.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-semibold text-gray-900">{award.title}</h3>
                {award.issuer && <p className="text-sm text-gray-600">{award.issuer}</p>}
                {award.date && <span className="text-sm text-gray-500">{award.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteer */}
      {content.volunteer.length > 0 && (
        <section>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            Volunteer Experience
          </h2>
          <div className="mt-3 space-y-4">
            {content.volunteer.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                <p className="text-gray-700">{vol.organization}</p>
                <span className="text-sm text-gray-500">
                  {vol.startDate || 'N/A'} - {vol.endDate || 'Present'}
                </span>
                {vol.description && (
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {content.customSections.map((section) => (
        <section key={section.id}>
          <h2 className="border-b border-gray-200 pb-1 text-lg font-semibold text-gray-900">
            {section.title}
          </h2>
          <div className="mt-3 space-y-4">
            {section.entries.map((entry) => (
              <div key={entry.id}>
                {entry.title && <h3 className="font-semibold text-gray-900">{entry.title}</h3>}
                {entry.subtitle && <p className="text-sm text-gray-600">{entry.subtitle}</p>}
                {entry.date && <span className="text-sm text-gray-500">{entry.date}</span>}
                {entry.description && (
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">{entry.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
