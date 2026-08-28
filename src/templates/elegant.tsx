import type { Resume } from '@/types/resume.types';

export function ElegantTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  return (
    <div className="bg-white p-10 max-w-4xl mx-auto font-serif print-area">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light tracking-wide">{content.personalInfo.fullName}</h1>
        <p className="text-gray-500 italic">{content.personalInfo.title}</p>
        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600">
          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          {content.personalInfo.location && <span>{content.personalInfo.location}</span>}
        </div>
      </header>
      <div className="space-y-8">
        {content.summary && <section className="text-center"><p className="leading-relaxed">{content.summary}</p></section>}
        {content.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-center border-b border-gray-200 pb-2 mb-6">Experience</h2>
            <div className="space-y-6">
              {content.experience.map((exp) => (
                <div key={exp.id} className="text-center">
                  <h3 className="font-medium">{exp.position} - {exp.company}</h3>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {content.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-center border-b border-gray-200 pb-2 mb-6">Education</h2>
            {content.education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h3 className="font-medium">{edu.degree} - {edu.institution}</h3>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}
        {content.skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-center border-b border-gray-200 pb-2 mb-6">Skills</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {content.skills.flatMap((c) => c.skills).map((s, i) => <span key={i} className="bg-gray-100 px-3 py-1">{s}</span>)}
            </div>
          </section>
        )}
        {content.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-light text-center border-b border-gray-200 pb-2 mb-6">Projects</h2>
            {content.projects.map((proj) => (
              <div key={proj.id} className="text-center">
                <h3 className="font-medium">{proj.name}</h3>
                <p className="mt-1">{proj.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}