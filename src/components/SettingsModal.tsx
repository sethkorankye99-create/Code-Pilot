import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { username, profilePicture, updateProfilePicture, coins, streak, showToast, logout, addCoins, theme, toggleTheme } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(username);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  const handleSaveName = () => {
    if (editName.trim()) {
      showToast("Username update not implemented", "info");
    }
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Image must be less than 5MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatchAd = async () => {
    if (isWatchingAd) return;
    setIsWatchingAd(true);
    showToast("Watching ad...", "info");
    
    // Simulate watching an ad for 2 seconds
    setTimeout(async () => {
      await addCoins(5);
      setIsWatchingAd(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-full md:max-w-md bg-white dark:bg-card-dark rounded-t-3xl md:rounded-3xl p-6 z-50 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto transition-colors duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile & Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                <div 
                  className="relative size-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold cursor-pointer overflow-hidden group shadow-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    username.charAt(0).toUpperCase()
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-base">photo_camera</span>
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div className="w-full">
                  {isEditing ? (
                    <div className="flex items-center gap-2 max-w-xs mx-auto">
                      <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-primary text-center"
                        autoFocus
                      />
                      <button onClick={handleSaveName} className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 shadow-md">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="relative group/name inline-block">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">Username</p>
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-xl font-bold text-slate-900 dark:text-white">{username}</p>
                          <button onClick={() => setIsEditing(true)} className="p-1 text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                        </div>
                        {streak > 0 && (
                          <div className="flex items-center justify-center gap-1 mt-2 bg-orange-500/10 px-3 py-1 rounded-full">
                            <span className="material-symbols-outlined text-orange-500 text-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{streak} Day Streak</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Coins Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10 border border-yellow-200 dark:border-yellow-700/30 flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-yellow-500 text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>monetization_on</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{coins !== null ? coins : 5} Coins</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Use coins to take quizzes and unlock content.</p>
                <button 
                  onClick={handleWatchAd}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-lg">play_circle</span>
                  Watch Ad (+5Coins)
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">
                    {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Toggle dark/light theme</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Customer Support */}
              <Link 
                to="/support"
                onClick={onClose}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Customer Support</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Chat with our admin team</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
              </Link>

              {/* Logout Button */}
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full py-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                Log Out
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
