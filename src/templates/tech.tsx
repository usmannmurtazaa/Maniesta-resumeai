import type { Resume } from '@/types/resume.types';

export function TechTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  return (
    <div className="bg-gray-50 p-8 max-w-4xl mx-auto font-mono print-area">
      <header className="border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold">{content.personalInfo.fullName}</h1>
        <p className="text-gray-600">{content.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          {content.personalInfo.linkedin && <a href={content.personalInfo.linkedin} className="text-blue-600">{content.personalInfo.linkedin}</a>}
        </div>
      </header>
      <div className="mt-6 space-y-6">
        {content.summary && <section><h2 className="text-lg font-semibold">Summary</h2><p>{content.summary}</p></section>}
        {content.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {content.skills.flatMap((c) => c.skills).map((s, i) => <span key={i} className="bg-gray-200 px-2 py-1 text-sm">{s}</span>)}
            </div>
          </section>
        )}
        {content.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold">Projects</h2>
            <div className="space-y-4">
              {content.projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-medium">{proj.name}</h3>
                  <p>{proj.description}</p>
                  {proj.technologies && <p className="text-sm text-gray-600">{proj.technologies.join(', ')}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
        {content.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold">Experience</h2>
            {content.experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="font-medium">{exp.position} - {exp.company}</h3>
                <p className="text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}