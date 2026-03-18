import React from 'react';
import { Link } from 'react-router-dom';
import AIChatInterface from '../components/AIChatInterface';

export default function AITutor() {
  return (
    <div className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark z-20 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 font-medium transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
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

