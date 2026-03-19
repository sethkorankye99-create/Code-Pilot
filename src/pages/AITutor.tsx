import React from 'react';
import { Link } from 'react-router-dom';
import AIChatInterface from '../components/AIChatInterface';

export default function AITutor() {
  return (
    <div className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <header className="flex items-center bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-4 pb-4 border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-40 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold transition-all shadow-sm hover:-translate-y-0.5">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          Back to Dashboard
        </Link>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden relative">
        <AIChatInterface />
      </div>
    </div>
  );
}

