import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { profilePicture, updateProfilePicture, coins, streak, showToast, logout, theme, toggleTheme } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleResetProgress = async () => {
    if (confirm("Are you sure you want to reset your local stats?")) {
      logout();
      onClose();
    }
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
            className="fixed bottom-0 left-0 right-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-full md:max-w-md bg-white/90 dark:bg-card-dark/90 backdrop-blur-2xl rounded-t-3xl md:rounded-3xl p-6 z-50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200/50 dark:border-slate-800/50 max-h-[90vh] overflow-y-auto transition-colors duration-300"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile & Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 text-center backdrop-blur-sm">
                <div 
                  className="relative size-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold cursor-pointer overflow-hidden group shadow-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-4xl text-primary">account_circle</span>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-base">photo_camera</span>
                  </div>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  Change Profile Photo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                {streak > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-1 bg-orange-500/10 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-orange-500 text-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{streak} Day Streak</span>
                  </div>
                )}
              </div>

              {/* Coins Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 dark:from-yellow-900/20 dark:to-yellow-800/10 border border-yellow-200/50 dark:border-yellow-700/30 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-yellow-500 text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>monetization_on</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{coins !== null ? coins : 5} Coins</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Earn coins by completing quizzes and scoring points.</p>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
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
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">support_agent</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Customer Support</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Chat with our support team</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
              </Link>

              {/* Reset Stats */}
              <button 
                onClick={handleResetProgress}
                className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-white/5"
              >
                <span className="material-symbols-outlined text-sm">restart_alt</span>
                Reset Stats
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
