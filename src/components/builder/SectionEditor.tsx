import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { PlusIcon, TrashIcon } from '@/components/ui/icons';

export default function SectionEditor() {
  const { currentResume, updateContent } = useResumeStore();
  if (!currentResume) return null;
  const content = currentResume.content;

  // Personal Info
  const updatePersonal = (field: string, value: string) => {
    updateContent((c) => {
      c.personalInfo = { ...c.personalInfo, [field]: value };
    });
  };

  // Summary
  const updateSummary = (value: string) => {
    updateContent((c) => {
      c.summary = value;
    });
  };

  // Experience
  const addExperience = () => {
    updateContent((c) => {
      c.experience.push({
        id: crypto.randomUUID(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      });
    });
  };
  const updateExperience = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const exp = c.experience.find((e) => e.id === id);
      if (exp) (exp as any)[field] = value;
    });
  };
  const removeExperience = (id: string) => {
    updateContent((c) => {
      c.experience = c.experience.filter((e) => e.id !== id);
    });
  };

  // Education
  const addEducation = () => {
    updateContent((c) => {
      c.education.push({
        id: crypto.randomUUID(),
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    });
  };
  const updateEducation = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const edu = c.education.find((e) => e.id === id);
      if (edu) (edu as any)[field] = value;
    });
  };
  const removeEducation = (id: string) => {
    updateContent((c) => {
      c.education = c.education.filter((e) => e.id !== id);
    });
  };

  // Skills
  const addSkillCategory = () => {
    updateContent((c) => {
      c.skills.push({
        id: crypto.randomUUID(),
        category: '',
        skills: [],
      });
    });
  };
  const updateSkillCategory = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const cat = c.skills.find((s) => s.id === id);
      if (cat) (cat as any)[field] = value;
    });
  };
  const removeSkillCategory = (id: string) => {
    updateContent((c) => {
      c.skills = c.skills.filter((s) => s.id !== id);
    });
  };
  const updateSkillList = (id: string, value: string) => {
    updateContent((c) => {
      const cat = c.skills.find((s) => s.id === id);
      if (cat) {
        cat.skills = value.split(',').map((s) => s.trim()).filter(Boolean);
      }
    });
  };

  // Projects
  const addProject = () => {
    updateContent((c) => {
      c.projects.push({
        id: crypto.randomUUID(),
        name: '',
        role: '',
        description: '',
        technologies: [],
        url: '',
      });
    });
  };
  const updateProject = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const proj = c.projects.find((p) => p.id === id);
      if (proj) (proj as any)[field] = value;
    });
  };
  const removeProject = (id: string) => {
    updateContent((c) => {
      c.projects = c.projects.filter((p) => p.id !== id);
    });
  };

  // Certifications
  const addCertification = () => {
    updateContent((c) => {
      c.certifications.push({
        id: crypto.randomUUID(),
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        url: '',
      });
    });
  };
  const updateCertification = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const cert = c.certifications.find((cer) => cer.id === id);
      if (cert) (cert as any)[field] = value;
    });
  };
  const removeCertification = (id: string) => {
    updateContent((c) => {
      c.certifications = c.certifications.filter((cer) => cer.id !== id);
    });
  };

  // Languages
  const addLanguage = () => {
    updateContent((c) => {
      c.languages.push({
        id: crypto.randomUUID(),
        name: '',
        proficiency: '',
      });
    });
  };
  const updateLanguage = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const lang = c.languages.find((l) => l.id === id);
      if (lang) (lang as any)[field] = value;
    });
  };
  const removeLanguage = (id: string) => {
    updateContent((c) => {
      c.languages = c.languages.filter((l) => l.id !== id);
    });
  };

  // Awards
  const addAward = () => {
    updateContent((c) => {
      c.awards.push({
        id: crypto.randomUUID(),
        title: '',
        issuer: '',
        date: '',
        description: '',
      });
    });
  };
  const updateAward = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const award = c.awards.find((a) => a.id === id);
      if (award) (award as any)[field] = value;
    });
  };
  const removeAward = (id: string) => {
    updateContent((c) => {
      c.awards = c.awards.filter((a) => a.id !== id);
    });
  };

  // Volunteer
  const addVolunteer = () => {
    updateContent((c) => {
      c.volunteer.push({
        id: crypto.randomUUID(),
        organization: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    });
  };
  const updateVolunteer = (id: string, field: string, value: any) => {
    updateContent((c) => {
      const vol = c.volunteer.find((v) => v.id === id);
      if (vol) (vol as any)[field] = value;
    });
  };
  const removeVolunteer = (id: string) => {
    updateContent((c) => {
      c.volunteer = c.volunteer.filter((v) => v.id !== id);
    });
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" value={content.personalInfo.fullName} onChange={(e) => updatePersonal('fullName', e.target.value)} />
          <Input label="Email" type="email" value={content.personalInfo.email} onChange={(e) => updatePersonal('email', e.target.value)} />
          <Input label="Phone" value={content.personalInfo.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
          <Input label="Location" value={content.personalInfo.location} onChange={(e) => updatePersonal('location', e.target.value)} />
          <Input label="LinkedIn" value={content.personalInfo.linkedin || ''} onChange={(e) => updatePersonal('linkedin', e.target.value)} />
          <Input label="Website" value={content.personalInfo.website || ''} onChange={(e) => updatePersonal('website', e.target.value)} />
          <Input label="Title" value={content.personalInfo.title || ''} onChange={(e) => updatePersonal('title', e.target.value)} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <Textarea label="Professional Summary" value={content.summary} onChange={(e) => updateSummary(e.target.value)} rows={4} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Experience</h2>
          <Button onClick={addExperience} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
              <Input label="Position" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} />
              <Input label="Location" value={exp.location || ''} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} />
              <div className="flex gap-4">
                <Input label="Start Date" type="date" value={exp.startDate || ''} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                <Input label="End Date" type="date" value={exp.endDate || ''} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <Textarea label="Description" value={exp.description || ''} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} />
            <Button variant="ghost" onClick={() => removeExperience(exp.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <Button onClick={addEducation} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
              <Input label="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
              <Input label="Field of Study" value={edu.field || ''} onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} />
              <Input label="Location" value={edu.location || ''} onChange={(e) => updateEducation(edu.id, 'location', e.target.value)} />
              <Input label="Start Date" type="date" value={edu.startDate || ''} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
              <Input label="End Date" type="date" value={edu.endDate || ''} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
            </div>
            <Textarea label="Description" value={edu.description || ''} onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} />
            <Button variant="ghost" onClick={() => removeEducation(edu.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <Button onClick={addSkillCategory} size="sm"><PlusIcon size={16} /> Add Category</Button>
        </div>
        {content.skills.map((cat) => (
          <div key={cat.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <Input label="Category" value={cat.category} onChange={(e) => updateSkillCategory(cat.id, 'category', e.target.value)} />
            <Input label="Skills (comma-separated)" value={cat.skills.join(', ')} onChange={(e) => updateSkillList(cat.id, e.target.value)} />
            <Button variant="ghost" onClick={() => removeSkillCategory(cat.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Button onClick={addProject} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.projects.map((proj) => (
          <div key={proj.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} />
              <Input label="Role" value={proj.role || ''} onChange={(e) => updateProject(proj.id, 'role', e.target.value)} />
            </div>
            <Textarea label="Description" value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} />
            <Input label="Technologies (comma-separated)" value={proj.technologies?.join(', ') || ''} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            <Input label="URL" value={proj.url || ''} onChange={(e) => updateProject(proj.id, 'url', e.target.value)} />
            <Button variant="ghost" onClick={() => removeProject(proj.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <Button onClick={addCertification} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.certifications.map((cert) => (
          <div key={cert.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <Input label="Name" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} />
            <Input label="Issuer" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Date" type="date" value={cert.date || ''} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)} />
              <Input label="Credential ID" value={cert.credentialId || ''} onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)} />
            </div>
            <Input label="URL" value={cert.url || ''} onChange={(e) => updateCertification(cert.id, 'url', e.target.value)} />
            <Button variant="ghost" onClick={() => removeCertification(cert.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Languages</h2>
          <Button onClick={addLanguage} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.languages.map((lang) => (
          <div key={lang.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Language" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} />
              <Input label="Proficiency" value={lang.proficiency || ''} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)} />
            </div>
            <Button variant="ghost" onClick={() => removeLanguage(lang.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Awards</h2>
          <Button onClick={addAward} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.awards.map((award) => (
          <div key={award.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <Input label="Title" value={award.title} onChange={(e) => updateAward(award.id, 'title', e.target.value)} />
            <Input label="Issuer" value={award.issuer || ''} onChange={(e) => updateAward(award.id, 'issuer', e.target.value)} />
            <Input label="Date" type="date" value={award.date || ''} onChange={(e) => updateAward(award.id, 'date', e.target.value)} />
            <Textarea label="Description" value={award.description || ''} onChange={(e) => updateAward(award.id, 'description', e.target.value)} />
            <Button variant="ghost" onClick={() => removeAward(award.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Volunteer Experience</h2>
          <Button onClick={addVolunteer} size="sm"><PlusIcon size={16} /> Add</Button>
        </div>
        {content.volunteer.map((vol) => (
          <div key={vol.id} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Organization" value={vol.organization} onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)} />
              <Input label="Role" value={vol.role || ''} onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={vol.startDate || ''} onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)} />
              <Input label="End Date" type="date" value={vol.endDate || ''} onChange={(e) => updateVolunteer(vol.id, 'endDate', e.target.value)} />
            </div>
            <Textarea label="Description" value={vol.description || ''} onChange={(e) => updateVolunteer(vol.id, 'description', e.target.value)} />
            <Button variant="ghost" onClick={() => removeVolunteer(vol.id)}><TrashIcon size={16} /> Remove</Button>
          </div>
        ))}
      </section>
    </div>
  );
}