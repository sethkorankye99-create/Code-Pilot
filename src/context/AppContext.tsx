import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  deductCoin: () => Promise<{success: boolean, coins?: number, error?: string}>;
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
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [coins, setCoins] = useState<number | null>(null);
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
    try {
      const url = userId ? `/api/coins?userId=${userId}` : '/api/coins';
      const res = await fetch(url);
      const data = await res.json();
      setCoins(data.coins);
      if (data.streak_count !== undefined) {
        setStreak(data.streak_count);
      }
      if (data.profile_picture !== undefined) {
        setProfilePicture(data.profile_picture);
      }
    } catch (err) {
      console.error('Failed to fetch coins', err);
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

  const logout = () => {
    setUserId(null);
    setUsername('Guest');
    setCoins(5);
    setStreak(0);
    setProfilePicture(null);
    setIsLoggedIn(false);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const deductCoin = async () => {
    try {
      const res = await fetch('/api/coins/deduct', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCoins(data.coins);
        showToast(`1 coin used. ${data.coins} coins remaining.`, 'info');
        return { success: true, coins: data.coins };
      } else {
        showToast("You have no coins left. Come back tomorrow for 5 new coins.", 'error');
        return { success: false, error: data.error };
      }
    } catch (err) {
      showToast("Failed to deduct coin", 'error');
      return { success: false, error: "Network error" };
    }
  };

  const updateStreak = async () => {
    try {
      const res = await fetch('/api/streak/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.streak_count > streak) {
          showToast(`Streak continued! ${data.streak_count} days in a row!`, 'success');
        }
        setStreak(data.streak_count);
      }
    } catch (err) {
      console.error('Failed to update streak', err);
    }
  };

  const updateProfilePicture = async (base64: string) => {
    if (!userId) return;
    try {
      const res = await fetch('/api/profile/picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, profilePicture: base64 })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProfilePicture(base64);
        showToast('Profile picture updated!', 'success');
      } else {
        showToast('Failed to update profile picture', 'error');
      }
    } catch (err) {
      console.error('Failed to update profile picture', err);
      showToast('Network error', 'error');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ userId, username, profilePicture, isLoggedIn, login, logout, theme, toggleTheme, coins, streak, deductCoin, updateStreak, updateProfilePicture, refreshCoins, showToast }}>
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
