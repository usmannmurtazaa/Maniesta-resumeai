import type { Resume } from '@/types/resume.types';

export function TechTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  const { personalInfo } = content;

  return (
    <div className="tech-template print-area bg-white p-8 sm:p-10 max-w-4xl mx-auto font-mono text-gray-800">
      {/* Header */}
      <header className="border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName}</h1>
        <p className="mt-1 text-lg text-gray-600">{personalInfo.title}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted hover:text-blue-600"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a
              href={personalInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted hover:text-blue-600"
            >
              Portfolio
            </a>
          )}
        </div>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar (Skills + Languages + Certifications) */}
        <aside className="md:col-span-1 space-y-6">
          {content.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Technical Skills
              </h2>
              <div className="mt-2 space-y-2">
                {content.skills.map((cat) => (
                  <div key={cat.id}>
                    <h3 className="text-sm font-medium text-gray-900">{cat.category}</h3>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, i) => (
                        <span key={i} className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                          {skill}
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
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Languages
              </h2>
              <ul className="mt-2 space-y-1 text-sm">
                {content.languages.map((lang) => (
                  <li key={lang.id}>
                    {lang.name}{' '}
                    {lang.proficiency && (
                      <span className="text-gray-500">({lang.proficiency})</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {content.certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Certifications
              </h2>
              <div className="mt-2 space-y-1 text-sm">
                {content.certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-gray-600">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main content */}
        <main className="md:col-span-2 space-y-6">
          {content.summary && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Summary
              </h2>
              <p className="mt-2 leading-relaxed">{content.summary}</p>
            </section>
          )}

          {content.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Experience
              </h2>
              <div className="mt-3 space-y-4">
                {content.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                    {exp.description && <p className="mt-1">{exp.description}</p>}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-1 list-disc pl-5 space-y-1">
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

          {content.projects.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Projects
              </h2>
              <div className="mt-3 space-y-4">
                {content.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                    <p className="mt-1">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="mt-1 text-sm text-gray-500">
                        <span className="font-medium">Tech:</span> {proj.technologies.join(', ')}
                      </p>
                    )}
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 underline decoration-dotted hover:underline"
                      >
                        View project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.education.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider border-b border-gray-300 pb-1">
                Education
              </h2>
              <div className="mt-3 space-y-2">
                {content.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
