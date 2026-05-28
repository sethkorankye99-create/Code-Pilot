import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  userId: string | null;
  username: string;
  profilePicture: string | null;
  isLoggedIn: boolean;
  login: (userData: { id: string, username: string, coins: number, streak_count: number, profile_picture?: string | null }) => void;
  logout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  coins: number | null;
  streak: number;
  isAdModalOpen: boolean;
  setIsAdModalOpen: (isOpen: boolean) => void;
  deductCoin: () => Promise<{success: boolean, coins?: number, error?: string}>;
  addCoins: (amount: number) => Promise<{success: boolean, coins?: number, error?: string}>;
  updateStreak: () => Promise<void>;
  updateProfilePicture: (base64: string) => Promise<void>;
  refreshCoins: () => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));
  const [username, setUsername] = useState(() => localStorage.getItem('username') || 'Guest');
  const [profilePicture, setProfilePicture] = useState<string | null>(() => localStorage.getItem('profilePicture'));
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('userId'));
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    return 'dark';
  });
  const [coins, setCoins] = useState<number | null>(() => {
    const stored = localStorage.getItem('coins');
    return stored ? parseInt(stored, 10) : null;
  });
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);

  useEffect(() => {
    if (coins !== null) {
      localStorage.setItem('coins', coins.toString());
    } else {
      localStorage.removeItem('coins');
    }
  }, [coins]);
  const [streak, setStreak] = useState<number>(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      if (profilePicture) {
        localStorage.setItem('profilePicture', profilePicture);
      } else {
        localStorage.removeItem('profilePicture');
      }
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('profilePicture');
    }
  }, [userId, username, profilePicture]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const refreshCoins = async () => {
    if (!userId) {
      setCoins(0);
      setStreak(0);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('coins, streak_count, profile_picture')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      setCoins(data.coins);
      if (data.streak_count !== undefined) {
        setStreak(data.streak_count);
      }
      if (data.profile_picture !== undefined) {
        setProfilePicture(data.profile_picture);
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
      showToast("Could not sync your data. Please check your connection.", "error");
    }
  };

  useEffect(() => {
    refreshCoins();
  }, [userId]);

  const login = (userData: { id: string, username: string, coins: number, streak_count: number, profile_picture?: string | null }) => {
    setUserId(userData.id);
    setUsername(userData.username);
    setCoins(userData.coins);
    setStreak(userData.streak_count);
    setProfilePicture(userData.profile_picture || null);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error signing out from Supabase:", err);
    }
    setUserId(null);
    setUsername('Guest');
    setCoins(5);
    setStreak(0);
    setProfilePicture(null);
    setIsLoggedIn(false);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const deductCoin = async () => {
    if (!userId) {
      showToast("Please log in to use coins.", 'error');
      return { success: false, error: "Not logged in" };
    }
    
    const newCoins = (coins || 0) - 1;
    if (newCoins < 0) {
      setIsAdModalOpen(true);
      showToast("You have no coins left! Watch an ad to get more.", 'info');
      return { success: false, error: "Not enough coins" };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ coins: newCoins })
        .eq('id', userId)
        .select('coins')
        .single();
        
      if (error) throw error;

      setCoins(data.coins);
      showToast(`1 coin used. ${data.coins} coins remaining.`, 'info');
      return { success: true, coins: data.coins };
    } catch (err) {
      console.error("Deduct coin error:", err);
      showToast("Failed to deduct coin", 'error');
      return { success: false, error: "Database error" };
    }
  };

  const addCoins = async (amount: number) => {
    if (!userId) {
      showToast("Please log in to earn coins.", 'error');
      return { success: false, error: "Not logged in" };
    }
    const newCoins = (coins || 0) + amount;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ coins: newCoins })
        .eq('id', userId)
        .select('coins')
        .single();
        
      if (error) throw error;

      setCoins(data.coins);
      showToast(`${amount} coins added! You now have ${data.coins} coins.`, 'success');
      return { success: true, coins: data.coins };
    } catch (err) {
      console.error("Add coin error:", err);
      showToast("Failed to add coins", 'error');
      return { success: false, error: "Database error" };
    }
  };

  const updateStreak = async () => {
    if (!userId) return;
    try {
      // Get current streak
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('streak_count')
        .eq('id', userId)
        .single();
      if (profileError) throw profileError;

      const newStreak = profile.streak_count + 1;
      
      const { data, error } = await supabase
        .from('profiles')
        .update({ streak_count: newStreak })
        .eq('id', userId)
        .select('streak_count')
        .single();
      
      if (error) throw error;
      
      if (data.streak_count > streak) {
        showToast(`Streak continued! ${data.streak_count} days in a row!`, 'success');
      }
      setStreak(data.streak_count);
    } catch (err) {
      console.error('Failed to update streak', err);
      showToast("Failed to update your streak.", "error");
    }
  };

  const updateProfilePicture = async (base64: string) => {
    if (!userId) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ profile_picture: base64 })
        .eq('id', userId);
        
      if (error) throw error;
      
      setProfilePicture(base64);
      showToast('Profile picture updated!', 'success');
    } catch (err) {
      console.error('Failed to update profile picture', err);
      showToast('Database error', 'error');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ userId, username, profilePicture, isLoggedIn, login, logout, theme, toggleTheme, coins, streak, isAdModalOpen, setIsAdModalOpen, deductCoin, addCoins, updateStreak, updateProfilePicture, refreshCoins, showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm px-4">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 ${
                toast.type === 'error' 
                  ? 'bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200' 
                  : 'bg-slate-900 dark:bg-white border-slate-800 dark:border-slate-200 text-white dark:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {toast.type === 'error' ? 'error' : 'info'}
              </span>
              <p className="text-sm font-medium">{toast.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
