import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateCustomization, setTemplateId, saveCurrentAsDraft } from '../redux/biodataSlice';
import { BiodataForm } from '../forms/BiodataForm';
import { BiodataTemplateRenderer } from '../templates/BiodataTemplates';
import { motion, AnimatePresence } from 'framer-motion';

const COLOR_PALETTES = [
  { hex: '#b91c1c', label: 'Traditional Red' },
  { hex: '#881337', label: 'Royal Crimson' },
  { hex: '#0f766e', label: 'Matrimonial Teal' },
  { hex: '#d97706', label: 'Saffron Gold' },
  { hex: '#047857', label: 'Islamic Green' },
  { hex: '#312e81', label: 'Indigo Classic' },
];

const FONTS = [
  { value: 'font-serif', label: 'Traditional Serif' },
  { value: 'font-sans', label: 'Modern Sans' },
  { value: 'font-mono', label: 'Minimalist Mono' },
];

export const BiodataBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const biodata = useAppSelector((state) => state.biodata.activeBiodata);

  const previewRef = useRef<HTMLDivElement>(null);

  const [activeControlTab, setActiveControlTab] = useState<'content' | 'style'>('content');
  const [mobilePanelTab, setMobilePanelTab] = useState<'edit' | 'preview'>('edit');
  const [draftTitle, setDraftTitle] = useState(biodata.titleName);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const templatesList = [
    { id: 'traditional', name: 'Traditional Hindu' },
    { id: 'modern', name: 'Modern Elegant' },
    { id: 'royal', name: 'Royal Crimson' },
    { id: 'premium', name: 'Teal & Gold' },
    { id: 'minimal', name: 'Minimalist' },
    { id: 'professional', name: 'Professional Pro' },
    { id: 'southindian', name: 'South Indian' },
    { id: 'muslim', name: 'Islamic Green' },
    { id: 'photocentric', name: 'Photo Centric' },
    { id: 'classic', name: 'Classic Scroll' },
  ];

  const handleSaveDraft = () => {
    dispatch(saveCurrentAsDraft(draftTitle));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };



  const handlePrint = () => {
    const el = document.getElementById('biodata-render-root');
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
          <title>Biodata \u2013 ${draftTitle || 'ResuMate'}</title>
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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">

      {/* MOBILE TOP TAB SWITCHER: Edit / Preview */}
      <div className="no-print lg:hidden flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <button
          onClick={() => setMobilePanelTab('edit')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${mobilePanelTab === 'edit' ? 'border-red-500 text-red-500 bg-slate-50 dark:bg-slate-800' : 'border-transparent text-slate-500 dark:text-slate-400'}`}
        >
          ✏️ Edit Biodata
        </button>
        <button
          onClick={() => setMobilePanelTab('preview')}
          className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all ${mobilePanelTab === 'preview' ? 'border-red-500 text-red-500 bg-slate-50 dark:bg-slate-800' : 'border-transparent text-slate-500 dark:text-slate-400'}`}
        >
          👁️ Preview
        </button>
      </div>

      {/* 1. LEFT COLUMN: FORMS AND CUSTOMIZERS */}
      <div className={`no-print w-full lg:w-[480px] xl:w-[520px] flex flex-col lg:h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 lg:shrink-0 relative z-10 shadow-sm ${mobilePanelTab === 'edit' ? 'flex' : 'hidden lg:flex'}`}
        style={{ height: mobilePanelTab === 'edit' ? 'calc(100vh - 4rem - 41px)' : undefined }}
      >
        
        {/* Draft Title & Save header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center gap-3">
          <input
            type="text"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm font-bold text-slate-800 dark:text-white border-b border-transparent hover:border-slate-300 focus:border-red-500 focus:outline-none py-1"
            placeholder="Draft Name"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSaveDraft}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow transition-colors flex items-center space-x-1 cursor-pointer"
          >
            {saveSuccess ? (
              <><span>✓</span> <span>Saved</span></>
            ) : (
              <span>Save Draft</span>
            )}
          </motion.button>
        </div>

        {/* Tab Controllers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-505 dark:text-slate-400 bg-slate-50/20 dark:bg-slate-900">
          <button
            onClick={() => setActiveControlTab('content')}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-all duration-200 ${activeControlTab === 'content' ? 'border-red-600 text-red-650 bg-slate-50/50 dark:bg-slate-800' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Matrimonial Fields
          </button>
          <button
            onClick={() => setActiveControlTab('style')}
            className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-all duration-200 ${activeControlTab === 'style' ? 'border-red-600 text-red-655 bg-slate-50/50 dark:bg-slate-800' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Visual Border Themes
          </button>
        </div>

        {/* Form controls area with sliding tab reveals */}
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
              {activeControlTab === 'content' && <BiodataForm />}

              {activeControlTab === 'style' && (
                <div className="space-y-6 text-left">
                  
                  {/* Select template */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Change Template Design</label>
                    <div className="grid grid-cols-2 gap-2">
                      {templatesList.map((tpl) => (
                        <motion.button
                          key={tpl.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => dispatch(setTemplateId(tpl.id))}
                          className={`py-2 px-3 border rounded-xl text-left transition-colors text-xs font-semibold cursor-pointer ${
                            biodata.templateId === tpl.id
                              ? 'border-red-500 bg-red-600/10 text-red-600 dark:text-red-400 font-bold'
                              : 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-350 dark:hover:border-slate-700'
                          }`}
                        >
                          {tpl.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Accent Color picker */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2.5">Primary Theme Color</label>
                    <div className="flex flex-wrap gap-2.5 items-center">
                      {COLOR_PALETTES.map((color) => (
                        <motion.button
                          key={color.hex}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={() => dispatch(updateCustomization({ primaryColor: color.hex }))}
                          className={`w-6 h-6 rounded-full border cursor-pointer transition-transform ${biodata.customization.primaryColor === color.hex ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}
                          style={{ backgroundColor: color.hex, borderColor: 'rgba(0,0,0,0.1)' }}
                          title={color.label}
                        />
                      ))}
                      <input
                        type="color"
                        value={biodata.customization.primaryColor}
                        onChange={(e) => dispatch(updateCustomization({ primaryColor: e.target.value }))}
                        className="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Border configuration */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Border Style Layout</label>
                    <div className="grid grid-cols-2 gap-2">
                      {([
                        { value: 'traditional', label: 'Traditional Double' },
                        { value: 'royal', label: 'Royal Filigree' },
                        { value: 'minimal', label: 'Minimalist Clean' },
                        { value: 'modern', label: 'Modern Curved' },
                      ] as const).map((style) => (
                        <motion.button
                          key={style.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => dispatch(updateCustomization({ borderStyle: style.value }))}
                          className={`py-2 px-3 border rounded-xl text-center text-xs font-bold cursor-pointer ${
                            biodata.customization.borderStyle === style.value
                              ? 'border-red-500 bg-red-600/10 text-red-600 dark:text-red-400'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {style.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Corner Symbols toggle */}
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-205">Show Spiritual Header Symbols</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Toggle Om (🕉️), Crescent (🌙), or decorative floral motifs.</p>
                    </div>
                    <button
                      onClick={() => dispatch(updateCustomization({ cornerDecor: !biodata.customization.cornerDecor }))}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-200 cursor-pointer ${biodata.customization.cornerDecor ? 'bg-red-600 text-right' : 'bg-slate-300 dark:bg-slate-800 text-left'}`}
                    >
                      <span className="inline-block w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                  </div>

                  {/* Custom fonts */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Matrimonial Typography</label>
                    <div className="grid grid-cols-3 gap-2">
                      {FONTS.map((font) => (
                        <motion.button
                          key={font.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => dispatch(updateCustomization({ fontFamily: font.value }))}
                          className={`py-2 border rounded-xl text-center text-xs font-bold cursor-pointer ${
                            biodata.customization.fontFamily === font.value
                              ? 'border-red-500 bg-red-650/10 text-red-600'
                              : 'border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          {font.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Text Sizing scale */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2">Base Text Scale</label>
                    <div className="flex border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs font-bold text-slate-500">
                      {(['sm', 'md', 'lg'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => dispatch(updateCustomization({ fontSize: size }))}
                          className={`flex-1 py-2 text-center cursor-pointer transition-colors ${
                            biodata.customization.fontSize === size
                              ? 'bg-red-600 text-white'
                              : 'bg-transparent text-slate-605 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
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
                    <div className="flex border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs font-bold text-slate-500">
                      {(['compact', 'comfortable', 'loose'] as const).map((sp) => (
                        <button
                          key={sp}
                          onClick={() => dispatch(updateCustomization({ spacing: sp }))}
                          className={`flex-1 py-2 text-center cursor-pointer transition-colors ${
                            biodata.customization.spacing === sp
                              ? 'bg-red-600 text-white'
                              : 'bg-transparent text-slate-605 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {sp.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 2. RIGHT COLUMN: PREVIEW AND EXPORTS */}
      <div className={`flex-1 bg-slate-100 dark:bg-slate-900/40 p-4 lg:p-6 overflow-y-auto flex flex-col items-center relative ${mobilePanelTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
        

        {/* Top actions bar */}
        <div className="no-print w-full max-w-full lg:max-w-[750px] flex justify-between items-center mb-4 px-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-red-550 animate-pulse" />
            <span className="hidden sm:inline">Matrimonial Canvas Sheet</span>
            <span className="sm:hidden">Preview</span>
          </span>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePrint}
              className="px-3 py-2 lg:px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-500/20 flex items-center space-x-1.5 cursor-pointer"
            >
              🖨️ <span>Print / Save PDF</span>
            </motion.button>
          </div>
        </div>

        {/* Biodata preview sheet rendering */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full flex-1 flex justify-center items-start print:p-0"
        >
          <div className="w-full mobile-preview-scale lg:max-w-[750px] lg:w-full">
            <BiodataTemplateRenderer data={biodata} targetRef={previewRef} />
          </div>
        </motion.div>

      </div>

    </div>
  );
};
