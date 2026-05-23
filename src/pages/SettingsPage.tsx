import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const SettingsPage: React.FC = () => {
  const [resumeCount, setResumeCount] = useState(0);
  const [biodataCount, setBiodataCount] = useState(0);
  const [storageSize, setStorageSize] = useState<string>('0.00 KB');
  const [themePref, setThemePref] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('resumate_theme_preference') as any) || 'system';
  });

  const [pwaInstallable, setPwaInstallable] = useState(!!(window as any).deferredPrompt);

  useEffect(() => {
    // Read count of saved items in storage
    const loadStats = () => {
      try {
        const resumes = localStorage.getItem('resumate_resume_drafts');
        const biodatas = localStorage.getItem('resumate_biodata_drafts');
        
        const rList = resumes ? JSON.parse(resumes) : [];
        const bList = biodatas ? JSON.parse(biodatas) : [];
        
        setResumeCount(rList.length);
        setBiodataCount(bList.length);

        // Estimate storage usage size
        let totalChars = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            totalChars += key.length + (localStorage.getItem(key)?.length || 0);
          }
        }
        const kb = (totalChars * 2) / 1024; // UTF-16 characters are 2 bytes each
        setStorageSize(kb.toFixed(2) + ' KB');
      } catch (e) {
        console.error(e);
      }
    };

    loadStats();

    // Listen to changes in PWA install capability
    const handlePwaInstallable = () => {
      setPwaInstallable(true);
    };
    window.addEventListener('pwa-installable', handlePwaInstallable);

    return () => {
      window.removeEventListener('pwa-installable', handlePwaInstallable);
    };
  }, []);

  const handleThemeSelect = (pref: 'light' | 'dark' | 'system') => {
    setThemePref(pref);
    localStorage.setItem('resumate_theme_preference', pref);
    window.dispatchEvent(new Event('theme-change'));
  };

  const handleClearData = () => {
    if (window.confirm('Are you absolutely sure you want to delete all saved drafts? This action cannot be undone!')) {
      localStorage.removeItem('resumate_resume_drafts');
      localStorage.removeItem('resumate_biodata_drafts');
      setResumeCount(0);
      setBiodataCount(0);
      setStorageSize('0.00 KB');
      alert('All drafts successfully wiped from browser LocalStorage.');
    }
  };

  const handleInstallApp = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) {
      alert('ResuMate is already installed or your browser does not support quick installation. Check your browser address bar for an install icon.');
      return;
    }
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log(`User choice: ${outcome}`);
    (window as any).deferredPrompt = null;
    setPwaInstallable(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-4 py-12 text-left space-y-8 relative"
    >
      {/* Background glow decoration */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-2 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Settings & Preferences
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-slate-500 dark:text-slate-400 text-xs"
        >
          Customize your appearance, install offline options, and manage local storage database properties.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10"
      >
        
        {/* COLUMN 1 & 2: PANELS */}
        <div className="md:col-span-2 space-y-6">
          
          {/* 1. APPEARANCE THEME SELECTOR */}
          <motion.div 
            variants={panelVariants}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Appearance Mode</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Toggle between light themes, dark setups, or system default alignment.</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* Light card */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleThemeSelect('light')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  themePref === 'light'
                    ? 'border-indigo-650 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-650 dark:text-indigo-400 font-extrabold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-355 text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-955/50'
                }`}
              >
                <span className="text-2xl mb-1">☀️</span>
                <span className="text-xs">Light Mode</span>
              </motion.button>

              {/* Dark card */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleThemeSelect('dark')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  themePref === 'dark'
                    ? 'border-indigo-650 bg-indigo-50/50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400 font-extrabold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-355 text-slate-650 dark:text-slate-455 hover:bg-slate-50 dark:hover:bg-slate-955/50'
                }`}
              >
                <span className="text-2xl mb-1">🌙</span>
                <span className="text-xs">Dark Mode</span>
              </motion.button>

              {/* System card */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleThemeSelect('system')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  themePref === 'system'
                    ? 'border-indigo-655 bg-indigo-50/50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400 font-extrabold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-355 text-slate-650 dark:text-slate-455 hover:bg-slate-50 dark:hover:bg-slate-955/50'
                }`}
              >
                <span className="text-2xl mb-1">💻</span>
                <span className="text-xs">System Auto</span>
              </motion.button>
            </div>
          </motion.div>

          {/* 2. PWA OFFLINE INSTALLATION */}
          <motion.div 
            variants={panelVariants}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">PWA Desktop App</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Run ResuMate directly from your applications dock with full offline support.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  {pwaInstallable ? 'Install Ready' : 'App Status'}
                </h4>
                <p className="text-[10px] text-slate-500 leading-normal max-w-sm">
                  {pwaInstallable
                    ? 'ResuMate is fully compliant. Download now for standard desktop application headers.'
                    : 'If already installed or in standalone mode, you can launch directly. Alternatively, use standard browser options (e.g. Add to Home Screen in Safari iOS).'}
                </p>
              </div>

              <AnimatePresence>
                {pwaInstallable && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleInstallApp}
                    className="px-4 py-2 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md shadow-indigo-600/10"
                  >
                    Install Now
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 3. DANGER ZONE RESET LOCAL STORAGE */}
          <motion.div 
            variants={panelVariants}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div>
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider">Danger Zone</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Administrative commands to wipe files from LocalStorage.</p>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-500/10 bg-red-500/5 rounded-xl">
              <div>
                <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">Wipe Saved Creations</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Delete all resume drafts, marriage sheets, and custom setups.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClearData}
                className="px-4 py-2 bg-red-650 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md shadow-red-550/10"
              >
                Wipe All Data
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* COLUMN 3: METRICS & SUPPORT */}
        <div className="space-y-6">
          
          {/* Storage stats */}
          <motion.div 
            variants={panelVariants}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-center"
          >
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider text-left">Storage Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <span className="block text-xl font-black text-indigo-500">{resumeCount}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Resumes</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850">
                <span className="block text-xl font-black text-red-500">{biodataCount}</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Biodatas</span>
              </motion.div>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-850 text-xs">
              <span className="text-slate-405 mr-1.5 font-medium">Local Size:</span>
              <span className="font-bold text-slate-850 dark:text-slate-200">{storageSize}</span>
            </div>
          </motion.div>

          {/* Support details */}
          <motion.div 
            variants={panelVariants}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Helpline & Support</h3>
            <p className="text-[10px] text-slate-505 leading-normal">
              Need assistance with document layout, custom photo formats, or page-break templates? Talk to us.
            </p>
            <div className="space-y-2.5 text-xs">
              <motion.div whileHover={{ x: 3 }} className="flex items-center space-x-2.5">
                <span className="text-base">📞</span>
                <a href="tel:+917324930925" className="hover:underline font-bold text-slate-855 dark:text-slate-250">
                  +91 7324930925
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="flex items-center space-x-2.5">
                <span className="text-base">✉️</span>
                <a href="mailto:rs22201227@gmail.com" className="hover:underline font-bold text-slate-855 dark:text-slate-250 truncate">
                  rs22201227@gmail.com
                </a>
              </motion.div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[9px] text-slate-450 leading-normal">
              <p>Manager: Hari Narayan Singh</p>
              <p className="mt-0.5">© 2026 ResuMate. All rights reserved.</p>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </motion.div>
  );
};
