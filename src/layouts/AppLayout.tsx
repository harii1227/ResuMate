import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


export const AppLayout: React.FC = () => {
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = localStorage.getItem('resumate_theme_preference');
      return (saved as any) || 'system';
    } catch {
      return 'system';
    }
  });

  const [isDarkClass, setIsDarkClass] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();


  // PWA Install prompt states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosModal, setShowIosModal] = useState(false);
  const [isIosDevice, setIsIosDevice] = useState(false);

  // Sync theme changes from SettingsPage or other components
  useEffect(() => {
    const handleThemeChange = () => {
      const saved = localStorage.getItem('resumate_theme_preference') || 'system';
      setThemePreference(saved as any);
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (themePreference === 'dark') {
        root.classList.add('dark');
      } else if (themePreference === 'light') {
        root.classList.remove('dark');
      } else {
        // System preference
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme();

    const handleMediaChange = () => {
      if (themePreference === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [themePreference]);

  // Keep track of the resolved class-list for dark/light icons
  useEffect(() => {
    const checkDarkClass = () => {
      setIsDarkClass(document.documentElement.classList.contains('dark'));
    };
    checkDarkClass();

    const observer = new MutationObserver(checkDarkClass);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // PWA installation prompt setup
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    setIsIosDevice(isIos);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      (window as any).deferredPrompt = e;
      setDeferredPrompt(e);
      window.dispatchEvent(new Event('pwa-installable'));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (isIosDevice) {
      setShowIosModal(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User prompt decision: ${outcome}`);
    setDeferredPrompt(null);
    (window as any).deferredPrompt = null;
  };

  const handleToggleTheme = () => {
    const next = themePreference === 'light' ? 'dark' : 'light';
    setThemePreference(next);
    localStorage.setItem('resumate_theme_preference', next);
    window.dispatchEvent(new Event('theme-change'));
  };

  // Close mobile menu on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Detect if we're in a full-screen builder page (no footer, no page scroll)
  const isBuilderPage = location.pathname === '/resume-builder' || location.pathname === '/biodata-builder';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none dark:bg-indigo-600/5" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none dark:bg-purple-600/5" />

      {/* STICKY NAVBAR */}
      <nav className="no-print sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/favicon.png" alt="ResuMate Logo" className="h-9 w-9 object-cover rounded-xl shadow-md" />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              ResuMate
            </span>
          </Link>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <Link to="/resume-templates" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Resume Templates
            </Link>
            <Link to="/biodata-templates" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Marriage Biodata
            </Link>
            <Link to="/downloads" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              My Drafts
            </Link>
            <Link to="/about" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Action Tools */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Install trigger button */}
            {(deferredPrompt || isIosDevice) && (
              <button
                onClick={handleInstallApp}
                className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 rounded-xl text-xs font-bold cursor-pointer"
                title="Install ResuMate App"
              >
                <span>📥</span>
                <span>Get App</span>
              </button>
            )}

            {/* Theme toggle switch */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 cursor-pointer"
              title={`Toggle Theme Setting (Current: ${themePreference})`}
            >
              {isDarkClass ? (
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828-9.9a5 5 0 117.071 7.071l-7.071-7.071z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* CTA create builder */}
            <Link
              to="/resume-builder"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-sm text-sm font-semibold tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              Build Resume
            </Link>
          </div>

          {/* Mobile Menu trigger button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {isDarkClass ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile dropdown navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-4 space-y-2 transition-all duration-200 text-left">
            <Link to="/" className="block py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Home
            </Link>
            <Link to="/resume-templates" className="block py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Resume Templates
            </Link>
            <Link to="/biodata-templates" className="block py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Marriage Biodata
            </Link>
            <Link to="/downloads" className="block py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              My Drafts
            </Link>
            <Link to="/about" className="block py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              About Us
            </Link>
            <Link to="/contact" className="block py-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Contact
            </Link>
            {(deferredPrompt || isIosDevice) && (
              <button
                onClick={handleInstallApp}
                className="w-full text-center py-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl text-sm"
              >
                Download Mobile App
              </button>
            )}
            <div className="pt-2">
              <Link
                to="/resume-builder"
                className="block text-center py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm"
              >
                Create Resume
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Pages Content */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER — hidden on builder pages */}
      {!isBuilderPage && (
        <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
              
              {/* Column 1: Brand Info & Support */}
              <div className="space-y-4 col-span-1 md:col-span-1">
                <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                  ResuMate
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Empowering career changes and life milestones with beautiful, ATS-optimized resumes and elegant cultural marriage biodatas. Fully client-side, secure, and instant.
                </p>
                <div className="pt-1 text-xs space-y-1">
                  <p className="text-slate-500 dark:text-slate-400">Helpline: <a href="tel:7324930925" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold">+91 7324930925</a></p>
                  <p className="text-slate-500 dark:text-slate-400">Email: <a href="mailto:rs22201227@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold">rs22201227@gmail.com</a></p>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Builders</h4>
                <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <li><Link to="/resume-builder" className="hover:text-indigo-600 dark:hover:text-indigo-400">Resume Creator</Link></li>
                  <li><Link to="/biodata-builder" className="hover:text-indigo-600 dark:hover:text-indigo-400">Biodata Creator</Link></li>
                  <li><Link to="/resume-templates" className="hover:text-indigo-600 dark:hover:text-indigo-400">Resume Designs</Link></li>
                  <li><Link to="/biodata-templates" className="hover:text-indigo-600 dark:hover:text-indigo-400">Matrimonial Layouts</Link></li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Company</h4>
                <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About Us</Link></li>
                  <li><Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact Team</Link></li>
                  <li><Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">User Settings</Link></li>
                </ul>
              </div>

              {/* Column 4: Security */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Security</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  100% Client-Side. Your personal information, photo, and work history never touch our servers. Stored safely in your browser LocalStorage.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <p>© 2026 Hari Narayan Singh. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}


      {/* iOS Share Sheet Modal */}
      <AnimatePresence>
        {showIosModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="no-print fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full space-y-4 text-left"
            >
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Install on iPhone / iPad</h3>
                <button onClick={() => setShowIosModal(false)} className="text-slate-400 hover:text-slate-200 text-lg font-bold">&times;</button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Safari on iOS does not support one-click installations. To add ResuMate to your Home Screen:
              </p>
              <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 space-y-2.5">
                <li>Tap the <span className="font-bold text-indigo-500">Share</span> button at the bottom of the screen.</li>
                <li>Scroll down the menu list and select <span className="font-bold text-indigo-500">"Add to Home Screen"</span>.</li>
                <li>Confirm the name and tap <span className="font-bold text-indigo-500">Add</span> in the top-right corner.</li>
              </ol>
              <div className="pt-2">
                <button
                  onClick={() => setShowIosModal(false)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md shadow-indigo-600/10"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
