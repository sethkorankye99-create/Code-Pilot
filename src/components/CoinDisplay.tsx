import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect } from 'react';

export default function CoinDisplay() {
  const { coins } = useAppContext();
  const [prevCoins, setPrevCoins] = useState(coins);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (coins !== null && prevCoins !== null && coins < prevCoins) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
    setPrevCoins(coins);
  }, [coins, prevCoins]);

  if (coins === null) return null;

  return (
    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-full mr-2 relative">
      <motion.span 
        animate={isAnimating ? { rotateY: 360, scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="material-symbols-outlined text-slate-900 dark:text-white text-lg" 
        style={{fontVariationSettings: "'FILL' 1"}}
      >
        monetization_on
      </motion.span>
      <span className="font-bold text-slate-900 dark:text-white text-sm">{coins}</span>
      
      {/* Deduction Animation Particle */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -30, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-2 top-1 text-slate-900 dark:text-white font-bold text-sm pointer-events-none"
          >
            -1
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
