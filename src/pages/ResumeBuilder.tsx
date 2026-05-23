import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateCustomization, setTemplateId, saveCurrentAsDraft, setSectionOrder, toggleSectionVisibility } from '../redux/resumeSlice';
import { ResumeForm } from '../forms/ResumeForm';
import { ResumeTemplateRenderer } from '../templates/ResumeTemplates';
import { DndReorderList } from '../components/DndReorderList';

import { motion, AnimatePresence } from 'framer-motion';

const COLOR_PALETTES = [
  { hex: '#4f46e5', label: 'Indigo Pro' },
  { hex: '#10b981', label: 'Emerald Tech' },
  { hex: '#0284c7', label: 'Sky Corporate' },
  { hex: '#e11d48', label: 'Rose Creative' },
  { hex: '#d97706', label: 'Amber Warm' },
  { hex: '#334155', label: 'Slate Minimal' },
];

const FONTS = [
  { value: 'font-sans', label: 'Modern Sans' },
  { value: 'font-serif', label: 'Elegant Serif' },
  { value: 'font-mono', label: 'Developer Mono' },
];

export const ResumeBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume.activeResume);

  const previewRef = useRef<HTMLDivElement>(null);

  const [activeControlTab, setActiveControlTab] = useState<'content' | 'style' | 'layout'>('content');
  const [draftTitle, setDraftTitle] = useState(resume.titleName);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Template select list
  const templatesList = [
    { id: 'modern', name: 'Modern' },
    { id: 'ats', name: 'ATS Friendly' },
    { id: 'minimal', name: 'Minimalist' },
    { id: 'creative', name: 'Creative' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'executive', name: 'Executive' },
    { id: 'developer', name: 'Developer' },
    { id: 'fresher', name: 'Fresher' },
    { id: 'designer', name: 'Designer' },
    { id: 'onepage', name: 'One Page' },
  ];

  const handleSaveDraft = () => {
    dispatch(saveCurrentAsDraft(draftTitle));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };



  const handlePrint = () => {
    const el = document.getElementById('resume-render-root');
    if (!el) { window.print(); return; }

    // Collect all compiled stylesheets from the current page
    const styleTags = Array.from(document.querySelectorAll('style'))
      .map((s) => `<style>${s.innerHTML}</style>`)
      .join('\n');
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((l) => l.outerHTML)
      .join('\n');

    const printWin = window.open('', '_blank', 'width=900,height=1200');
    if (!printWin) { window.print(); return; }

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume – ${draftTitle || 'ResuMate'}</title>
          <meta charset="utf-8"/>
          ${linkTags}
          ${styleTags}
          <style>
            body { background: #fff !important; margin: 0; padding: 16px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 0.5cm; size: A4 portrait; }
          </style>
        </head>
        <body>${el.outerHTML}</body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => { printWin.print(); printWin.close(); }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      
      {/* 1. LEFT COLUMN: FORMS AND CUSTOMIZERS */}
      <div className="no-print w-full lg:w-[480px] xl:w-[520px] flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 relative z-10 shadow-sm">
        
        {/* Save & Templates header toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center gap-3">
          <input
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm font-bold text-slate-800 dark:text-white border-b border-transparent hover:border-slate-300 focus:border-violet-500 focus:outline-none py-1"
            placeholder="Draft Name"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSaveDraft}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow transition-colors flex items-center space-x-1 cursor-pointer"
          >
            {saveSuccess ? (
              <><span>✓</span> <span>Saved</span></>
            ) : (
              <span>Save Draft</span>
            )}
          </motion.button>
        </div>

        {/* Form panel tab controllers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50/20 dark:bg-slate-900">
          <button
            onClick={() => setActiveControlTab('content')}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-all duration-200 ${activeControlTab === 'content' ? 'border-violet-500 text-violet-500 bg-slate-50/50 dark:bg-slate-850' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Form Input
          </button>
          <button
            onClick={() => setActiveControlTab('style')}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-all duration-200 ${activeControlTab === 'style' ? 'border-violet-500 text-violet-500 bg-slate-50/50 dark:bg-slate-850' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Custom Style
          </button>
          <button
            onClick={() => setActiveControlTab('layout')}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-all duration-200 ${activeControlTab === 'layout' ? 'border-violet-500 text-violet-500 bg-slate-50/50 dark:bg-slate-850' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Arrange Layout
          </button>
        </div>

        {/* Tab content area with sliding transitions */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeControlTab}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="h-full"
            >
              {/* TAB 1: FORM CONTROLS */}
              {activeControlTab === 'content' && <ResumeForm />}

              {/* TAB 2: STYLING WIDGETS */}
              {activeControlTab === 'style' && (
                <div className="space-y-6 text-left">
                  
                  {/* Template selector overlay */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Change Template layout</label>
                    <div className="grid grid-cols-2 gap-2">
                      {templatesList.map((tpl) => (
                        <motion.button
                          key={tpl.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => dispatch(setTemplateId(tpl.id))}
                          className={`py-2 px-3 border rounded-xl text-left transition-colors text-xs font-semibold cursor-pointer ${
                            resume.templateId === tpl.id
                              ? 'border-violet-500 bg-violet-600/10 text-violet-650 dark:text-violet-400 font-bold'
                              : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-655 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-700'
                          }`}
                        >
                          {tpl.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Spacing color controls */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2.5">Primary Accent Color</label>
                    <div className="flex flex-wrap gap-2.5 items-center">
                      {COLOR_PALETTES.map((color) => (
                        <motion.button
                          key={color.hex}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => dispatch(updateCustomization({ primaryColor: color.hex }))}
                          className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${resume.customization.primaryColor === color.hex ? 'ring-2 ring-violet-500 ring-offset-2' : ''}`}
                          style={{ backgroundColor: color.hex, borderColor: 'rgba(0,0,0,0.1)' }}
                          title={color.label}
                        />
                      ))}
                      {/* Custom color input picker */}
                      <input
                        type="color"
                        value={resume.customization.primaryColor}
                        onChange={(e) => dispatch(updateCustomization({ primaryColor: e.target.value }))}
                        className="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Fonts customizer */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Typography Font</label>
                    <div className="grid grid-cols-3 gap-2">
                      {FONTS.map((font) => (
                        <motion.button
                          key={font.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => dispatch(updateCustomization({ fontFamily: font.value }))}
                          className={`py-2 border rounded-xl text-center text-xs font-bold cursor-pointer ${
                            resume.customization.fontFamily === font.value
                              ? 'border-violet-500 bg-violet-600/10 text-violet-650 dark:text-violet-400'
                              : 'border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {font.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Font size customizer */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Base Font Size</label>
                    <div className="flex border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs font-bold text-slate-500">
                      {(['sm', 'md', 'lg'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => dispatch(updateCustomization({ fontSize: size }))}
                          className={`flex-1 py-2 text-center cursor-pointer transition-colors ${
                            resume.customization.fontSize === size
                              ? 'bg-violet-600 text-white'
                              : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Line height Spacing */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Line Spacing</label>
                    <div className="flex border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs font-bold text-slate-505">
                      {(['compact', 'comfortable', 'loose'] as const).map((sp) => (
                        <button
                          key={sp}
                          onClick={() => dispatch(updateCustomization({ spacing: sp }))}
                          className={`flex-1 py-2 text-center cursor-pointer transition-colors ${
                            resume.customization.spacing === sp
                              ? 'bg-violet-600 text-white'
                              : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {sp.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Margins controller */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase">Document Margins</label>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{resume.customization.margins}px</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="48"
                      value={resume.customization.margins}
                      onChange={(e) => dispatch(updateCustomization({ margins: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                    />
                  </div>

                </div>
              )}

              {/* TAB 3: ARRANGEMENT (DRAG AND DROP) */}
              {activeControlTab === 'layout' && (
                <div className="space-y-4 text-left">
                  <div className="space-y-1 mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Arrange Resume Sections</h3>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Drag the grab handles or use the up/down arrows to reorder sections. Changes will reflect instantly on the print canvas layout.
                    </p>
                  </div>

                  <DndReorderList
                    items={resume.sectionOrder}
                    labels={{
                      summary: 'Professional Summary',
                      skills: 'Core Skills',
                      experience: 'Work Experience',
                      projects: 'Projects',
                      education: 'Education',
                      additional: 'Additional Info',
                    }}
                    hiddenItems={resume.customization.hiddenSections || []}
                    onToggleVisibility={(secId) => dispatch(toggleSectionVisibility(secId))}
                    onReorder={(newOrder) => dispatch(setSectionOrder(newOrder))}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 2. RIGHT COLUMN: PREVIEW AND EXPORT TOOLBAR */}
      <div className="flex-1 bg-slate-100 dark:bg-slate-900/40 p-6 overflow-y-auto flex flex-col items-center relative">
        
        {/* Top export trigger buttons bar */}
        <div className="no-print max-w-[800px] w-full flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Layout Sheet</span>
          </span>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center space-x-1.5 cursor-pointer"
            >
              🖨️ <span>Print / Save PDF</span>
            </motion.button>
          </div>
        </div>

        {/* Resume document canvas container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full flex-1 flex justify-center items-start print:p-0"
        >
          <ResumeTemplateRenderer data={resume} targetRef={previewRef} />
        </motion.div>

      </div>

    </div>
  );
};
