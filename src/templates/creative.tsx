import type { Resume } from '@/types/resume.types';

export function CreativeTemplate({ resume }: { resume: Resume }) {
  const { content } = resume;
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto font-sans print-area">
      <div className="border-l-4 pl-6 border-primary-500">
        <h1 className="text-3xl font-bold">{content.personalInfo.fullName}</h1>
        <p className="text-gray-600">{content.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {content.personalInfo.email && <span>{content.personalInfo.email}</span>}
          {content.personalInfo.phone && <span>{content.personalInfo.phone}</span>}
          {content.personalInfo.location && <span>{content.personalInfo.location}</span>}
        </div>
      </div>
      <div className="mt-6 space-y-6">
        {content.summary && <section><h2 className="text-xl font-semibold text-primary-700">Profile</h2><p>{content.summary}</p></section>}
        {content.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-primary-700">Experience</h2>
            <div className="space-y-4">
              {content.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-medium">{exp.position} - {exp.company}</h3>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {content.education.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-primary-700">Education</h2>
            {content.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-medium">{edu.degree} - {edu.institution}</h3>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}
        {content.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-primary-700">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {content.skills.flatMap((c) => c.skills).map((s, i) => <span key={i} className="bg-gray-100 px-2 py-1">{s}</span>)}
            </div>
          </section>
        )}
        {content.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-primary-700">Projects</h2>
            {content.projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <h3 className="font-medium">{proj.name}</h3>
                <p>{proj.description}</p>
              </div>
            ))}
          </section>
        )}
        {content.certifications.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-primary-700">Certifications</h2>
            {content.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm text-gray-500">{cert.issuer}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}