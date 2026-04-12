import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Code2, 
  User, 
  Search, 
  PlayCircle, 
  Bell, 
  Menu, 
  X, 
  ChevronDown,
  Settings,
  LogOut,
  Sparkles,
  ShoppingCart
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SettingsModal from './SettingsModal';
import CoinDisplay from './CoinDisplay';
import StreakDisplay from './StreakDisplay';

const NAV_ITEMS: {
  id: string;
  label: string;
  icon: any;
  path: string;
  submenu?: { label: string; path: string; }[];
}[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
  { id: 'playground', label: 'Playground', icon: Sparkles, path: '/playground' },
  { id: 'store', label: 'Store', icon: ShoppingCart, path: '/store' },
];

export default function Navigation() {
  const location = useLocation();
  const { userId, profilePicture, username, logout, theme } = useAppContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex sticky top-0 z-50 w-full h-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="size-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Code2 size={20} />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white uppercase">Code Pillot</span>
          </Link>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="relative group/item">
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive(item.path)
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {item.submenu && <ChevronDown size={14} className="opacity-50" />}
                </Link>

                {item.submenu && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-200">
                    <div className="bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 min-w-[200px]">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-white/10">
            <StreakDisplay />
            <CoinDisplay />
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            >
              <div className="size-8 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <User size={18} />
                  </div>
                )}
              </div>
              <span className="text-sm font-bold text-black dark:text-white mr-1">{username}</span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
                  >
                    <button 
                      onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Settings size={18} />
                      Settings
                    </button>
                    <Link 
                      to="/playground"
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Sparkles size={18} />
                      Code Editor
                    </Link>
                    <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />
                    <button 
                      onClick={() => { logout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className="md:hidden sticky top-0 z-50 w-full h-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-4 flex items-center justify-between transition-colors duration-300">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="size-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Code2 size={18} />
          </div>
          <span className="text-base font-black tracking-tighter text-slate-900 dark:text-white uppercase">Code Pillot</span>
        </Link>

        <div className="flex items-center gap-2">
          <StreakDisplay />
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-black md:hidden flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
              <span className="text-xl font-black text-black dark:text-white uppercase tracking-tighter">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-white/5">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.id} className="space-y-1">
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                      isActive(item.path)
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={24} />
                      <span>{item.label}</span>
                    </div>
                    {item.submenu && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
                        }}
                        className="p-2"
                      >
                        <ChevronDown className={`transition-transform ${activeSubmenu === item.id ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </Link>

                  {item.submenu && activeSubmenu === item.id && (
                    <div className="pl-12 space-y-1 py-2">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block py-3 text-slate-500 dark:text-slate-400 font-medium hover:text-black dark:hover:text-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-4">
              <button 
                onClick={() => { setIsSettingsOpen(true); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-black dark:text-white font-bold"
              >
                <Settings size={24} />
                Settings
              </button>
              <button 
                onClick={() => logout()}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 font-bold"
              >
                <LogOut size={24} />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 px-6 flex items-center justify-between z-40">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive(item.path) ? 'text-indigo-600' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${isActive(item.path) ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''}`}>
              <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
