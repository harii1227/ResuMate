import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-4 py-16 text-left relative"
    >
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 mb-12 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-extrabold text-slate-900 dark:text-white"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 dark:text-slate-400 text-xs"
        >
          Have feedback, questions, or ideas for custom templates? Fill out this form or contact our helpline directly.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Column 1: Contact Form (cols 7) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="lg:col-span-7"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl space-y-3"
              >
                <div className="text-2xl animate-bounce">✉️</div>
                <h3 className="text-lg font-bold">Message Transmitted!</h3>
                <p className="text-xs leading-relaxed">
                  Thank you for contacting ResuMate. Since this is a client-only demo app, your mock message was processed locally. We appreciate your feedback!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold underline hover:text-emerald-500 cursor-pointer block mt-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit} 
                className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500"
                    placeholder="Raman Rajput"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500"
                    placeholder="rs22201227@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Feedback">Feedback & Suggestions</option>
                    <option value="Bug">Report a Bug</option>
                    <option value="Template">Request Custom Template</option>
                    <option value="Collaboration">Collaboration / Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none transition-all focus:ring-1 focus:ring-indigo-500"
                    placeholder="Type your message here..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl shadow-md text-sm transition-all cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Column 2: Direct Support Info (cols 5) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.05 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">Direct Customer Helpline</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              If you require instant assistance with draft imports, PDF scaling issues, or template adjustments, contact our support team.
            </p>
            <div className="space-y-3.5 pt-2 text-xs">
              <motion.div whileHover={{ x: 3 }} className="flex items-center space-x-3">
                <span className="text-lg">📞</span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Support Phone</p>
                  <a href="tel:7324930925" className="hover:underline font-bold text-slate-800 dark:text-slate-200 text-sm">
                    +91 7324930925
                  </a>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 3 }} className="flex items-center space-x-3">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Support Email</p>
                  <a href="mailto:rs22201227@gmail.com" className="hover:underline font-bold text-slate-800 dark:text-slate-200 text-sm">
                    rs22201227@gmail.com
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-[10px] text-slate-450 leading-relaxed">
              <p className="font-semibold text-slate-600 dark:text-slate-400">Manager: Hari Narayan Singh</p>
              <p className="mt-0.5">© 2026 ResuMate. All rights reserved.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
