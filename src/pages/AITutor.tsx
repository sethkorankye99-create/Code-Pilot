import React from 'react';
import { Link } from 'react-router-dom';
import AIChatInterface from '../components/AIChatInterface';

export default function AITutor() {
  return (
    <div className="flex h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 overflow-hidden relative">
        <AIChatInterface />
      </div>
    </div>
  );
}

