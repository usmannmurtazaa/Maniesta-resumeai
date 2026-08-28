import type { Resume } from '@/types/resume.types';

export function ClassicTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto font-serif print-area">
      <div className="grid grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="col-span-1 border-r pr-6">
          <header className="text-center">
            <h1 className="text-2xl font-bold">{content.personalInfo.fullName}</h1>
            {content.personalInfo.title && <p className="text-gray-600">{content.personalInfo.title}</p>}
          </header>
          <div className="mt-6 space-y-6">
            {content.skills.length > 0 && (
              <section>
                <h3 className="font-semibold text-sm uppercase tracking-wide border-b pb-1">Skills</h3>
                <div className="mt-2">
                  {content.skills.map((cat) => (
                    <div key={cat.id} className="mb-2">
                      <h4 className="font-medium text-sm">{cat.category}</h4>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, i) => <span key={i} className="text-xs">{s}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {content.languages.length > 0 && (
              <section>
                <h3 className="font-semibold text-sm uppercase tracking-wide border-b pb-1">Languages</h3>
                <ul className="mt-2 text-sm">
                  {content.languages.map((l) => <li key={l.id}>{l.name}</li>)}
                </ul>
              </section>
            )}
            {content.certifications.length > 0 && (
              <section>
                <h3 className="font-semibold text-sm uppercase tracking-wide border-b pb-1">Certifications</h3>
                <ul className="mt-2 text-sm">
                  {content.certifications.map((c) => <li key={c.id}>{c.name}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
        {/* Main */}
        <div className="col-span-2 space-y-6">
          {content.summary && (
            <section>
              <h2 className="font-semibold text-lg border-b pb-1">Summary</h2>
              <p className="whitespace-pre-wrap">{content.summary}</p>
            </section>
          )}
          {content.experience.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b pb-1">Experience</h2>
              <div className="space-y-4">
                {content.experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="font-medium">{exp.position} - {exp.company}</h3>
                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    <p className="mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {content.education.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b pb-1">Education</h2>
              <div className="space-y-2">
                {content.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-medium">{edu.degree} - {edu.institution}</h3>
                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {content.projects.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg border-b pb-1">Projects</h2>
              <div className="space-y-4">
                {content.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-medium">{proj.name}</h3>
                    <p className="mt-1">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}