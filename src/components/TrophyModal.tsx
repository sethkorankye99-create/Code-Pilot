import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Sparkles, ChevronRight } from 'lucide-react';

interface TrophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  total: number;
  sectionTitle: string;
}

export default function TrophyModal({ isOpen, onClose, score, total, sectionTitle }: TrophyModalProps) {
  const getTrophyData = () => {
    if (score === total) {
      return {
        type: 'Gold',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30',
        glowColor: 'shadow-yellow-500/40',
        message: 'Masterful Performance!',
        subMessage: 'You answered every question correctly. You are a true JS Master!'
      };
    } else if (score >= 8) {
      return {
        type: 'Silver',
        color: 'text-slate-400',
        bgColor: 'bg-slate-400/20',
        borderColor: 'border-slate-400/30',
        glowColor: 'shadow-slate-400/40',
        message: 'Excellent Work!',
        subMessage: 'Great job! You have a strong grasp of these concepts.'
      };
    } else if (score >= 6) {
      return {
        type: 'Bronze',
        color: 'text-amber-600',
        bgColor: 'bg-amber-600/20',
        borderColor: 'border-amber-600/30',
        glowColor: 'shadow-amber-600/40',
        message: 'Well Done!',
        subMessage: 'You passed the section! Keep practicing to reach the gold.'
      };
    } else {
      return {
        type: 'Participant',
        color: 'text-primary',
        bgColor: 'bg-primary/20',
        borderColor: 'border-primary/30',
        glowColor: 'shadow-primary/40',
        message: 'Keep Learning!',
        subMessage: 'You completed the quiz. Review the material and try again for a trophy!'
      };
    }
  };

  const data = getTrophyData();
  const isTrophy = score >= 6;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 z-[101] text-center"
          >
            <div className={`relative p-8 rounded-3xl bg-white dark:bg-card-dark border ${data.borderColor} shadow-2xl ${data.glowColor}`}>
              {/* Decorative Elements */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`size-24 rounded-full ${data.bgColor} flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl`}
                >
                  <Trophy size={48} className={data.color} />
                </motion.div>
              </div>

              <div className="mt-12 space-y-6">
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-2 text-primary font-black uppercase tracking-widest text-xs"
                  >
                    <Sparkles size={14} />
                    {isTrophy ? `${data.type} Trophy Unlocked` : 'Quiz Completed'}
                    <Sparkles size={14} />
                  </motion.div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {data.message}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {data.subMessage}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-8 py-4 border-y border-slate-100 dark:border-slate-800">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{score}/{total}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Section</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white max-w-[120px] truncate">{sectionTitle}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onClose}
                    className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                  >
                    Continue Journey
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Continue to answer questions and win more trophies!
                  </p>
                </div>
              </div>

              {/* Background Stars */}
              <div className="absolute top-4 left-4 text-yellow-500/20 animate-pulse">
                <Star size={24} fill="currentColor" />
              </div>
              <div className="absolute bottom-4 right-4 text-yellow-500/20 animate-pulse delay-700">
                <Star size={16} fill="currentColor" />
              </div>
              <div className="absolute top-1/2 right-4 text-yellow-500/20 animate-pulse delay-300">
                <Star size={12} fill="currentColor" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
