import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const Home: React.FC = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // 3D Parallax Tilt Effect state hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [12, -12]);
  const rotateY = useTransform(mouseX, [-200, 200], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate mouse position relative to center of the container
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset rotations smoothly
    mouseX.set(0);
    mouseY.set(0);
  };

  const faqs = [
    {
      q: 'Is my personal data secure on ResuMate?',
      a: 'Absolutely. We operate 100% client-side. All input values, resume drafts, and profile pictures are stored directly in your browser\'s LocalStorage. No data is sent to a server.',
    },
    {
      q: 'Can I download my CV or Biodata for free?',
      a: 'Yes, both PDF download and high-resolution PNG exports are completely free of charge. You can print directly or save locally.',
    },
    {
      q: 'Does the Resume Builder support ATS checking?',
      a: 'Yes, we provide special ATS-Friendly templates styled dynamically with clean linear layouts, standard text blocks, and web-safe fonts optimized for robotic parsers.',
    },
    {
      q: 'How do I add or reorder custom resume sections?',
      a: 'Within the Resume Builder, you can utilize our built-in Drag-and-Drop section editor to shift panels (like Education, Projects, and Skills) to any layout position instantly.',
    },
  ];

  // Hero container staggering configuration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Individual hero elements revealing transition
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <div className="relative overflow-x-hidden font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">

        {/* Animated Background Gradients - hidden on mobile to prevent overflow */}
        <div className="hidden md:block absolute top-0 right-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl pointer-events-none dark:bg-violet-600/10 animate-pulse" />
        <div className="hidden md:block absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none dark:bg-indigo-900/10" />

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Tag pill */}
          <motion.div 
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider shadow-sm"
            variants={itemVariants}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            <span>Introducing Version 2.0 with PDF Pagination</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
            variants={itemVariants}
          >
            Craft the Perfect <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-500 bg-clip-text text-transparent">Professional Resume</span> <br className="hidden md:inline"/>
            or Elegant <span className="bg-gradient-to-r from-red-600 via-amber-600 to-rose-500 bg-clip-text text-transparent">Marriage Biodata</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="max-w-2xl mx-auto text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
            variants={itemVariants}
          >
            AI-optimized, beautiful layouts designed in real-time. Secure, fast, and completely client-side. Reorder sections, customize color themes, and print instantly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
            variants={itemVariants}
          >
            <Link
              to="/resume-builder"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer text-sm tracking-wide"
            >
              Build Professional Resume
            </Link>
            <Link
              to="/biodata-builder"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-2xl border border-slate-700 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer text-sm tracking-wide"
            >
              Build Matrimonial Biodata
            </Link>
          </motion.div>

          {/* 3D PARALLAX INTERACTIVE MOCKUPS */}
          <motion.div
            variants={itemVariants}
            className="perspective-1200 pt-16 max-w-4xl mx-auto"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative p-6 md:p-8 bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-2xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/2 transition-shadow duration-500 cursor-grab active:cursor-grabbing"
            >
              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
                style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
              >
                
                {/* Resume Mock Card */}
                <motion.div 
                  style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="p-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 text-left shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="h-2.5 w-16 bg-indigo-600 rounded-full mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Raman Rajput</h4>
                    <p className="text-xs text-indigo-500 font-bold mb-4 uppercase tracking-wider">Senior Software Engineer</p>
                    <div className="space-y-2.5">
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                      <div className="h-1.5 w-5/6 bg-slate-100 dark:bg-slate-800 rounded" />
                      <div className="h-1.5 w-4/5 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                    <span className="text-[9px] bg-indigo-500/10 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-2.5 py-0.5 rounded font-bold uppercase">React</span>
                    <span className="text-[9px] bg-violet-500/10 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400 px-2 py-0.5 rounded font-bold uppercase">Tailwind</span>
                    <span className="text-[9px] bg-purple-500/10 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded font-bold uppercase">Next.js</span>
                  </div>
                </motion.div>

                {/* Biodata Mock Card */}
                <motion.div 
                  style={{ transform: 'translateZ(55px) rotate(0.8deg)', transformStyle: 'preserve-3d' }}
                  whileHover={{ scale: 1.03, y: -5, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="p-6 bg-amber-50/10 dark:bg-slate-950 rounded-2xl border-4 border-double border-red-700 text-left shadow-lg relative flex flex-col justify-between"
                >
                  <div className="absolute top-3 right-3 text-lg">🚩</div>
                  <div>
                    <div className="text-center font-serif text-xs font-bold text-red-700 tracking-widest mb-3 uppercase">🕉️ Biodata 🕉️</div>
                    <h4 className="text-lg font-bold text-slate-950 dark:text-white text-center mb-1">Raman Rajput</h4>
                    <div className="h-0.5 bg-red-200 dark:bg-red-950/30 my-3.5" />
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                      <p><span className="font-bold text-slate-900 dark:text-slate-350">DOB:</span> 24th Nov 1995</p>
                      <p><span className="font-bold text-slate-900 dark:text-slate-350">Height:</span> 5 ft 10 in</p>
                      <p><span className="font-bold text-slate-900 dark:text-slate-350">Education:</span> MBA in Finance</p>
                    </div>
                  </div>
                  <div className="mt-5 text-center font-serif text-[10px] text-red-700/80 italic font-bold">
                    Shubha Vivaha
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-indigo-900 dark:bg-indigo-950/80 py-8 text-white relative border-y border-indigo-950/10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">100%</div>
            <div className="text-xs text-indigo-200 mt-1 uppercase tracking-wider font-semibold">Secure LocalStorage</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">20+</div>
            <div className="text-xs text-indigo-200 mt-1 uppercase tracking-wider font-semibold">Premium Templates</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">Instant</div>
            <div className="text-xs text-indigo-200 mt-1 uppercase tracking-wider font-semibold">PDF Downloads</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-default">
            <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent">0 cost</div>
            <div className="text-xs text-indigo-200 mt-1 uppercase tracking-wider font-semibold">Completely Free</div>
          </motion.div>
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white"
            >
              Packed with Robust Features
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-xl mx-auto text-slate-500 dark:text-slate-400 text-sm"
            >
              Tons of customization, drag-and-drop support, and real-time state updates.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6 }}
              className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                🚀
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Split-Screen Live Editor</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Watch changes update in real time on the digital canvas sheet as you type. Switch templates instantly with zero data loss.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6 }}
              className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                🎨
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Theme Customizer</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                Adjust primary colors, border parameters, fonts (Serif, Sans, Mono), text scale, and document margins.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -6 }}
              className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                🔒
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Privacy First Architecture</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                No database. No third-party servers. All inputs and uploads remain on your machine inside LocalStorage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TEMPLATES SPOTLIGHT */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-900/60 text-left">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Explore Gallery Layouts</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">Pick a pre-formatted blueprint and make it yours.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/resume-templates" className="px-5 py-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold transition-colors">
                Resume Templates
              </Link>
              <Link to="/biodata-templates" className="px-5 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold transition-colors">
                Matrimonial Templates
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 85 }}
              whileHover={{ scale: 1.01 }}
              className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[10px] text-indigo-500 uppercase font-bold tracking-wider">Professional</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2">Modern Resume Design</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  Engineered with a sleek side-panel layout, bold typographic hierarchy, and custom tech skill badges. Perfect for engineers, marketers, and developers.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/resume-builder" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 inline-flex items-center gap-1">
                  Launch Editor <span className="group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 85 }}
              whileHover={{ scale: 1.01 }}
              className="relative group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-[10px] text-red-500 uppercase font-bold tracking-wider">Culture</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2">Traditional Hindu Biodata</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  Styled with red and gold double lines, decorative Ganesha and floral corner motifs, and elegant serif typography fit for traditional matrimonial matchings.
                </p>
              </div>
              <div className="pt-6">
                <Link to="/biodata-builder" className="text-xs font-bold text-red-600 dark:text-red-400 group-hover:text-red-500 inline-flex items-center gap-1">
                  Launch Editor <span className="group-hover:translate-x-1.5 transition-transform duration-200">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FAQs ACCORDION */}
      <section className="py-20 bg-white dark:bg-slate-950 text-left">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-slate-900 dark:text-white text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-800 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-900/80 transition-colors cursor-pointer text-sm"
                >
                  <span>{faq.q}</span>
                  <motion.span 
                    animate={{ rotate: faqOpen === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg text-slate-400"
                  >
                    {faqOpen === idx ? '−' : '+'}
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {faqOpen === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden bg-white dark:bg-slate-950"
                    >
                      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to craft your document?</h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
            Choose a builder and begin. Zero sign-up, zero server storage, completely private.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/resume-builder" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm shadow-lg cursor-pointer">
              Resume Builder
            </Link>
            <Link to="/biodata-builder" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm border border-slate-700 cursor-pointer">
              Biodata Builder
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
