import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

export default function StreakDisplay() {
  const { streak } = useAppContext();

  if (streak === 0) return null;

  return (
    <div className="flex items-center gap-1 bg-orange-50/80 dark:bg-orange-900/20 backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50 px-3 py-1.5 rounded-full shadow-sm">
      <motion.span 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="material-symbols-outlined text-orange-500 text-lg" 
        style={{fontVariationSettings: "'FILL' 1"}}
      >
        local_fire_department
      </motion.span>
      <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">{streak}</span>
    </div>
  );
}
