import type { Resume } from '@/types/resume.types';

export function ModernTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  const { personalInfo } = content;

  return (
    <div className="modern-template print-area bg-white p-8 sm:p-10 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <header className="border-b-2 border-primary-600 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="mt-1 text-lg text-primary-600">{personalInfo.title}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a
              href={personalInfo.website}
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
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Professional Summary
          </h2>
          <p className="mt-2 leading-relaxed text-gray-700">{content.summary}</p>
        </section>
      )}

      {/* Experience */}
      {content.experience.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Experience
          </h2>
          <div className="mt-3 space-y-4">
            {content.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{exp.company}</p>
                {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                {exp.description && <p className="mt-1 text-gray-700">{exp.description}</p>}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-1 list-disc pl-5 text-gray-700">
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
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Education
          </h2>
          <div className="mt-3 space-y-3">
            {content.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <span className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {content.skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Skills
          </h2>
          <div className="mt-3 space-y-3">
            {content.skills.map((cat) => (
              <div key={cat.id}>
                <h3 className="font-medium text-gray-900">{cat.category}</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700"
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
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Projects
          </h2>
          <div className="mt-3 space-y-4">
            {content.projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                <p className="mt-1 text-gray-700">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-sm text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {content.certifications.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Certifications
          </h2>
          <div className="mt-3 space-y-2">
            {content.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-medium text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                {cert.date && <span className="text-sm text-gray-500">{cert.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {content.languages.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Languages
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {content.languages.map((lang) => (
              <span key={lang.id} className="text-gray-700">
                {lang.name} {lang.proficiency && `(${lang.proficiency})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {content.awards.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Awards
          </h2>
          <div className="mt-3 space-y-2">
            {content.awards.map((award) => (
              <div key={award.id}>
                <h3 className="font-medium text-gray-900">{award.title}</h3>
                {award.issuer && <p className="text-sm text-gray-600">{award.issuer}</p>}
                {award.date && <span className="text-sm text-gray-500">{award.date}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteer */}
      {content.volunteer.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Volunteer Experience
          </h2>
          <div className="mt-3 space-y-3">
            {content.volunteer.map((vol) => (
              <div key={vol.id}>
                <h3 className="font-medium text-gray-900">{vol.role}</h3>
                <p className="text-sm text-gray-600">{vol.organization}</p>
                <span className="text-sm text-gray-500">
                  {vol.startDate} - {vol.endDate || 'Present'}
                </span>
                {vol.description && <p className="mt-1 text-gray-700">{vol.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {content.customSections.map((section) => (
        <section key={section.id} className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            {section.title}
          </h2>
          <div className="mt-3 space-y-3">
            {section.entries.map((entry) => (
              <div key={entry.id}>
                {entry.title && <h3 className="font-medium text-gray-900">{entry.title}</h3>}
                {entry.subtitle && <p className="text-sm text-gray-600">{entry.subtitle}</p>}
                {entry.date && <span className="text-sm text-gray-500">{entry.date}</span>}
                {entry.description && <p className="mt-1 text-gray-700">{entry.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
