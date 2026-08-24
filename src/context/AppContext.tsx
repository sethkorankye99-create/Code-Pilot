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
  addCoins: (amount: number) => Promise<{success: boolean, coins?: number, error?: string}>;
  updateStreak: () => Promise<void>;
  updateProfilePicture: (base64: string) => Promise<void>;
  refreshCoins: () => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(() => {
    const saved = localStorage.getItem('userId');
    if (saved) return saved;
    const newGuestId = 'guest_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('userId', newGuestId);
    return newGuestId;
  });
  const [username, setUsername] = useState(() => localStorage.getItem('username') || 'Guest Coder');
  const [profilePicture, setProfilePicture] = useState<string | null>(() => localStorage.getItem('profilePicture'));
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved === 'true';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark';
    }
    return 'dark';
  });
  const [coins, setCoins] = useState<number | null>(() => {
    const stored = localStorage.getItem('coins');
    return stored ? parseInt(stored, 10) : 10;
  });

  useEffect(() => {
    if (coins !== null) {
      localStorage.setItem('coins', coins.toString());
    } else {
      localStorage.removeItem('coins');
    }
  }, [coins]);

  const [streak, setStreak] = useState<number>(() => {
    const stored = localStorage.getItem('streak');
    return stored ? parseInt(stored, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
      if (profilePicture) {
        localStorage.setItem('profilePicture', profilePicture);
      } else {
        localStorage.removeItem('profilePicture');
      }
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('profilePicture');
    }
  }, [userId, username, profilePicture, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const refreshCoins = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/coins?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.coins !== undefined) setCoins(data.coins);
        if (data.streak_count !== undefined) setStreak(data.streak_count);
        if (data.profile_picture !== undefined && data.profile_picture !== null) {
          setProfilePicture(data.profile_picture);
        }
      }
    } catch (err) {
      console.warn('Syncing using local cache');
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
    const newGuestId = 'guest_' + Math.random().toString(36).substring(2, 9);
    setUserId(newGuestId);
    setUsername('Guest Coder');
    setCoins(10);
    setStreak(0);
    setProfilePicture(null);
    setIsLoggedIn(false);
    showToast("Signed out successfully", "info");
  };

  const deductCoin = async () => {
    const activeUserId = userId || 'guest_user';
    const currentCoins = coins !== null ? coins : 10;
    
    if (currentCoins <= 0) {
      showToast("You have no coins left! Earn more by scoring high on quizzes.", 'info');
      return { success: false, error: "Not enough coins" };
    }

    try {
      const res = await fetch('/api/coins/deduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: activeUserId })
      });
      
      if (res.ok) {
        const data = await res.json();
        setCoins(data.coins);
        showToast(`1 coin used. ${data.coins} coins remaining.`, 'info');
        return { success: true, coins: data.coins };
      } else {
        const newCount = Math.max(0, currentCoins - 1);
        setCoins(newCount);
        showToast(`1 coin used. ${newCount} coins remaining.`, 'info');
        return { success: true, coins: newCount };
      }
    } catch (err) {
      const newCount = Math.max(0, currentCoins - 1);
      setCoins(newCount);
      showToast(`1 coin used. ${newCount} coins remaining.`, 'info');
      return { success: true, coins: newCount };
    }
  };

  const addCoins = async (amount: number) => {
    const activeUserId = userId || 'guest_user';
    const currentCoins = coins !== null ? coins : 10;
    const fallbackCoins = currentCoins + amount;
    
    try {
      const res = await fetch('/api/coins/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: activeUserId, amount })
      });
      
      if (res.ok) {
        const data = await res.json();
        setCoins(data.coins);
        showToast(`${amount} coins added! You now have ${data.coins} coins.`, 'success');
        return { success: true, coins: data.coins };
      } else {
        setCoins(fallbackCoins);
        showToast(`${amount} coins added! You now have ${fallbackCoins} coins.`, 'success');
        return { success: true, coins: fallbackCoins };
      }
    } catch (err) {
      setCoins(fallbackCoins);
      showToast(`${amount} coins added! You now have ${fallbackCoins} coins.`, 'success');
      return { success: true, coins: fallbackCoins };
    }
  };

  const updateStreak = async () => {
    const activeUserId = userId || 'guest_user';
    try {
      const res = await fetch('/api/streak/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: activeUserId })
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.streak_count > streak) {
          showToast(`Streak continued! ${data.streak_count} days in a row!`, 'success');
        }
        setStreak(data.streak_count);
      } else {
        const newStreak = streak + 1;
        setStreak(newStreak);
        showToast(`Streak continued! ${newStreak} days in a row!`, 'success');
      }
    } catch (err) {
      const newStreak = streak + 1;
      setStreak(newStreak);
    }
  };

  const updateProfilePicture = async (base64: string) => {
    const activeUserId = userId || 'guest_user';
    setProfilePicture(base64);
    try {
      await fetch('/api/profile/picture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: activeUserId, profilePicture: base64 })
      });
      showToast('Profile picture updated!', 'success');
    } catch (err) {
      showToast('Profile picture saved locally!', 'success');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppContext.Provider value={{ userId, username, profilePicture, isLoggedIn, login, logout, theme, toggleTheme, coins, streak, deductCoin, addCoins, updateStreak, updateProfilePicture, refreshCoins, showToast }}>
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

