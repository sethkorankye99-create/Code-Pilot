import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete a daily lesson', completed: false },
    { id: '2', text: 'Practice in the Code Playground', completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200/50 dark:border-slate-800/50 p-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-3 relative z-10">
        <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
          <span className="material-symbols-outlined">checklist</span>
        </div>
        Daily Learning Goals
      </h3>
      <div className="space-y-3 relative z-10">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            layout
            initial={false}
            animate={{ 
              backgroundColor: task.completed ? ['rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.05)'] : 'transparent',
              scale: task.completed ? [1, 1.02, 1] : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer group ${
              task.completed 
                ? 'border-emerald-500/20 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5' 
                : 'border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-md hover:-translate-y-0.5'
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <div className={`relative flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              task.completed ? 'border-emerald-500 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400/50'
            }`}>
              <AnimatePresence>
                {task.completed && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className={`text-[15px] font-medium transition-all duration-300 ${
              task.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'
            }`}>
              {task.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
