import type { Resume } from '@/types/resume.types';

export function ClassicTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  const { personalInfo } = content;

  return (
    <div className="classic-template print-area bg-white p-8 sm:p-10 max-w-4xl mx-auto font-serif text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 md:border-r md:border-gray-200 md:pr-6 space-y-6">
          <header className="text-center md:text-left">
            <h1 className="text-2xl font-bold leading-tight">{personalInfo.fullName}</h1>
            {personalInfo.title && <p className="mt-1 text-gray-600">{personalInfo.title}</p>}
            <div className="mt-2 text-sm text-gray-500 space-y-1">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
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

          {content.skills.length > 0 && (
            <section>
              <h3 className="font-semibold text-sm uppercase tracking-wide border-b border-gray-300 pb-1 text-gray-700">
                Skills
              </h3>
              <div className="mt-3 space-y-3">
                {content.skills.map((cat) => (
                  <div key={cat.id}>
                    <h4 className="font-medium text-sm text-gray-900">{cat.category}</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {cat.skills.map((s, i) => (
                        <span key={i} className="text-xs bg-gray-100 rounded px-2 py-0.5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.languages.length > 0 && (
            <section>
              <h3 className="font-semibold text-sm uppercase tracking-wide border-b border-gray-300 pb-1 text-gray-700">
                Languages
              </h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                {content.languages.map((l) => (
                  <li key={l.id}>
                    {l.name}{' '}
                    {l.proficiency && <span className="text-gray-400">({l.proficiency})</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {content.certifications.length > 0 && (
            <section>
              <h3 className="font-semibold text-sm uppercase tracking-wide border-b border-gray-300 pb-1 text-gray-700">
                Certifications
              </h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                {content.certifications.map((c) => (
                  <li key={c.id}>
                    <span className="font-medium text-gray-900">{c.name}</span>
                    {c.issuer && <span className="text-gray-500"> — {c.issuer}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {content.awards.length > 0 && (
            <section>
              <h3 className="font-semibold text-sm uppercase tracking-wide border-b border-gray-300 pb-1 text-gray-700">
                Awards
              </h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                {content.awards.map((a) => (
                  <li key={a.id}>
                    <span className="font-medium text-gray-900">{a.title}</span>
                    {a.issuer && <span className="text-gray-500"> — {a.issuer}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Main content */}
        <main className="md:col-span-2 space-y-8">
          {content.summary && (
            <section>
              <h2 className="font-semibold text-lg border-b border-gray-300 pb-1 text-gray-900">
                Professional Summary
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700 whitespace-pre-wrap">
                {content.summary}
              </p>
            </section>
          )}

          {content.experience.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b border-gray-300 pb-1 text-gray-900">
                Experience
              </h2>
              <div className="mt-4 space-y-5">
                {content.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-700">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                    {exp.description && (
                      <p className="mt-2 text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
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

          {content.education.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b border-gray-300 pb-1 text-gray-900">
                Education
              </h2>
              <div className="mt-4 space-y-4">
                {content.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                    {edu.description && (
                      <p className="mt-1 text-gray-700 whitespace-pre-wrap">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.projects.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b border-gray-300 pb-1 text-gray-900">
                Projects
              </h2>
              <div className="mt-4 space-y-4">
                {content.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {proj.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-sm text-gray-500 bg-gray-100 rounded px-2 py-0.5"
                          >
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
                        className="mt-1 inline-block text-primary-600 hover:underline text-sm"
                      >
                        View project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.volunteer.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b border-gray-300 pb-1 text-gray-900">
                Volunteer Experience
              </h2>
              <div className="mt-4 space-y-4">
                {content.volunteer.map((vol) => (
                  <div key={vol.id}>
                    <h3 className="font-semibold text-gray-900">{vol.role}</h3>
                    <p className="text-gray-700">{vol.organization}</p>
                    <span className="text-sm text-gray-500">
                      {vol.startDate} - {vol.endDate || 'Present'}
                    </span>
                    {vol.description && (
                      <p className="mt-1 text-gray-700 whitespace-pre-wrap">{vol.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.customSections.map((section) => (
            <section key={section.id}>
              <h2 className="font-semibold text-lg border-b border-gray-300 pb-1 text-gray-900">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.entries.map((entry) => (
                  <div key={entry.id}>
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
        </main>
      </div>
    </div>
  );
}
