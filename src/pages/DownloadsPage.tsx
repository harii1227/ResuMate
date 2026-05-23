import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { deleteDraft as deleteResumeDraft, loadDraft as loadResumeDraft, createNewResume } from '../redux/resumeSlice';
import { deleteDraft as deleteBiodataDraft, loadDraft as loadBiodataDraft, createNewBiodata } from '../redux/biodataSlice';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const DownloadsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resumeDrafts = useAppSelector((state) => state.resume.drafts);
  const biodataDrafts = useAppSelector((state) => state.biodata.drafts);

  const handleEditResume = (id: string) => {
    dispatch(loadResumeDraft(id));
    navigate('/resume-builder');
  };

  const handleEditBiodata = (id: string) => {
    dispatch(loadBiodataDraft(id));
    navigate('/biodata-builder');
  };

  const handleCreateNewResume = () => {
    dispatch(createNewResume());
    navigate('/resume-builder');
  };

  const handleCreateNewBiodata = () => {
    dispatch(createNewBiodata());
    navigate('/biodata-builder');
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-12 relative overflow-hidden"
    >
      {/* Decorative background gradients - hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Page Title */}
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 relative z-10"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Saved Creations</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Manage, edit, or delete drafts saved in your local web browser.</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreateNewResume}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md shadow-indigo-500/10"
          >
            + New Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreateNewBiodata}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-md shadow-red-500/10"
          >
            + New Biodata
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* RESUMES LIST PANEL */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span>Resume Drafts ({resumeDrafts.length})</span>
          </h2>

          <AnimatePresence mode="wait">
            {resumeDrafts.length === 0 ? (
              <motion.div 
                key="empty-resumes"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3"
              >
                <span className="text-3xl block">📄</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">No saved resumes found.</p>
                <button
                  onClick={handleCreateNewResume}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Create one now &rarr;
                </button>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-4">
                <AnimatePresence initial={false}>
                  {resumeDrafts.map((draft) => (
                    <motion.div
                      layout
                      key={draft.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, padding: 0, marginTop: 0, border: 0 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex justify-between items-center hover:border-indigo-500/20 hover:shadow-md transition-shadow transform-gpu"
                    >
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{draft.titleName}</h3>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold dark:text-slate-400">Template: {draft.templateId}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Updated: {new Date(draft.updatedAt).toLocaleDateString()}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditResume(draft.id)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, color: '#ef4444' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch(deleteResumeDraft(draft.id))}
                          className="p-1.5 text-slate-400 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                          title="Delete Draft"
                        >
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* BIODATAS LIST PANEL */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span>Marriage Biodata Drafts ({biodataDrafts.length})</span>
          </h2>

          <AnimatePresence mode="wait">
            {biodataDrafts.length === 0 ? (
              <motion.div 
                key="empty-biodatas"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3"
              >
                <span className="text-3xl block">🕉️</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">No saved biodatas found.</p>
                <button
                  onClick={handleCreateNewBiodata}
                  className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                >
                  Create one now &rarr;
                </button>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-1 gap-4">
                <AnimatePresence initial={false}>
                  {biodataDrafts.map((draft) => (
                    <motion.div
                      layout
                      key={draft.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30, height: 0, padding: 0, marginTop: 0, border: 0 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex justify-between items-center hover:border-red-500/20 hover:shadow-md transition-shadow transform-gpu"
                    >
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{draft.titleName}</h3>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold dark:text-slate-400">Template: {draft.templateId}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Updated: {new Date(draft.updatedAt).toLocaleDateString()}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditBiodata(draft.id)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, color: '#ef4444' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => dispatch(deleteBiodataDraft(draft.id))}
                          className="p-1.5 text-slate-400 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                          title="Delete Draft"
                        >
                          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </motion.div>
  );
};
