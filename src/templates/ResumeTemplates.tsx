import React from 'react';
import type { ResumeData } from '../redux/resumeSlice';

interface ResumeTemplateRendererProps {
  data: ResumeData;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export const ResumeTemplateRenderer: React.FC<ResumeTemplateRendererProps> = ({ data, targetRef }) => {
  const { personalDetails, careerSummary, skills, experience, projects, education, additional, sectionOrder, customization } = data;

  const fontClass = customization.fontFamily;
  const spacingClass =
    customization.spacing === 'compact'
      ? 'space-y-2'
      : customization.spacing === 'loose'
      ? 'space-y-5.5'
      : 'space-y-3.5';

  const innerSpacingClass =
    customization.spacing === 'compact'
      ? 'space-y-1'
      : customization.spacing === 'loose'
      ? 'space-y-3.5'
      : 'space-y-2';

  const textSizes = {
    sm: {
      name: 'text-2xl',
      title: 'text-xs',
      h2: 'text-xs',
      body: 'text-[11px]',
      meta: 'text-[10px]',
    },
    md: {
      name: 'text-3xl',
      title: 'text-sm',
      h2: 'text-sm',
      body: 'text-xs',
      meta: 'text-[11px]',
    },
    lg: {
      name: 'text-4xl',
      title: 'text-base',
      h2: 'text-base',
      body: 'text-sm',
      meta: 'text-xs',
    },
  }[customization.fontSize];

  // RENDER DYNAMIC SECTION BLOCKS
  const renderSection = (sectionId: string, styleMode?: 'deedy' | 'awesome' | 'jakes' | 'default') => {
    if ((customization.hiddenSections || []).includes(sectionId)) return null;
    switch (sectionId) {
      case 'summary':
        if (!careerSummary.aboutMe && !careerSummary.careerObjective) return null;
        return (
          <div key="summary" className="text-left">
            {styleMode === 'deedy' ? (
              <h2 className="font-extrabold uppercase tracking-widest text-slate-800 border-b pb-0.5 mb-2 text-xs" style={{ borderBottomColor: `${customization.primaryColor}30` }}>
                <span style={{ color: customization.primaryColor }}>Profile</span> Summary
              </h2>
            ) : styleMode === 'awesome' ? (
              <h2 className="font-bold tracking-wide uppercase text-slate-800 text-sm mb-2 flex items-center">
                <span className="w-1.5 h-4 mr-2 rounded" style={{ backgroundColor: customization.primaryColor }} />
                <span>Summary</span>
              </h2>
            ) : styleMode === 'jakes' ? (
              <div className="mb-2">
                <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">Summary</h2>
                <div className="h-0.5 w-full bg-slate-950 mt-0.5" />
              </div>
            ) : (
              <h2 className="font-bold border-b pb-1 mb-2 tracking-wide uppercase text-xs" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
                Professional Summary
              </h2>
            )}

            {careerSummary.aboutMe && (
              <p className={`text-slate-600 dark:text-slate-700 leading-relaxed whitespace-pre-line text-left ${textSizes.body}`}>
                {careerSummary.aboutMe}
              </p>
            )}
            {careerSummary.careerObjective && (
              <div className={`mt-1.5 text-left ${textSizes.body}`}>
                <span className="font-bold text-slate-800">Career Objective: </span>
                <p className="text-slate-600 leading-relaxed inline">{careerSummary.careerObjective}</p>
              </div>
            )}
          </div>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <div key="skills" className="text-left">
            {styleMode === 'deedy' ? (
              <h2 className="font-extrabold uppercase tracking-widest text-slate-800 border-b pb-0.5 mb-2 text-xs" style={{ borderBottomColor: `${customization.primaryColor}30` }}>
                <span style={{ color: customization.primaryColor }}>Key</span> Skills
              </h2>
            ) : styleMode === 'awesome' ? (
              <h2 className="font-bold tracking-wide uppercase text-slate-800 text-sm mb-2.5 flex items-center">
                <span className="w-1.5 h-4 mr-2 rounded" style={{ backgroundColor: customization.primaryColor }} />
                <span>Skills & Expertise</span>
              </h2>
            ) : styleMode === 'jakes' ? (
              <div className="mb-2">
                <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">Skills</h2>
                <div className="h-0.5 w-full bg-slate-950 mt-0.5" />
              </div>
            ) : (
              <h2 className="font-bold border-b pb-1 mb-2 tracking-wide uppercase text-xs" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
                Core Expertise
              </h2>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold border transition-all"
                  style={{
                    backgroundColor: `${customization.primaryColor}08`,
                    borderColor: `${customization.primaryColor}15`,
                    color: customization.primaryColor,
                  }}
                >
                  <span className={textSizes.body}>{skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <div key="experience" className="text-left">
            {styleMode === 'deedy' ? (
              <h2 className="font-extrabold uppercase tracking-widest text-slate-800 border-b pb-0.5 mb-2.5 text-xs" style={{ borderBottomColor: `${customization.primaryColor}30` }}>
                <span style={{ color: customization.primaryColor }}>Experience</span>
              </h2>
            ) : styleMode === 'awesome' ? (
              <h2 className="font-bold tracking-wide uppercase text-slate-800 text-sm mb-3.5 flex items-center">
                <span className="w-1.5 h-4 mr-2 rounded" style={{ backgroundColor: customization.primaryColor }} />
                <span>Employment History</span>
              </h2>
            ) : styleMode === 'jakes' ? (
              <div className="mb-2.5">
                <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">Experience</h2>
                <div className="h-0.5 w-full bg-slate-950 mt-0.5" />
              </div>
            ) : (
              <h2 className="font-bold border-b pb-1 mb-2.5 tracking-wide uppercase text-xs" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
                Work History
              </h2>
            )}

            <div className={innerSpacingClass}>
              {experience.map((exp) => (
                <div key={exp.id} className="text-left">
                  {styleMode === 'jakes' ? (
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-950">
                        <span className={textSizes.body}>{exp.company}</span>
                        <span className={textSizes.meta}>{exp.duration}</span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs italic text-slate-700 mt-0.5">
                        <span>{exp.role}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`font-bold text-slate-800 ${textSizes.body}`}>{exp.role}</h3>
                        <span className="text-xs font-semibold" style={{ color: customization.primaryColor }}>
                          {exp.company}
                        </span>
                      </div>
                      <span className={`font-semibold text-slate-400 ${textSizes.meta}`}>{exp.duration}</span>
                    </div>
                  )}
                  <p className={`text-slate-500 leading-relaxed whitespace-pre-line mt-1.5 ${textSizes.body}`}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <div key="projects" className="text-left">
            {styleMode === 'deedy' ? (
              <h2 className="font-extrabold uppercase tracking-widest text-slate-800 border-b pb-0.5 mb-2.5 text-xs" style={{ borderBottomColor: `${customization.primaryColor}30` }}>
                <span style={{ color: customization.primaryColor }}>Projects</span> Showcase
              </h2>
            ) : styleMode === 'awesome' ? (
              <h2 className="font-bold tracking-wide uppercase text-slate-800 text-sm mb-3.5 flex items-center">
                <span className="w-1.5 h-4 mr-2 rounded" style={{ backgroundColor: customization.primaryColor }} />
                <span>Featured Projects</span>
              </h2>
            ) : styleMode === 'jakes' ? (
              <div className="mb-2.5">
                <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">Projects</h2>
                <div className="h-0.5 w-full bg-slate-950 mt-0.5" />
              </div>
            ) : (
              <h2 className="font-bold border-b pb-1 mb-2.5 tracking-wide uppercase text-xs" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
                Projects Showcase
              </h2>
            )}

            <div className={innerSpacingClass}>
              {projects.map((proj) => (
                <div key={proj.id} className="text-left">
                  <div className="flex justify-between items-baseline">
                    <h3 className={`font-bold text-slate-800 ${textSizes.body}`}>{proj.name}</h3>
                    <div className={`space-x-3 text-slate-400 font-semibold ${textSizes.meta}`}>
                      {proj.github && <a href={`https://${proj.github}`} target="_blank" rel="noreferrer" className="hover:text-slate-700 underline">GitHub</a>}
                      {proj.live && <a href={`https://${proj.live}`} target="_blank" rel="noreferrer" className="hover:text-slate-700 underline">Demo</a>}
                    </div>
                  </div>
                  <div className="text-xs font-semibold opacity-80 mt-0.5" style={{ color: customization.primaryColor }}>
                    Tech Stack: {proj.techStack}
                  </div>
                  <p className={`text-slate-500 leading-relaxed mt-1 ${textSizes.body}`}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <div key="education" className="text-left">
            {styleMode === 'deedy' ? (
              <h2 className="font-extrabold uppercase tracking-widest text-slate-800 border-b pb-0.5 mb-2.5 text-xs" style={{ borderBottomColor: `${customization.primaryColor}30` }}>
                <span style={{ color: customization.primaryColor }}>Education</span>
              </h2>
            ) : styleMode === 'awesome' ? (
              <h2 className="font-bold tracking-wide uppercase text-slate-800 text-sm mb-3.5 flex items-center">
                <span className="w-1.5 h-4 mr-2 rounded" style={{ backgroundColor: customization.primaryColor }} />
                <span>Education Records</span>
              </h2>
            ) : styleMode === 'jakes' ? (
              <div className="mb-2.5">
                <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">Education</h2>
                <div className="h-0.5 w-full bg-slate-950 mt-0.5" />
              </div>
            ) : (
              <h2 className="font-bold border-b pb-1 mb-2.5 tracking-wide uppercase text-xs" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
                Education History
              </h2>
            )}

            <div className={innerSpacingClass}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start text-left">
                  <div>
                    <h3 className={`font-bold text-slate-800 ${textSizes.body}`}>{edu.degree}</h3>
                    <p className={`text-slate-500 ${textSizes.meta}`}>{edu.school}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold text-slate-400 block ${textSizes.meta}`}>{edu.year}</span>
                    <span className="text-xs block font-bold" style={{ color: customization.primaryColor }}>
                      {edu.cgpa}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'additional':
        const { certifications, achievements, languages, interests, references } = additional;
        if (!certifications && !achievements && !languages && !interests && !references) return null;
        return (
          <div key="additional" className="text-left">
            {styleMode === 'deedy' ? (
              <h2 className="font-extrabold uppercase tracking-widest text-slate-800 border-b pb-0.5 mb-2.5 text-xs" style={{ borderBottomColor: `${customization.primaryColor}30` }}>
                <span style={{ color: customization.primaryColor }}>Additional</span> Information
              </h2>
            ) : styleMode === 'awesome' ? (
              <h2 className="font-bold tracking-wide uppercase text-slate-800 text-sm mb-3.5 flex items-center">
                <span className="w-1.5 h-4 mr-2 rounded" style={{ backgroundColor: customization.primaryColor }} />
                <span>Extracurricular Details</span>
              </h2>
            ) : styleMode === 'jakes' ? (
              <div className="mb-2.5">
                <h2 className="font-bold uppercase tracking-wider text-slate-900 text-xs">Extra Information</h2>
                <div className="h-0.5 w-full bg-slate-950 mt-0.5" />
              </div>
            ) : (
              <h2 className="font-bold border-b pb-1 mb-2.5 tracking-wide uppercase text-xs" style={{ borderColor: customization.primaryColor, color: customization.primaryColor }}>
                Additional Details
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {certifications && (
                <div>
                  <h4 className="font-bold text-slate-700 text-xs mb-0.5">Certifications</h4>
                  <p className={`text-slate-500 leading-relaxed ${textSizes.body}`}>{certifications}</p>
                </div>
              )}
              {achievements && (
                <div>
                  <h4 className="font-bold text-slate-700 text-xs mb-0.5">Key Achievements</h4>
                  <p className={`text-slate-500 leading-relaxed ${textSizes.body}`}>{achievements}</p>
                </div>
              )}
              {languages && (
                <div>
                  <h4 className="font-bold text-slate-700 text-xs mb-0.5">Languages</h4>
                  <p className={`text-slate-500 leading-relaxed ${textSizes.body}`}>{languages}</p>
                </div>
              )}
              {interests && (
                <div>
                  <h4 className="font-bold text-slate-700 text-xs mb-0.5">Hobbies</h4>
                  <p className={`text-slate-500 leading-relaxed ${textSizes.body}`}>{interests}</p>
                </div>
              )}
              {references && (
                <div className="md:col-span-2">
                  <h4 className="font-bold text-slate-700 text-xs mb-0.5">References</h4>
                  <p className={`text-slate-500 leading-relaxed ${textSizes.body}`}>{references}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTemplateLayout = () => {
    switch (data.templateId) {
      // 1. MODERN (Dual Column with colored side accent panel)
      case 'modern':
        return (
          <div className="grid grid-cols-12 min-h-[1020px]">
            <div className="col-span-4 bg-slate-900 text-slate-100 p-5 flex flex-col justify-between text-left">
              <div className="space-y-5">
                {personalDetails.photoUrl && (
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-800 mx-auto shadow-md">
                    <img src={personalDetails.photoUrl} alt={personalDetails.fullName} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-white leading-tight">{personalDetails.fullName || 'Full Name'}</h1>
                  <p className="text-xs font-semibold text-slate-400 mt-1">{personalDetails.jobTitle || 'Job Title'}</p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                  <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[9px]">Contact Details</h4>
                  {personalDetails.email && <p className="truncate">✉ {personalDetails.email}</p>}
                  {personalDetails.phone && <p>☎ {personalDetails.phone}</p>}
                  {personalDetails.address && <p>📍 {personalDetails.address}</p>}
                  {personalDetails.linkedin && <p className="truncate">🔗 {personalDetails.linkedin}</p>}
                  {personalDetails.github && <p className="truncate">🐙 {personalDetails.github}</p>}
                  {personalDetails.portfolio && <p className="truncate">💼 {personalDetails.portfolio}</p>}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Hari Narayan Singh</div>
            </div>

            <div className={`col-span-8 p-6 bg-white ${spacingClass} text-slate-850`}>
              {sectionOrder.map((secId) => renderSection(secId))}
            </div>
          </div>
        );

      // 2. ATS FRIENDLY (Pure linear, monospaced-sans, minimal markup for parsing)
      case 'ats':
        return (
          <div className={`p-6 bg-white text-slate-950 font-sans text-left ${spacingClass}`}>
            <div className="text-center border-b pb-3 border-slate-900">
              <h1 className="text-2xl font-bold uppercase tracking-wide leading-none">{personalDetails.fullName || 'YOUR NAME'}</h1>
              <p className="text-xs font-semibold tracking-wider text-slate-600 mt-1 uppercase">{personalDetails.jobTitle}</p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
                {personalDetails.email && <span>Email: {personalDetails.email}</span>}
                {personalDetails.phone && <span>Phone: {personalDetails.phone}</span>}
                {personalDetails.address && <span>Addr: {personalDetails.address}</span>}
                {personalDetails.linkedin && <span>LinkedIn: {personalDetails.linkedin}</span>}
                {personalDetails.github && <span>GitHub: {personalDetails.github}</span>}
              </div>
            </div>
            {sectionOrder.map((secId) => renderSection(secId))}
          </div>
        );

      // 3. MINIMAL (Centered typography, elegant margins)
      case 'minimal':
        return (
          <div className={`p-6 bg-white text-slate-800 text-center ${spacingClass}`}>
            <div className="pb-3 border-b border-slate-100">
              <h1 className="text-2xl font-light tracking-wide text-slate-900 leading-none">{personalDetails.fullName || 'Name'}</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">{personalDetails.jobTitle}</p>
              <div className="flex justify-center flex-wrap gap-4 text-xs text-slate-400 mt-2.5 font-medium">
                {personalDetails.email && <span>{personalDetails.email}</span>}
                {personalDetails.phone && <span>{personalDetails.phone}</span>}
                {personalDetails.address && <span>{personalDetails.address}</span>}
              </div>
            </div>
            <div className="text-left space-y-4">
              {sectionOrder.map((secId) => renderSection(secId))}
            </div>
          </div>
        );

      // 4. CREATIVE (Vertical side banner, custom profile avatar layout)
      case 'creative':
        return (
          <div className="min-h-[1020px] flex bg-slate-50">
            <div className="w-4 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
            <div className={`flex-1 p-6 bg-white ${spacingClass}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-5 border-b border-slate-100 gap-3">
                <div className="flex items-center space-x-3">
                  {personalDetails.photoUrl && (
                    <img src={personalDetails.photoUrl} alt="Avatar" className="w-16 h-16 rounded-xl object-cover ring-4 ring-purple-100 shadow" />
                  )}
                  <div className="text-left">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">{personalDetails.fullName}</h1>
                    <p className="text-xs font-semibold text-purple-650 mt-1">{personalDetails.jobTitle}</p>
                  </div>
                </div>
                <div className="text-left md:text-right text-xs text-slate-500 space-y-0.5">
                  {personalDetails.email && <p>✉ {personalDetails.email}</p>}
                  {personalDetails.phone && <p>☎ {personalDetails.phone}</p>}
                  {personalDetails.address && <p>📍 {personalDetails.address}</p>}
                </div>
              </div>
              {sectionOrder.map((secId) => renderSection(secId))}
            </div>
          </div>
        );

      // 5. CORPORATE (Dark headers, formal box layouts)
      case 'corporate':
        return (
          <div className={`p-6 bg-white text-slate-800 text-left ${spacingClass}`}>
            <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold leading-none">{personalDetails.fullName}</h1>
                <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">{personalDetails.jobTitle}</p>
              </div>
              <div className="text-xs text-slate-300 space-y-0.5 md:text-right">
                {personalDetails.email && <p>Email: {personalDetails.email}</p>}
                {personalDetails.phone && <p>Phone: {personalDetails.phone}</p>}
                {personalDetails.address && <p>Loc: {personalDetails.address}</p>}
              </div>
            </div>
            {sectionOrder.map((secId) => renderSection(secId))}
          </div>
        );

      // 6. EXECUTIVE (Polished elegant Navy details, two-column)
      case 'executive':
        return (
          <div className={`p-6 bg-white text-slate-805 text-left ${spacingClass}`}>
            <div className="grid grid-cols-12 gap-5 pb-5 border-b-2 border-slate-900">
              <div className="col-span-8">
                <h1 className="text-2xl font-black text-slate-900 leading-none">{personalDetails.fullName}</h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">{personalDetails.jobTitle}</p>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed italic">{careerSummary.aboutMe}</p>
              </div>
              <div className="col-span-4 text-right text-xs text-slate-500 space-y-0.5 pt-1">
                {personalDetails.email && <p className="font-medium">{personalDetails.email}</p>}
                {personalDetails.phone && <p>{personalDetails.phone}</p>}
                {personalDetails.address && <p>{personalDetails.address}</p>}
                {personalDetails.linkedin && <p className="underline">{personalDetails.linkedin}</p>}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-4">
                {renderSection('experience')}
                {renderSection('projects')}
              </div>
              <div className="col-span-4 space-y-4">
                {renderSection('skills')}
                {renderSection('education')}
                {renderSection('additional')}
              </div>
            </div>
          </div>
        );

      // 7. SOFTWARE DEVELOPER (Developer terminal block, tags, clean spacing)
      case 'developer':
        return (
          <div className={`p-6 bg-white text-slate-800 text-left font-mono ${spacingClass}`}>
            <div className="border-4 border-slate-900 p-4 rounded-lg bg-slate-950 text-emerald-450">
              <h1 className="text-xl font-bold leading-none">&gt;_ {personalDetails.fullName || 'developer.sh'}</h1>
              <p className="text-[10px] text-slate-400 mt-1">// {personalDetails.jobTitle}</p>
              <div className="grid grid-cols-2 gap-1.5 text-[9px] text-slate-400 mt-3 border-t border-slate-850 pt-2">
                {personalDetails.email && <p>email: "{personalDetails.email}"</p>}
                {personalDetails.github && <p>github: "{personalDetails.github}"</p>}
                {personalDetails.portfolio && <p>web: "{personalDetails.portfolio}"</p>}
                {personalDetails.phone && <p>cell: "{personalDetails.phone}"</p>}
              </div>
            </div>
            {sectionOrder.map((secId) => renderSection(secId))}
          </div>
        );

      // 8. FRESHER (Optimized panels highlighting Education first)
      case 'fresher':
        const fresherOrder = ['education', 'skills', 'projects', 'summary', 'experience', 'additional'];
        return (
          <div className={`p-6 bg-white text-slate-800 text-left ${spacingClass}`}>
            <div className="flex flex-col md:flex-row justify-between items-start pb-3 border-b-2" style={{ borderColor: customization.primaryColor }}>
              <div>
                <h1 className="text-2xl font-bold tracking-tight leading-none">{personalDetails.fullName}</h1>
                <p className="text-xs text-slate-500 font-semibold mt-1">{personalDetails.jobTitle || 'Graduate Trainee'}</p>
              </div>
              <div className="text-xs text-slate-600 mt-2 md:mt-0 space-y-0.5">
                {personalDetails.email && <p>Email: {personalDetails.email}</p>}
                {personalDetails.phone && <p>Phone: {personalDetails.phone}</p>}
                {personalDetails.address && <p>Location: {personalDetails.address}</p>}
              </div>
            </div>
            {fresherOrder.map((secId) => renderSection(secId))}
          </div>
        );

      // 9. DEEDY STYLE (Inspired by Overleaf's Deedy CV: high density, elegant sans+serif combo)
      case 'designer': // Maps to Deedy style in our list
        return (
          <div className="grid grid-cols-12 min-h-[1020px] p-5 bg-white gap-5">
            {/* Header top row */}
            <div className="col-span-12 border-b pb-3 text-left" style={{ borderColor: customization.primaryColor }}>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">{personalDetails.fullName}</h1>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1.5">{personalDetails.jobTitle}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-slate-500 text-[10px] font-semibold mt-2">
                {personalDetails.email && <span>✉ {personalDetails.email}</span>}
                {personalDetails.phone && <span>☎ {personalDetails.phone}</span>}
                {personalDetails.address && <span>📍 {personalDetails.address}</span>}
                {personalDetails.linkedin && <span>🔗 {personalDetails.linkedin}</span>}
              </div>
            </div>

            {/* Left Column (Metadata/Skills) */}
            <div className={`col-span-4 ${spacingClass} border-r border-slate-100 pr-4 text-left`}>
              {renderSection('skills', 'deedy')}
              {renderSection('education', 'deedy')}
              {renderSection('additional', 'deedy')}
            </div>

            {/* Right Column (Experience/Projects/Summary) */}
            <div className={`col-span-8 ${spacingClass} text-left pl-2`}>
              {renderSection('summary', 'deedy')}
              {renderSection('experience', 'deedy')}
              {renderSection('projects', 'deedy')}
            </div>
          </div>
        );

      // 10. JAKE'S RESUME STYLE (LaTeX standard: clean ATS, horizontal rules, dates aligned right)
      case 'onepage': // Maps to Jakes Resume style
        return (
          <div className={`p-6 bg-white text-slate-950 font-sans text-left ${spacingClass} max-h-[1100px] overflow-hidden`}>
            {/* Centered Name and Metadata */}
            <div className="text-center space-y-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">{personalDetails.fullName}</h1>
              <div className="flex justify-center flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-600 font-medium">
                {personalDetails.email && <span>{personalDetails.email}</span>}
                {personalDetails.phone && <span>| {personalDetails.phone}</span>}
                {personalDetails.address && <span>| {personalDetails.address}</span>}
                {personalDetails.linkedin && <span>| <a href={`https://${personalDetails.linkedin}`} className="underline">{personalDetails.linkedin}</a></span>}
                {personalDetails.github && <span>| <a href={`https://${personalDetails.github}`} className="underline">{personalDetails.github}</a></span>}
              </div>
            </div>

            {/* Render sections in ATS formatting */}
            <div className="space-y-3.5">
              {sectionOrder.map((secId) => renderSection(secId, 'jakes'))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={targetRef}
      id="resume-render-root"
      className={`w-full max-w-[800px] mx-auto shadow-xl bg-white border border-slate-200/50 print:border-none print:shadow-none ${fontClass} ${spacingClass}`}
      style={{ padding: `${customization.margins}px`, color: customization.textColor }}
    >
      {renderTemplateLayout()}
    </div>
  );
};
