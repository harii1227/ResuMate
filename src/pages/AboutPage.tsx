import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const AboutPage: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-16 text-left space-y-12 relative overflow-hidden"
    >
      {/* Decorative background glows - hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-20 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 left-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Intro */}
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 relative z-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:to-slate-350 bg-clip-text text-transparent">
          About ResuMate
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
          ResuMate was founded with a clear, single vision: to build a fast, intuitive, and 100% private document creation portal where users can build stunning resumes and cultural marriage biodatas.
        </p>
      </motion.section>

      {/* Core values grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1000 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
      >
        <motion.div 
          variants={cardVariants}
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)" }}
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 cursor-default transform-gpu"
        >
          <span className="text-2xl">🔒</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Privacy First</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            We don't transmit your names, contact info, job logs, or photos to databases. Everything compiles inside your browser, keeping your identity private.
          </p>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)" }}
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 cursor-default transform-gpu"
        >
          <span className="text-2xl">⚡</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Vite-Powered Speed</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            With hot module reloading (HMR) and a lightning-fast build pipeline, changes propagate instantly.
          </p>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)" }}
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 cursor-default transform-gpu"
        >
          <span className="text-2xl">🕉️</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cultural Customization</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Support for Hindu, South Indian, Muslim, and modern matrimonial biodata styles with specific headers, gotra information, and decorative borders.
          </p>
        </motion.div>

        <motion.div 
          variants={cardVariants}
          whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05)" }}
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 cursor-default transform-gpu"
        >
          <span className="text-2xl">📄</span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">ATS-Optimized Resumes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Designed to pass through applicant tracking systems (ATS) using structured headers, clear timelines, and readable layout flow.
          </p>
        </motion.div>
      </motion.section>

      {/* Tech info */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-indigo-600/5 dark:bg-indigo-950/15 border border-indigo-500/15 p-6 rounded-2xl relative z-10"
      >
        <h3 className="font-bold text-indigo-600 dark:text-indigo-400 text-sm uppercase mb-2">Technical Specification</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
          ResuMate is a React Single Page Application (SPA) built using Vite and Tailwind CSS. The app features state-of-the-art PDF page compilation utilizing client-side canvas scaling (`html2canvas`) and vector PDF generators (`jsPDF`), maintaining full local database replication via window localStorage.
        </p>
      </motion.section>
    </motion.div>
  );
};
