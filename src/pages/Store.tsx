import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Shield, Zap, Sparkles, User as UserIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';

const STORE_ITEMS = [
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for one full day of inactivity.',
    price: 10,
    icon: Shield,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
  },
  {
    id: 'avatar_ninja',
    name: 'Ninja Avatar',
    description: 'Unlock the exclusive Code Ninja profile picture.',
    price: 50,
    icon: UserIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20',
  },
  {
    id: 'theme_neon',
    name: 'Neon Theme',
    description: 'Unlock the cyberpunk neon theme for your editor.',
    price: 100,
    icon: Sparkles,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/20',
  },
  {
    id: 'xp_boost',
    name: 'XP Boost',
    description: 'Double your XP earnings for the next 24 hours.',
    price: 25,
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
  }
];

export default function Store() {
  const { coins, deductCoin, showToast } = useAppContext();
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const handlePurchase = async (item: typeof STORE_ITEMS[0]) => {
    if (purchasedItems.includes(item.id)) {
      showToast("You already own this item!", "info");
      return;
    }

    if (coins === null || coins < item.price) {
      showToast("Not enough coins!", "error");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ coins: coins - item.price })
        .eq('id', localStorage.getItem('userId'))
        .select('coins')
        .single();
      
      if (error) throw error;
      
      setPurchasedItems([...purchasedItems, item.id]);
      showToast(`Successfully purchased ${item.name}!`, "success");
      // AppContext will take care of updating coins, 
      // but let's force a state refresh or update local context if needed
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      showToast("Failed to process purchase.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <ShoppingCart className="text-indigo-500" size={32} />
              Coin Store
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Spend your hard-earned coins on exclusive items and perks.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-2xl border border-yellow-500/20">
            <Star size={20} fill="currentColor" />
            <span className="font-bold text-lg">{coins !== null ? coins : 0} Coins</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STORE_ITEMS.map((item, index) => {
            const isOwned = purchasedItems.includes(item.id);
            const canAfford = coins !== null && coins >= item.price;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-xl flex items-start gap-6"
              >
                <div className={`size-16 rounded-2xl ${item.bgColor} ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon size={32} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.description}</p>
                  
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={isOwned || (!canAfford && !isOwned)}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isOwned 
                        ? 'bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                        : canAfford
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isOwned ? (
                      'Owned'
                    ) : (
                      <>
                        <Star size={16} fill={canAfford ? "currentColor" : "none"} />
                        {item.price} Coins
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
