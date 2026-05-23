import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ResumeData {
  id: string;
  titleName: string; // for draft identification
  updatedAt: string;
  personalDetails: {
    fullName: string;
    jobTitle: string;
    photoUrl: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  careerSummary: {
    aboutMe: string;
    careerObjective: string;
  };
  skills: { id: string; name: string }[];
  experience: {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    techStack: string;
    github: string;
    live: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    year: string;
    cgpa: string;
  }[];
  additional: {
    certifications: string;
    achievements: string;
    languages: string;
    interests: string;
    references: string;
  };
  sectionOrder: string[];
  templateId: string;
  customization: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    fontFamily: string;
    fontSize: 'sm' | 'md' | 'lg';
    spacing: 'compact' | 'comfortable' | 'loose';
    margins: number; // in pixels
    hiddenSections?: string[];
  };
}

export interface ResumeState {
  activeResume: ResumeData;
  drafts: ResumeData[];
}

const defaultResume: ResumeData = {
  id: 'default',
  titleName: 'My Professional Resume',
  updatedAt: new Date().toISOString(),
  personalDetails: {
    fullName: 'Raman Rajput',
    jobTitle: 'Senior Full Stack Engineer',
    photoUrl: '',
    email: 'rs22201227@gmail.com',
    phone: '7324930925',
    address: 'New Delhi, India',
    linkedin: 'linkedin.com/in/ramanrajput',
    github: 'github.com/ramanrajput',
    portfolio: 'ramanrajput.dev',
  },
  careerSummary: {
    aboutMe: 'Results-driven software engineer with 5+ years of experience specializing in React, Node.js, and high-performance cloud architectures. Proven record of optimizing performance and leading agile developer squads.',
    careerObjective: 'To leverage my expertise in full-stack web development to build scalable, secure cloud-based SaaS solutions at a forward-thinking organization.',
  },
  skills: [
    { id: 's1', name: 'React.js & Next.js' },
    { id: 's2', name: 'Node.js & Express' },
    { id: 's3', name: 'TypeScript' },
    { id: 's4', name: 'Tailwind CSS' },
    { id: 's5', name: 'AWS Cloud Services' },
    { id: 's6', name: 'PostgreSQL & Redis' },
  ],
  experience: [
    {
      id: 'exp1',
      company: 'TechSphere Labs',
      role: 'Lead Developer',
      duration: '2022 - Present',
      description: '• Architected and developed Next.js micro-frontends serving 1M+ active monthly visitors.\n• Reduced API latency by 35% through query optimization and Redis integration.\n• Mentored 6 junior devs and introduced clean architecture coding practices.',
    },
    {
      id: 'exp2',
      company: 'Innovate Solutions',
      role: 'Software Engineer',
      duration: '2020 - 2022',
      description: '• Designed RESTful APIs using Node.js and PostgreSQL.\n• Led migration of legacy CSS codebase to Tailwind, improving developer iteration speed by 40%.\n• Maintained 95%+ unit test coverage with Jest.',
    },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'CloudSync Dashboard',
      description: 'Real-time multi-cloud asset manager with visual usage charts and automated costing alerts.',
      techStack: 'React, Tailwind, Express, Chart.js',
      github: 'github.com/ramanrajput/cloudsync',
      live: 'cloudsync.ramanrajput.dev',
    },
    {
      id: 'proj2',
      name: 'SwiftForm UI Library',
      description: 'Extremely fast, accessible custom React form controls builder conforming to WAI-ARIA standards.',
      techStack: 'TypeScript, Tailwind CSS, React',
      github: 'github.com/ramanrajput/swiftform',
      live: 'swiftform.js.org',
    },
  ],
  education: [
    {
      id: 'edu1',
      school: 'University of Washington',
      degree: 'B.S. in Computer Science',
      year: '2016 - 2020',
      cgpa: '3.82 / 4.00',
    },
  ],
  additional: {
    certifications: 'AWS Certified Solutions Architect (Associate), Certified Kubernetes Administrator (CKA)',
    achievements: 'Winner of Hackathon Seattle 2021 (Best Scalable App Category), Open source contributor to Vite and Tailwind plugins.',
    languages: 'English (Fluent), Spanish (Conversational), German (Beginner)',
    interests: 'Open Source contributing, Hiking & Rock Climbing, Retro Arcade Games',
    references: 'Available upon professional request.',
  },
  sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'additional'],
  templateId: 'modern',
  customization: {
    primaryColor: '#4f46e5', // Indigo-600
    secondaryColor: '#0f172a', // Slate-900
    textColor: '#334155', // Slate-700
    fontFamily: 'font-sans',
    fontSize: 'md',
    spacing: 'comfortable',
    margins: 24,
    hiddenSections: [],
  },
};

const getSavedDrafts = (): ResumeData[] => {
  try {
    const oldRaw = localStorage.getItem('resumecraft_resume_drafts');
    const newRaw = localStorage.getItem('resumate_resume_drafts');
    
    if (newRaw) {
      return JSON.parse(newRaw);
    } else if (oldRaw) {
      localStorage.setItem('resumate_resume_drafts', oldRaw);
      localStorage.removeItem('resumecraft_resume_drafts');
      return JSON.parse(oldRaw);
    }
    return [];
  } catch {
    return [];
  }
};

const initialState: ResumeState = {
  activeResume: defaultResume,
  drafts: getSavedDrafts(),
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalDetails(state, action: PayloadAction<Partial<ResumeData['personalDetails']>>) {
      state.activeResume.personalDetails = {
        ...state.activeResume.personalDetails,
        ...action.payload,
      };
      state.activeResume.updatedAt = new Date().toISOString();
    },
    updateCareerSummary(state, action: PayloadAction<Partial<ResumeData['careerSummary']>>) {
      state.activeResume.careerSummary = {
        ...state.activeResume.careerSummary,
        ...action.payload,
      };
      state.activeResume.updatedAt = new Date().toISOString();
    },
    setSkills(state, action: PayloadAction<ResumeData['skills']>) {
      state.activeResume.skills = action.payload;
      state.activeResume.updatedAt = new Date().toISOString();
    },
    setExperience(state, action: PayloadAction<ResumeData['experience']>) {
      state.activeResume.experience = action.payload;
      state.activeResume.updatedAt = new Date().toISOString();
    },
    setProjects(state, action: PayloadAction<ResumeData['projects']>) {
      state.activeResume.projects = action.payload;
      state.activeResume.updatedAt = new Date().toISOString();
    },
    setEducation(state, action: PayloadAction<ResumeData['education']>) {
      state.activeResume.education = action.payload;
      state.activeResume.updatedAt = new Date().toISOString();
    },
    updateAdditional(state, action: PayloadAction<Partial<ResumeData['additional']>>) {
      state.activeResume.additional = {
        ...state.activeResume.additional,
        ...action.payload,
      };
      state.activeResume.updatedAt = new Date().toISOString();
    },
    updateCustomization(state, action: PayloadAction<Partial<ResumeData['customization']>>) {
      state.activeResume.customization = {
        ...state.activeResume.customization,
        ...action.payload,
      };
    },
    setSectionOrder(state, action: PayloadAction<string[]>) {
      state.activeResume.sectionOrder = action.payload;
    },
    setTemplateId(state, action: PayloadAction<string>) {
      state.activeResume.templateId = action.payload;
    },
    setActiveResume(state, action: PayloadAction<ResumeData>) {
      state.activeResume = action.payload;
    },
    loadDraft(state, action: PayloadAction<string>) {
      const draft = state.drafts.find((d) => d.id === action.payload);
      if (draft) {
        state.activeResume = draft;
      }
    },
    saveCurrentAsDraft(state, action: PayloadAction<string>) {
      const title = action.payload || state.activeResume.titleName;
      const isNew = state.activeResume.id === 'default' || !state.activeResume.id;
      
      const newDraft: ResumeData = {
        ...state.activeResume,
        id: isNew ? 'res_' + Date.now().toString() : state.activeResume.id,
        titleName: title,
        updatedAt: new Date().toISOString(),
      };

      state.activeResume = newDraft;

      const existingIndex = state.drafts.findIndex((d) => d.id === newDraft.id);
      if (existingIndex > -1) {
        state.drafts[existingIndex] = newDraft;
      } else {
        state.drafts.push(newDraft);
      }
      localStorage.setItem('resumate_resume_drafts', JSON.stringify(state.drafts));
    },
    deleteDraft(state, action: PayloadAction<string>) {
      state.drafts = state.drafts.filter((d) => d.id !== action.payload);
      localStorage.setItem('resumate_resume_drafts', JSON.stringify(state.drafts));
    },
    createNewResume(state) {
      state.activeResume = {
        ...defaultResume,
        id: 'res_' + Date.now().toString(),
        titleName: 'Untitled Resume',
        updatedAt: new Date().toISOString(),
        personalDetails: {
          fullName: '',
          jobTitle: '',
          photoUrl: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          github: '',
          portfolio: '',
        },
        careerSummary: { aboutMe: '', careerObjective: '' },
        skills: [],
        experience: [],
        projects: [],
        education: [],
        additional: {
          certifications: '',
          achievements: '',
          languages: '',
          interests: '',
          references: '',
        },
      };
    },
    toggleSectionVisibility(state, action: PayloadAction<string>) {
      const sectionId = action.payload;
      if (!state.activeResume.customization.hiddenSections) {
        state.activeResume.customization.hiddenSections = [];
      }
      const index = state.activeResume.customization.hiddenSections.indexOf(sectionId);
      if (index > -1) {
        state.activeResume.customization.hiddenSections.splice(index, 1);
      } else {
        state.activeResume.customization.hiddenSections.push(sectionId);
      }
    },
  },
});

export const {
  updatePersonalDetails,
  updateCareerSummary,
  setSkills,
  setExperience,
  setProjects,
  setEducation,
  updateAdditional,
  updateCustomization,
  setSectionOrder,
  setTemplateId,
  setActiveResume,
  loadDraft,
  saveCurrentAsDraft,
  deleteDraft,
  createNewResume,
  toggleSectionVisibility,
} = resumeSlice.actions;

export default resumeSlice.reducer;
