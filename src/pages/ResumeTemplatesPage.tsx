import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setTemplateId } from '../redux/resumeSlice';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const TEMPLATES = [
  { id: 'modern', name: 'Modern Design', desc: 'Stylish dual-column accent side panel. Elegant typography for modern technical roles.', tag: 'Popular' },
  { id: 'ats', name: 'ATS Friendly', desc: 'Strict minimal format optimized for computer parsers and headhunter scanning.', tag: 'Job Search' },
  { id: 'minimal', name: 'Minimalist Clean', desc: 'Spacious margin designs centered on elegant typography structures.', tag: 'Minimal' },
  { id: 'creative', name: 'Creative Focus', desc: 'Features vertical gradient borders and visual badge indicators.', tag: 'Creative' },
  { id: 'corporate', name: 'Corporate Pro', desc: 'Solid dark block headers for a formal executive look.', tag: 'Classic' },
  { id: 'executive', name: 'Executive Navy', desc: 'Two-column design focusing on seniority markers and profile bios.', tag: 'Professional' },
  { id: 'developer', name: 'Software Dev Monospace', desc: 'Monospaced fonts, gray highlight blocks, and command prompt motifs.', tag: 'Tech Special' },
  { id: 'fresher', name: 'Fresher Grid', desc: 'Puts education lists and academic achievements first on page layouts.', tag: 'Graduates' },
  { id: 'designer', name: 'Designer Layout', desc: 'Modern asymmetrical badges, visual headers, and border highlights.', tag: 'Asymmetric' },
  { id: 'onepage', name: 'One Page Compact', desc: 'Dense formatting grids optimized to prevent document overflow.', tag: 'Compact' },
];

export const ResumeTemplatesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectTemplate = (id: string) => {
    dispatch(setTemplateId(id));
    navigate('/resume-builder');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-10 relative">
      {/* Background decoration elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="border-b border-slate-200 dark:border-slate-800 pb-6"
      >
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Resume Templates</span>
          <span className="text-xs font-bold px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            {TEMPLATES.length} Available
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Select from our professional layouts engineered to land interviews.</p>
      </motion.div>

      {/* Grid of templates with perspective support for 3D tilts */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1200 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {TEMPLATES.map((tpl) => (
          <motion.div
            key={tpl.id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03, 
              rotateX: 4, 
              rotateY: -4, 
              z: 15,
              boxShadow: "0 20px 25px -5px rgb(79 70 229 / 0.1), 0 8px 10px -6px rgb(79 70 229 / 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectTemplate(tpl.id)}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform-gpu"
          >
            {/* Visual template mock placeholder */}
            <div className="h-48 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6 border-b border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 z-10">
                {tpl.tag}
              </span>
              
              {/* Decorative background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

              {/* Abstract icon layout simulating resume */}
              <div className="w-28 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 p-2.5 space-y-1.5 shadow-md relative z-10 transition-transform group-hover:scale-105 duration-350">
                <div className="h-1.5 w-10 bg-indigo-500 rounded" />
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-1 w-5/6 bg-slate-100 dark:bg-slate-800 rounded" />
                <div className="h-1.5 w-14 bg-slate-150 dark:bg-slate-800 rounded mt-2" />
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
            </div>

            {/* Description details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors text-sm">{tpl.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">{tpl.desc}</p>
              </div>
              
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center group-hover:text-indigo-500">
                <span>Customize template</span>
                <span className="ml-1 group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};
