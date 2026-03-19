import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import CoinDisplay from '../components/CoinDisplay';
import StreakDisplay from '../components/StreakDisplay';
import SettingsModal from '../components/SettingsModal';
import AdModal from '../components/AdModal';
import { motion, AnimatePresence } from 'motion/react';

export default function CourseDetail() {
  const { deductCoin, updateStreak, userId, showToast } = useAppContext();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasWatchedAd, setHasWatchedAd] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const courseId = "css-advanced";
  const moduleId = "module-3";

  useEffect(() => {
    if (userId) {
      fetch(`/api/progress?userId=${userId}&courseId=${courseId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.progress) {
            const moduleProgress = data.progress.find((p: any) => p.module_id === moduleId);
            if (moduleProgress) {
              setIsCompleted(moduleProgress.is_completed === 1);
              setQuizScore(moduleProgress.quiz_score);
            }
          }
        })
        .catch(err => console.error("Failed to fetch progress", err));
    }
  }, [userId]);

  const saveProgress = async (completed: boolean, score: number) => {
    if (!userId) return;
    try {
      await fetch('/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          courseId,
          moduleId,
          isCompleted: completed,
          quizScore: score
        })
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  const handleMarkComplete = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    saveProgress(newStatus, quizScore);
    if (newStatus) {
      showToast("Module marked as complete!", "success");
    }
  };

  const handleStartQuiz = async () => {
    const result = await deductCoin();
    if (result.success) {
      setIsQuizStarted(true);
      await updateStreak();
      // Simulate quiz completion for demo purposes
      setTimeout(() => {
        const score = Math.floor(Math.random() * 3) + 8; // Random score 8-10
        setQuizScore(score);
        saveProgress(isCompleted, score);
        showToast(`Quiz completed! You scored ${score}/10`, "success");
        setIsQuizStarted(false);
      }, 3000);
    }
  };

  const handlePlayClick = () => {
    if (!hasWatchedAd) {
      setIsAdOpen(true);
    } else {
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleAdClose = () => {
    setIsAdOpen(false);
    setHasWatchedAd(true);
    setIsVideoPlaying(true);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-4 pb-4 justify-between sticky top-0 z-40 border-b border-slate-200/50 dark:border-slate-800/50">
        <Link to="/dashboard" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </Link>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center">Code Pillot</h2>
        <div className="flex w-auto items-center justify-end gap-2">
          <StreakDisplay />
          <CoinDisplay />
          <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
        </div>
      </div>

      {/* Video Player Section */}
      <div 
        className="relative flex items-center justify-center bg-slate-900 bg-cover bg-center aspect-video group" 
        style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtAidPR6i1qZxxAnmoC51FmdcQyEHIx-i48l8i58hZj3dHI9EAy4U67AHMkgecfC_YgogSOerPE7kIYALavgCtWizguLe7UxmcrWoVwWRZCq22ioeTQaSPiGUOTt-0zrdt6sa-eyJ1VA87xK867FFH0o5cGTdli_ZKcfGjNHdsFyYjJz43lpUesU-riQxAxWeVDO47FgWsj_8CyyBqdygRdR9jG2dv6sk9goB1n3SlkXcThvILIk3sfSKYT-6nsnrdAdIzpRxsI8E")'}}
      >
        <div className={`absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}></div>
        
        {isVideoPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="size-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <p className="text-white font-bold animate-pulse">Streaming Video Content...</p>
              <button 
                onClick={() => setIsVideoPlaying(false)}
                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold backdrop-blur-md transition-all"
              >
                Pause Video
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={handlePlayClick}
            className="relative z-10 flex shrink-0 items-center justify-center rounded-full size-16 bg-primary text-white shadow-lg shadow-primary/40 hover:scale-110 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex h-1.5 items-center justify-center mb-2">
            <div className="h-1.5 w-1/4 rounded-full bg-primary"></div>
            <div className="relative"><div className="absolute -left-2 -top-1.5 size-4 rounded-full bg-primary border-2 border-white shadow-sm"></div></div>
            <div className="h-1.5 flex-1 rounded-full bg-white/30"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white text-xs font-medium leading-normal tracking-[0.015em]">0:37</p>
            <p className="text-white text-xs font-medium leading-normal tracking-[0.015em]">12:23</p>
          </div>
        </div>
      </div>

      {/* Lesson Details */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-primary text-xs font-bold uppercase tracking-wider">Module 3: Layouts</span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-sm">visibility</span>
            <span className="text-xs">12.4k views</span>
          </div>
        </div>
        <h1 className="text-slate-900 dark:text-slate-100 tracking-tight text-2xl font-bold leading-tight mb-3">Advanced CSS Flexbox</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed mb-6">
          Master complex layouts using advanced Flexbox properties like flex-grow, flex-shrink, and nested containers. We'll build a responsive dashboard header as a practical exercise.
        </p>
        <button 
          onClick={handleMarkComplete}
          className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all shadow-lg ${
            isCompleted 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' 
              : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
          }`}
        >
          <span className="material-symbols-outlined">
            {isCompleted ? 'check_circle' : 'radio_button_unchecked'}
          </span>
          {isCompleted ? 'Completed' : 'Mark as Complete'}
        </button>
      </div>

      {/* Course Content List */}
      <div className="flex-1 px-4 pb-24">
        {/* Quiz Section */}
        <div className="mb-6 bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>quiz</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Module Quiz</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Test your knowledge on Advanced CSS Flexbox. Costs 1 coin.</p>
          
          {quizScore > 0 && !isQuizStarted && (
            <div className="mb-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">workspace_premium</span>
              Previous Score: {quizScore}/10
            </div>
          )}
          
          {isQuizStarted ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <div className="size-4 rounded-full border-2 border-green-700 dark:border-green-400 border-t-transparent animate-spin"></div>
              Quiz in progress...
            </div>
          ) : (
            <button 
              onClick={handleStartQuiz}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-yellow-500 text-lg" style={{fontVariationSettings: "'FILL' 1"}}>monetization_on</span>
              Start Quiz (1 Coin)
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 mt-2">
          <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Course Content</h3>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">8 Lessons</span>
        </div>
        <div className="space-y-3">
          {/* Item 1 (Active/Previous) */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-primary/30">
            <div className="relative size-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_circle</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-primary text-sm font-bold truncate">1. Advanced CSS Flexbox</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">12:23 • Playing</p>
            </div>
            <span className="material-symbols-outlined text-primary">equalizer</span>
          </div>

          {/* Item 2 (Up Next) */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
            <div className="relative size-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">play_circle</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold truncate">2. CSS Grid Fundamentals</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">15:45 • Up Next</p>
            </div>
            <span className="material-symbols-outlined text-slate-400">lock_open</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
            <div className="relative size-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">play_circle</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold truncate">3. Building Layout Systems</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">22:10</p>
            </div>
            <span className="material-symbols-outlined text-slate-400">lock</span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
            <div className="relative size-12 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">play_circle</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 dark:text-slate-100 text-sm font-bold truncate">4. Responsive Design Patterns</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">18:30</p>
            </div>
            <span className="material-symbols-outlined text-slate-400">lock</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex border-t border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl px-4 pb-6 pt-3 z-50">
        <Link to="/dashboard" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
          <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>menu_book</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Courses</p>
        </Link>
        <Link to="/explore" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <span className="material-symbols-outlined text-2xl">search</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Explore</p>
        </Link>
        <Link to="/community" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <span className="material-symbols-outlined text-2xl">group</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Community</p>
        </Link>
        <button onClick={() => setIsSettingsOpen(true)} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <span className="material-symbols-outlined text-2xl">person</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <AdModal isOpen={isAdOpen} onClose={handleAdClose} />
    </div>
  );
}
