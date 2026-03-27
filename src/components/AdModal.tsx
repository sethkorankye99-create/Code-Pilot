import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldAlert, Coins } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdModal({ isOpen, onClose }: AdModalProps) {
  const { addCoins } = useAppContext();
  const [timeLeft, setTimeLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const [isRewarded, setIsRewarded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(5);
      setCanSkip(false);
      setIsRewarded(false);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleReward = async () => {
    if (isRewarded) return;
    setIsRewarded(true);
    await addCoins(5); // Reward 5 coins for watching an ad
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => canSkip && handleReward()}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200/50 dark:border-slate-800/50"
          >
            {/* Ad Content */}
            <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              <img 
                src="https://picsum.photos/seed/ads/800/450" 
                alt="Advertisement" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                Sponsored
              </div>
              
              {!canSkip && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-2 rounded-full flex items-center gap-2">
                  <span>Ad ends in {timeLeft}s</span>
                </div>
              )}
              
              {canSkip && (
                <button 
                  onClick={handleReward}
                  className="absolute bottom-4 right-4 bg-primary text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:bg-primary/90 transition-all active:scale-95"
                >
                  <span>Skip Ad & Get Coins</span>
                  <Coins size={14} />
                </button>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Upgrade to Pro Today!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Get unlimited access to all courses, offline downloads, and an ad-free experience.</p>
                </div>
                <div className="size-12 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <ShieldAlert size={24} />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-slate-100/50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold py-3 rounded-xl text-sm hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                  Learn More <ExternalLink size={14} />
                </button>
                <button 
                  onClick={handleReward}
                  disabled={!canSkip}
                  className={`flex-1 font-bold py-3 rounded-xl text-sm transition-all shadow-lg ${
                    canSkip 
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5' 
                    : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {canSkip ? 'Claim Reward' : `Wait ${timeLeft}s`}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
