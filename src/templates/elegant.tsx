import type { Resume } from '@/types/resume.types';

export function ElegantTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  const { personalInfo } = content;

  return (
    <div className="elegant-template print-area bg-white p-10 sm:p-14 max-w-4xl mx-auto font-serif text-gray-800">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-light tracking-wide text-gray-900">
          {personalInfo.fullName}
        </h1>
        {personalInfo.title && (
          <p className="mt-2 text-lg italic text-gray-500">{personalInfo.title}</p>
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-600"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-600"
            >
              Portfolio
            </a>
          )}
        </div>
      </header>

      <div className="space-y-10">
        {content.summary && (
          <section className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
              Profile
            </h2>
            <p className="leading-relaxed text-gray-700">{content.summary}</p>
          </section>
        )}

        {content.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Experience
            </h2>
            <div className="space-y-6">
              {content.experience.map((exp) => (
                <div key={exp.id} className="text-center">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="mt-3 text-gray-700 leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-3 list-none space-y-1 max-w-2xl mx-auto">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-gray-700">
                          — {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.education.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Education
            </h2>
            <div className="space-y-5">
              {content.education.map((edu) => (
                <div key={edu.id} className="text-center">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="mt-2 text-gray-700 max-w-2xl mx-auto whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {content.skills
                .flatMap((c) => c.skills)
                .map((s, i) => (
                  <span
                    key={i}
                    className="bg-gray-50 border border-gray-200 px-4 py-1.5 text-sm text-gray-700"
                  >
                    {s}
                  </span>
                ))}
            </div>
          </section>
        )}

        {content.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Projects
            </h2>
            <div className="space-y-6">
              {content.projects.map((proj) => (
                <div key={proj.id} className="text-center">
                  <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                  {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                  <p className="mt-2 text-gray-700 max-w-2xl mx-auto whitespace-pre-wrap">
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                      {proj.technologies.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>
                  )}
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-primary-600 hover:underline text-sm"
                    >
                      View project
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Certifications
            </h2>
            <div className="space-y-4">
              {content.certifications.map((cert) => (
                <div key={cert.id} className="text-center">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  {cert.date && <span className="text-sm text-gray-500">{cert.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Languages
            </h2>
            <div className="flex flex-wrap justify-center gap-3 text-gray-700">
              {content.languages.map((lang) => (
                <span key={lang.id}>
                  {lang.name}{' '}
                  {lang.proficiency && <span className="text-gray-500">({lang.proficiency})</span>}
                </span>
              ))}
            </div>
          </section>
        )}

        {content.awards.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Awards
            </h2>
            <div className="space-y-4">
              {content.awards.map((award) => (
                <div key={award.id} className="text-center">
                  <h3 className="font-semibold text-gray-900">{award.title}</h3>
                  {award.issuer && <p className="text-gray-600">{award.issuer}</p>}
                  {award.date && <span className="text-sm text-gray-500">{award.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.volunteer.length > 0 && (
          <section>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              Volunteer Experience
            </h2>
            <div className="space-y-5">
              {content.volunteer.map((vol) => (
                <div key={vol.id} className="text-center">
                  <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                  <p className="text-gray-600">{vol.organization}</p>
                  <p className="text-sm text-gray-500">
                    {vol.startDate} - {vol.endDate || 'Present'}
                  </p>
                  {vol.description && (
                    <p className="mt-2 text-gray-700 max-w-2xl mx-auto whitespace-pre-wrap">
                      {vol.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {content.customSections.map((section) => (
          <section key={section.id}>
            <h2 className="text-lg font-light text-center border-b border-gray-200 pb-2 mb-6 text-gray-900">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.entries.map((entry) => (
                <div key={entry.id} className="text-center">
                  {entry.title && <h3 className="font-semibold text-gray-900">{entry.title}</h3>}
                  {entry.subtitle && <p className="text-sm text-gray-600">{entry.subtitle}</p>}
                  {entry.date && <span className="text-sm text-gray-500">{entry.date}</span>}
                  {entry.description && (
                    <p className="mt-1 text-gray-700 whitespace-pre-wrap">{entry.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
