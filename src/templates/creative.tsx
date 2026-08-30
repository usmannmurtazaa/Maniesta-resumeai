import type { Resume } from '@/types/resume.types';

export function CreativeTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  const { personalInfo } = content;

  return (
    <div className="creative-template print-area bg-white p-6 sm:p-8 max-w-4xl mx-auto font-sans text-gray-800">
      {/* Bold creative header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-400 px-6 py-8 text-white shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {personalInfo.fullName}
          </h1>
          {personalInfo.title && (
            <p className="mt-1 text-lg font-medium text-white/90">{personalInfo.title}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/80">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted hover:text-white"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.website && (
              <a
                href={personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted hover:text-white"
              >
                Portfolio
              </a>
            )}
          </div>
        </div>
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-xl" />
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          {content.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Skills
              </h2>
              <div className="mt-3 space-y-3">
                {content.skills.map((cat) => (
                  <div key={cat.id}>
                    <h3 className="text-sm font-semibold text-gray-900">{cat.category}</h3>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-primary-50 px-3 py-1 text-xs text-primary-700 border border-primary-100"
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

          {content.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Languages
              </h2>
              <ul className="mt-3 space-y-1 text-sm text-gray-700">
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Certifications
              </h2>
              <div className="mt-3 space-y-2">
                {content.certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="text-sm font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    {cert.date && <span className="text-xs text-gray-500">{cert.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.awards.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Awards
              </h2>
              <div className="mt-3 space-y-2">
                {content.awards.map((award) => (
                  <div key={award.id}>
                    <h3 className="text-sm font-semibold text-gray-900">{award.title}</h3>
                    {award.issuer && <p className="text-sm text-gray-600">{award.issuer}</p>}
                    {award.date && <span className="text-xs text-gray-500">{award.date}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main content */}
        <main className="md:col-span-2 space-y-8">
          {content.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Profile
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700 whitespace-pre-wrap">
                {content.summary}
              </p>
            </section>
          )}

          {content.experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Experience
              </h2>
              <div className="mt-4 space-y-5">
                {content.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-primary-200">
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
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Education
              </h2>
              <div className="mt-4 space-y-4">
                {content.education.map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l-2 border-accent-200">
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Projects
              </h2>
              <div className="mt-4 space-y-5">
                {content.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-primary-100 bg-primary-50/50 p-4"
                  >
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {proj.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-sm text-gray-600 bg-white border border-primary-100 rounded px-2 py-0.5"
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

          {content.volunteer.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
                Volunteer Experience
              </h2>
              <div className="mt-4 space-y-4">
                {content.volunteer.map((vol) => (
                  <div key={vol.id} className="relative pl-4 border-l-2 border-yellow-200">
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
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600 border-b-2 border-primary-100 pb-1">
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
