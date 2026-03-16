import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

export default function FloatingAIChat() {
  const location = useLocation();
  
  // Don't show on login, signup, landing, or the AI Tutor page itself
  const hideOn = ['/', '/login', '/signup', '/ai-tutor'];
  if (hideOn.includes(location.pathname)) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[60] sm:bottom-28 sm:right-8">
      <Link to="/ai-tutor">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="size-14 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40 border border-white/20"
          title="Ask AI Tutor"
        >
          <span className="material-symbols-outlined text-3xl">psychology</span>
          <div className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
        </motion.button>
      </Link>
    </div>
  );
}
