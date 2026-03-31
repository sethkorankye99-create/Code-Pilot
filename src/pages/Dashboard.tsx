import { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../components/SettingsModal';
import CoinDisplay from '../components/CoinDisplay';
import StreakDisplay from '../components/StreakDisplay';
import TodoList from '../components/TodoList';
import { Trophy, Star, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

import { useAppContext } from '../context/AppContext';

const COURSES = [
  {
    id: 'html',
    title: 'HTML5 Mastery',
    description: 'Structure and accessibility for the modern web.',
    progress: 85,
    icon: 'code',
    tag: 'WEB',
    colorClass: 'text-accent-html',
    bgClass: 'bg-accent-html/10',
    bgFillClass: 'bg-accent-html',
    categories: ['Frontend'],
    link: '/html-mastery'
  },
  {
    id: 'css',
    title: 'Advanced CSS3',
    description: 'Flexbox, Grid, and creative animations.',
    progress: 42,
    icon: 'palette',
    tag: 'DESIGN',
    colorClass: 'text-accent-css',
    bgClass: 'bg-accent-css/10',
    bgFillClass: 'bg-accent-css',
    categories: ['Frontend'],
    link: '/css-mastery'
  },
  {
    id: 'js',
    title: 'Modern JavaScript',
    description: 'ES6+, Async programming, and functional concepts.',
    progress: 54,
    icon: 'terminal',
    tag: 'ESSENTIAL',
    colorClass: 'text-accent-js',
    bgClass: 'bg-accent-js/10',
    bgFillClass: 'bg-accent-js',
    categories: ['Frontend', 'Backend'],
    link: '/js-mastery'
  },
  {
    id: 'ts',
    title: 'TypeScript Pro',
    description: 'Type safety and advanced generic programming.',
    progress: 92,
    icon: 'terminal',
    tag: 'ROBUST',
    colorClass: 'text-accent-ts',
    bgClass: 'bg-accent-ts/10',
    bgFillClass: 'bg-accent-ts',
    categories: ['Frontend'],
    link: '/ts-mastery'
  },
  {
    id: 'python',
    title: 'Python for Systems',
    description: 'Scripting, automation, and backend services.',
    progress: 30,
    icon: 'terminal',
    tag: 'SYSTEMS',
    colorClass: 'text-accent-python',
    bgClass: 'bg-accent-python/10',
    bgFillClass: 'bg-accent-python',
    categories: ['Backend', 'Systems'],
    link: '/python-mastery'
  },
  {
    id: 'cpp',
    title: 'C++ Mastery',
    description: 'High-performance computing and systems programming.',
    progress: 15,
    icon: 'memory',
    tag: 'PERFORMANCE',
    colorClass: 'text-accent-cpp',
    bgClass: 'bg-accent-cpp/10',
    bgFillClass: 'bg-accent-cpp',
    categories: ['Backend', 'Systems'],
    link: '/cpp-mastery'
  }
];

export default function Dashboard() {
  const { profilePicture } = useAppContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = activeCategory === 'All Courses' || course.categories.includes(activeCategory);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 overflow-x-hidden">
      {/* Header / Navigation */}
      <div className="sticky top-0 z-40 flex items-center bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl p-4 justify-between border-b border-slate-200/50 dark:border-white/10 shadow-sm">
        <div className="text-primary flex size-10 shrink-0 items-center justify-center bg-primary/10 rounded-xl border border-primary/20 shadow-sm">
          <span className="material-symbols-outlined text-2xl">terminal</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 ml-3">Code Pillot</h2>
        <div className="flex w-auto items-center justify-end gap-3">
          <Link to="/playground" className="hidden sm:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md hover:-translate-y-0.5">
            <span className="material-symbols-outlined text-sm">code</span>
            Playground
          </Link>
          <StreakDisplay />
          <CoinDisplay />
          <button onClick={() => setIsSettingsOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors overflow-hidden border border-slate-200 dark:border-white/10">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-6">
        <label className="flex flex-col w-full group">
          <div className="flex w-full items-center rounded-2xl bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all duration-300 overflow-hidden h-14">
            <div className="flex items-center justify-center pl-5 text-slate-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 px-4 text-base font-medium outline-none" 
              placeholder="Search courses, topics, or languages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="flex items-center justify-center pr-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </label>
      </div>

      {/* Achievement Banner */}
      <div className="px-4 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-slate-900 dark:bg-[#050505] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/20 border border-slate-800/80"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="size-20 shrink-0 flex items-center justify-center bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-md rounded-2xl border border-yellow-500/30 shadow-inner">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <Trophy size={40} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              </motion.div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">Your Journey</span>
              </div>
              <h3 className="text-3xl font-bold mb-2 tracking-tight text-white">Master Your Skills</h3>
              <p className="text-slate-400 text-sm font-medium max-w-md leading-relaxed">
                Complete quizzes in any section to win Bronze, Silver, and Gold trophies. Show off your expertise!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Tutor Promo */}
      <div className="px-4 pb-8">
        <Link to="/ai-tutor">
          <motion.div 
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/10 dark:to-purple-900/10 backdrop-blur-xl border border-indigo-100/50 dark:border-white/10 rounded-[2rem] p-6 flex items-center gap-5 group transition-all shadow-sm hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="size-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">AI Programming Tutor</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Stuck on a bug? Ask any programming question and get instant help.</p>
            </div>
            <div className="size-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-indigo-500 shadow-sm group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <ChevronRight size={20} />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Todo List Section */}
      <div className="px-4 pb-8">
        <TodoList />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 px-4 pb-6 overflow-x-auto no-scrollbar">
        {['All Courses', 'Frontend', 'Backend', 'Systems'].map((category) => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all duration-300 ${
              activeCategory === category 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md border-transparent hover:-translate-y-0.5' 
                : 'bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-slate-400/50 dark:hover:border-white/20 hover:shadow-sm hover:-translate-y-0.5'
            }`}
          >
            <span className="text-sm font-bold leading-normal">{category}</span>
          </button>
        ))}
      </div>

      {/* Main Content: Course Grid */}
      <div className="px-4 pb-32">
        <h3 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight mb-6">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Continue Learning'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Link key={course.id} to={course.link} className="group bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-200/50 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 block">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${course.bgClass} ${course.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-symbols-outlined text-3xl">{course.icon}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${course.colorClass} ${course.bgClass} px-3 py-1.5 rounded-full`}>{course.tag}</span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{course.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">{course.description}</p>
                <div className="space-y-3 mt-auto">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700 dark:text-slate-300">Progress</span>
                    <span className="text-slate-900 dark:text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`${course.bgFillClass} h-full rounded-full relative overflow-hidden`}
                    />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-card-dark rounded-[2rem] border border-dashed border-slate-200 dark:border-white/10">
              <div className="size-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-2">No courses found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-primary font-bold text-sm hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl px-4 pb-safe pt-2 z-50 sm:pb-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="flex flex-col items-center justify-center gap-1 p-2 text-primary">
            <div className="bg-primary/10 p-1.5 rounded-xl">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>menu_book</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Courses</p>
          </Link>
          <Link to="/playground" className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined">code</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Editor</p>
          </Link>
          <Link to="/ai-tutor" className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">AI Tutor</p>
          </Link>
          <button onClick={() => setIsSettingsOpen(true)} className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined">person</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
          </button>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
