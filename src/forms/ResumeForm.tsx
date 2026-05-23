import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  updatePersonalDetails,
  updateCareerSummary,
  setSkills,
  setExperience,
  setProjects,
  setEducation,
  updateAdditional,
  toggleSectionVisibility,
} from '../redux/resumeSlice';

export const ResumeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume.activeResume);

  const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'skills' | 'experience' | 'projects' | 'education' | 'extras'>('personal');

  // Local state helper for adding list items
  const [skillInput, setSkillInput] = useState('');

  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expDuration, setExpDuration] = useState('');
  const [expDesc, setExpDesc] = useState('');

  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projGit, setProjGit] = useState('');
  const [projLive, setProjLive] = useState('');

  const [eduSchool, setEduSchool] = useState('');
  const [eduDegree, setEduDegree] = useState('');
  const [eduYear, setEduYear] = useState('');
  const [eduCgpa, setEduCgpa] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updatePersonalDetails({ photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    dispatch(setSkills([...resume.skills, { id: 'sk_' + Date.now().toString(), name: skillInput.trim() }]));
    setSkillInput('');
  };

  const removeSkill = (id: string) => {
    dispatch(setSkills(resume.skills.filter((s) => s.id !== id)));
  };

  const addExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expCompany.trim() || !expRole.trim()) return;
    dispatch(
      setExperience([
        ...resume.experience,
        {
          id: 'exp_' + Date.now(),
          company: expCompany.trim(),
          role: expRole.trim(),
          duration: expDuration.trim() || 'Present',
          description: expDesc.trim(),
        },
      ])
    );
    setExpCompany('');
    setExpRole('');
    setExpDuration('');
    setExpDesc('');
  };

  const removeExperience = (id: string) => {
    dispatch(setExperience(resume.experience.filter((e) => e.id !== id)));
  };

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;
    dispatch(
      setProjects([
        ...resume.projects,
        {
          id: 'proj_' + Date.now(),
          name: projName.trim(),
          description: projDesc.trim(),
          techStack: projTech.trim(),
          github: projGit.trim(),
          live: projLive.trim(),
        },
      ])
    );
    setProjName('');
    setProjDesc('');
    setProjTech('');
    setProjGit('');
    setProjLive('');
  };

  const removeProject = (id: string) => {
    dispatch(setProjects(resume.projects.filter((p) => p.id !== id)));
  };

  const addEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduSchool.trim() || !eduDegree.trim()) return;
    dispatch(
      setEducation([
        ...resume.education,
        {
          id: 'edu_' + Date.now(),
          school: eduSchool.trim(),
          degree: eduDegree.trim(),
          year: eduYear.trim(),
          cgpa: eduCgpa.trim(),
        },
      ])
    );
    setEduSchool('');
    setEduDegree('');
    setEduYear('');
    setEduCgpa('');
  };

  const removeEducation = (id: string) => {
    dispatch(setEducation(resume.education.filter((e) => e.id !== id)));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Scrollable Tab bar horizontal */}
      <div className="flex border-b border-slate-800 bg-slate-950 overflow-x-auto scrollbar-none">
        {(['personal', 'summary', 'skills', 'experience', 'projects', 'education', 'extras'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? 'border-violet-500 text-violet-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Editor Panels container */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-left">
        {/* PERSONAL DETAILS TAB */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.personalDetails.fullName}
                  onChange={(e) => dispatch(updatePersonalDetails({ fullName: e.target.value }))}
                  placeholder="e.g. Raman Rajput"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Job Title</label>
                <input
                  type="text"
                  value={resume.personalDetails.jobTitle}
                  onChange={(e) => dispatch(updatePersonalDetails({ jobTitle: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="e.g. Lead Software Engineer"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Profile Photo</label>
                <div className="flex items-center space-x-4">
                  {resume.personalDetails.photoUrl && (
                    <img src={resume.personalDetails.photoUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                  />
                  {resume.personalDetails.photoUrl && (
                    <button
                      type="button"
                      onClick={() => dispatch(updatePersonalDetails({ photoUrl: '' }))}
                      className="text-xs text-red-400 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={resume.personalDetails.email}
                  onChange={(e) => dispatch(updatePersonalDetails({ email: e.target.value }))}
                  placeholder="rs22201227@gmail.com"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Phone</label>
                <input
                  type="text"
                  value={resume.personalDetails.phone}
                  onChange={(e) => dispatch(updatePersonalDetails({ phone: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="7324930925"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Address / Location</label>
                <input
                  type="text"
                  value={resume.personalDetails.address}
                  onChange={(e) => dispatch(updatePersonalDetails({ address: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="New Delhi, India"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={resume.personalDetails.linkedin}
                  onChange={(e) => dispatch(updatePersonalDetails({ linkedin: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">GitHub Profile URL</label>
                <input
                  type="text"
                  value={resume.personalDetails.github}
                  onChange={(e) => dispatch(updatePersonalDetails({ github: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="github.com/username"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Portfolio URL</label>
                <input
                  type="text"
                  value={resume.personalDetails.portfolio}
                  onChange={(e) => dispatch(updatePersonalDetails({ portfolio: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                  placeholder="myportfolio.dev"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Career Profile</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(resume.customization.hiddenSections || []).includes('summary')}
                  onChange={() => dispatch(toggleSectionVisibility('summary'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Include in Resume</span>
              </label>
            </div>
            <div className={`space-y-4 ${(resume.customization.hiddenSections || []).includes('summary') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Professional Summary (About Me)</label>
              <textarea
                value={resume.careerSummary.aboutMe}
                onChange={(e) => dispatch(updateCareerSummary({ aboutMe: e.target.value }))}
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="Write a brief professional overview about yourself..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Career Objective</label>
              <textarea
                value={resume.careerSummary.careerObjective}
                onChange={(e) => dispatch(updateCareerSummary({ careerObjective: e.target.value }))}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="Briefly state your career objective..."
              />
            </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Core Skills & Competencies</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(resume.customization.hiddenSections || []).includes('skills')}
                  onChange={() => dispatch(toggleSectionVisibility('skills'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Include in Resume</span>
              </label>
            </div>
            <div className={`space-y-4 ${(resume.customization.hiddenSections || []).includes('skills') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            
            <form onSubmit={addSkill} className="flex space-x-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="e.g. Next.js"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Add Skill
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill.id)}
                    className="text-slate-500 hover:text-red-400 font-bold transition-colors cursor-pointer"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Work History</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(resume.customization.hiddenSections || []).includes('experience')}
                  onChange={() => dispatch(toggleSectionVisibility('experience'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Include in Resume</span>
              </label>
            </div>
            <div className={`space-y-4 ${(resume.customization.hiddenSections || []).includes('experience') ? 'opacity-30 pointer-events-none select-none' : ''}`}>

            {/* List of current experiences */}
            <div className="space-y-3">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="flex justify-between items-start bg-slate-950 p-4 border border-slate-800 rounded-xl">
                  <div>
                    <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                    <p className="text-xs text-slate-400">{exp.company} | {exp.duration}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{exp.description}</p>
                  </div>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-xs text-red-400 hover:underline px-2 py-1 bg-slate-900 border border-slate-800 rounded hover:bg-red-500/10 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Form to add a new experience */}
            <form onSubmit={addExperience} className="border-t border-slate-800 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Add New Work Experience</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Role (e.g. Lead Designer)"
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <input
                type="text"
                placeholder="Duration (e.g. 2023 - Present)"
                value={expDuration}
                onChange={(e) => setExpDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              <textarea
                placeholder="Job Description (bullet points recommended)"
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-violet-600/15 hover:bg-violet-600/30 text-violet-400 hover:text-white border border-violet-500/20 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
              >
                Add Experience Block
              </button>
            </form>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Projects Portfolio</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(resume.customization.hiddenSections || []).includes('projects')}
                  onChange={() => dispatch(toggleSectionVisibility('projects'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Include in Resume</span>
              </label>
            </div>
            <div className={`space-y-4 ${(resume.customization.hiddenSections || []).includes('projects') ? 'opacity-30 pointer-events-none select-none' : ''}`}>

            {/* List current projects */}
            <div className="space-y-3">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="flex justify-between items-start bg-slate-950 p-4 border border-slate-800 rounded-xl">
                  <div>
                    <h4 className="font-bold text-white text-sm">{proj.name}</h4>
                    <p className="text-xs text-slate-400">Tech: {proj.techStack}</p>
                  </div>
                  <button
                    onClick={() => removeProject(proj.id)}
                    className="text-xs text-red-400 hover:underline px-2 py-1 bg-slate-900 border border-slate-800 rounded hover:bg-red-500/10 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Add new Project form */}
            <form onSubmit={addProject} className="border-t border-slate-800 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Add New Project</h4>
              <input
                type="text"
                placeholder="Project Title (e.g. ChatApp)"
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Tech Stack (e.g. React, Node.js)"
                  value={projTech}
                  onChange={(e) => setProjTech(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
                <input
                  type="text"
                  placeholder="Live Link (without https://)"
                  value={projLive}
                  onChange={(e) => setProjLive(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <input
                type="text"
                placeholder="GitHub Repo URL (without https://)"
                value={projGit}
                onChange={(e) => setProjGit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              <textarea
                placeholder="Short project summary..."
                value={projDesc}
                onChange={(e) => setProjDesc(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-violet-600/15 hover:bg-violet-600/30 text-violet-400 hover:text-white border border-violet-500/20 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
              >
                Add Project Block
              </button>
            </form>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Education History</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(resume.customization.hiddenSections || []).includes('education')}
                  onChange={() => dispatch(toggleSectionVisibility('education'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Include in Resume</span>
              </label>
            </div>
            <div className={`space-y-4 ${(resume.customization.hiddenSections || []).includes('education') ? 'opacity-30 pointer-events-none select-none' : ''}`}>

            {/* List current education */}
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start bg-slate-950 p-4 border border-slate-800 rounded-xl">
                  <div>
                    <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                    <p className="text-xs text-slate-400">{edu.school} | {edu.year}</p>
                    <p className="text-xs text-violet-400 font-bold">{edu.cgpa}</p>
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-xs text-red-400 hover:underline px-2 py-1 bg-slate-900 border border-slate-800 rounded hover:bg-red-500/10 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Add new education form */}
            <form onSubmit={addEducation} className="border-t border-slate-800 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Add New Education Block</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Degree (e.g. B.S. in CS)"
                  value={eduDegree}
                  onChange={(e) => setEduDegree(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
                <input
                  type="text"
                  placeholder="School/University"
                  value={eduSchool}
                  onChange={(e) => setEduSchool(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Year (e.g. 2018 - 2022)"
                  value={eduYear}
                  onChange={(e) => setEduYear(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
                <input
                  type="text"
                  placeholder="Score / GPA (e.g. 3.8/4.0)"
                  value={eduCgpa}
                  onChange={(e) => setEduCgpa(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-violet-600/15 hover:bg-violet-600/30 text-violet-400 hover:text-white border border-violet-500/20 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer"
              >
                Add Education Record
              </button>
            </form>
            </div>
          </div>
        )}

        {activeTab === 'extras' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
              <h3 className="text-base font-bold text-white">Additional Information</h3>
              <label className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!(resume.customization.hiddenSections || []).includes('additional')}
                  onChange={() => dispatch(toggleSectionVisibility('additional'))}
                  className="w-4.5 h-4.5 rounded border-slate-800 bg-slate-950 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Include in Resume</span>
              </label>
            </div>
            <div className={`space-y-4 ${(resume.customization.hiddenSections || []).includes('additional') ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Certifications</label>
              <textarea
                value={resume.additional.certifications}
                onChange={(e) => dispatch(updateAdditional({ certifications: e.target.value }))}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="e.g. AWS Solutions Architect, Oracle Java Programmer..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Key Achievements</label>
              <textarea
                value={resume.additional.achievements}
                onChange={(e) => dispatch(updateAdditional({ achievements: e.target.value }))}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="e.g. Winner of Seattle hackathon, contributor to core react..."
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Languages Known</label>
              <input
                type="text"
                value={resume.additional.languages}
                onChange={(e) => dispatch(updateAdditional({ languages: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                placeholder="e.g. English (Native), Spanish (Fluent)"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Interests & Hobbies</label>
              <input
                type="text"
                value={resume.additional.interests}
                onChange={(e) => dispatch(updateAdditional({ interests: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500"
                placeholder="e.g. Hiking, Contributing to OSS, Photography"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">References</label>
              <textarea
                value={resume.additional.references}
                onChange={(e) => dispatch(updateAdditional({ references: e.target.value }))}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
                placeholder="e.g. Dr. Jane Doe (CEO, Innovate Corp) - references@innovate.com"
              />
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
