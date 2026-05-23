import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setTemplateId } from '../redux/biodataSlice';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const TEMPLATES = [
  { id: 'traditional', name: 'Traditional Hindu', desc: 'Decorated with traditional red/gold borders, floral corners, and Ganesha motifs.', tag: 'Cultural' },
  { id: 'modern', name: 'Modern Elegant', desc: 'Sleek rounded line borders and clean sans-serif layouts for a contemporary aesthetic.', tag: 'Modern' },
  { id: 'royal', name: 'Royal Style Crimson', desc: 'Filigree double borders on royal cream background layouts for premium families.', tag: 'Premium' },
  { id: 'premium', name: 'Teal & Gold Premium', desc: 'Earthy golden details with professional double line dividing panels.', tag: 'Exquisite' },
  { id: 'minimal', name: 'Slate Minimalist', desc: 'Completely borderless, clean layout concentrating on high readability structures.', tag: 'Minimal' },
  { id: 'professional', name: 'Matrimonial Corporate', desc: 'Clean layouts styled for modern professionals prioritizing work parameters.', tag: 'Executive' },
  { id: 'southindian', name: 'South Indian Yellow', desc: 'Gold/yellow border accents, temple tower symbols, and traditional flourishes.', tag: 'Regional' },
  { id: 'muslim', name: 'Islamic Emerald', desc: 'Islamic geometric frames, emerald banners, and star/crescent motifs.', tag: 'Regional' },
  { id: 'photocentric', name: 'Photo Highlight', desc: 'Places a dominant framed portrait block at the top header layout.', tag: 'Visual Focus' },
  { id: 'classic', name: 'Classic Cursive', desc: 'Subtle gray borders with calligraphic headers and cursive title elements.', tag: 'Classic' },
  { id: 'elegant-wedding', name: 'Elegant Wedding', desc: 'Soft pastels with floral borders and romantic styling.', tag: 'Romantic' },
  { id: 'premium-royal', name: 'Premium Royal', desc: 'Gold/cream royal palace theme with luxury styling.', tag: 'Luxury' },
  { id: 'modern-minimal', name: 'Modern Minimal', desc: 'Clean contemporary minimal design with modern aesthetics.', tag: 'Contemporary' },
  { id: 'traditional-north', name: 'Traditional North', desc: 'North Indian traditional style with Hindi labels.', tag: 'Regional' },
  { id: 'traditional-south', name: 'Traditional South', desc: 'Enhanced South Indian temple style with Tamil labels.', tag: 'Regional' },
  { id: 'islamic-elegant', name: 'Islamic Elegant', desc: 'Refined Islamic geometric patterns with elegant styling.', tag: 'Regional' },
  { id: 'sikh', name: 'Sikh Cultural', desc: 'Sikh cultural elements with orange/blue theme and Punjabi labels.', tag: 'Regional' },
  { id: 'christian', name: 'Christian Style', desc: 'Cross motifs with elegant blue borders and styling.', tag: 'Regional' },
  { id: 'bengali', name: 'Bengali Cultural', desc: 'Bengali cultural patterns with red/gold theme and Bengali labels.', tag: 'Regional' },
  { id: 'contemporary', name: 'Contemporary Blend', desc: 'Modern design blended with traditional elements.', tag: 'Modern' },
];

export const BiodataTemplatesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectTemplate = (id: string) => {
    dispatch(setTemplateId(id));
    navigate('/biodata-builder');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left space-y-10 relative overflow-hidden">
      {/* Background decoration elements - hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute top-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="border-b border-slate-200 dark:border-slate-800 pb-6"
      >
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Matrimonial Biodata Templates</span>
          <span className="text-xs font-bold px-2.5 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full border border-red-500/20">
            {TEMPLATES.length} Available
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Select from our elegant designs crafted with traditional and regional details.</p>
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
              boxShadow: "0 20px 25px -5px rgb(239 68 68 / 0.1), 0 8px 10px -6px rgb(239 68 68 / 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectTemplate(tpl.id)}
            className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between transform-gpu"
          >
            {/* Visual template mock placeholder */}
            <div className="h-48 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6 border-b border-slate-100 dark:border-slate-850/50 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-405 border border-red-500/10 z-10">
                {tpl.tag}
              </span>
              
              {/* Decorative background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

              {/* Abstract icon layout simulating biodata */}
              <div className="w-24 h-32 bg-[#fffbf7] dark:bg-slate-900 rounded border-2 border-red-750/30 dark:border-red-950/40 p-2 relative z-10 transition-transform group-hover:scale-105 duration-350 shadow-md">
                <div className="text-[7px] text-center font-bold text-red-700">🕉️</div>
                <div className="h-1.5 w-12 bg-red-750/30 dark:bg-red-950 mx-auto rounded mt-1" />
                <div className="w-8 h-10 border border-red-200 mx-auto mt-2" />
                <div className="h-0.5 w-4/5 bg-slate-200 mx-auto mt-2" />
                <div className="h-0.5 w-3/4 bg-slate-200 mx-auto mt-1" />
              </div>
            </div>

            {/* Description details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-red-550 transition-colors text-sm">{tpl.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">{tpl.desc}</p>
              </div>
              
              <div className="text-xs font-bold text-red-650 dark:text-red-400 flex items-center group-hover:text-red-500">
                <span>Select this layout</span>
                <span className="ml-1 group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};
