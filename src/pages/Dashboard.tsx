import { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../components/SettingsModal';
import CoinDisplay from '../components/CoinDisplay';
import StreakDisplay from '../components/StreakDisplay';

import { useAppContext } from '../context/AppContext';

const COURSES = [
  {
    id: 'html',
    title: 'HTML5 Mastery',
    description: 'Structure and accessibility for the modern web.',
    progress: 85,
    icon: 'html',
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
    icon: 'css',
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
    icon: 'javascript',
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
    icon: 'script',
    tag: 'ROBUST',
    colorClass: 'text-accent-ts',
    bgClass: 'bg-accent-ts/10',
    bgFillClass: 'bg-accent-ts',
    categories: ['Frontend'],
    link: '/ts-mastery'
  },
  {
    id: 'java',
    title: 'Java Architecture',
    description: 'Scalable backend systems and OOP design patterns.',
    progress: 68,
    icon: 'coffee',
    tag: 'ENTERPRISE',
    colorClass: 'text-accent-java',
    bgClass: 'bg-accent-java/10',
    bgFillClass: 'bg-accent-java',
    categories: ['Backend', 'Systems'],
    link: '#'
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
      <div className="flex items-center bg-background-light dark:bg-card-dark p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="text-primary flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-3xl">terminal</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 ml-2">Code Pillot</h2>
        <div className="flex w-auto items-center justify-end gap-3">
          <Link to="/playground" className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-500/20">
            <span className="material-symbols-outlined text-sm">code</span>
            Playground
          </Link>
          <StreakDisplay />
          <CoinDisplay />
          <button onClick={() => setIsSettingsOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden border border-primary/20">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-4">
        <label className="flex flex-col min-w-40 h-14 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm focus-within:ring-2 focus-within:ring-primary transition-all">
            <div className="text-slate-400 dark:text-slate-500 flex border-none bg-white items-center justify-center pl-4 rounded-l-xl dark:bg-card-dark">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="form-input flex w-full min-w-0 flex-1 border-none bg-white text-slate-900 dark:text-white focus:ring-0 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 text-base font-medium dark:bg-card-dark outline-none" 
              placeholder="Search programming languages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <div className="bg-white dark:bg-card-dark flex items-center pr-4 rounded-r-xl">
                <button 
                  onClick={() => setSearchQuery('')}
                  className="flex items-center justify-center p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            )}
            {!searchQuery && <div className="bg-white dark:bg-card-dark pr-4 rounded-r-xl"></div>}
          </div>
        </label>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
        {['All Courses', 'Frontend', 'Backend', 'Systems'].map((category) => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all ${
              activeCategory === category 
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,106,244,0.6)] border-transparent' 
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 dark:bg-card-dark hover:border-primary/50'
            }`}
          >
            <span className="text-sm font-semibold leading-normal">{category}</span>
          </button>
        ))}
      </div>

      {/* Main Content: Course Grid */}
      <div className="px-4 pb-24">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight mb-4">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Continue Learning'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Link key={course.id} to={course.link} className="bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm block hover:border-primary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${course.bgClass} ${course.colorClass}`}>
                    <span className="material-symbols-outlined text-3xl">{course.icon}</span>
                  </div>
                  <span className={`text-xs font-bold ${course.colorClass} ${course.bgClass} px-2 py-1 rounded`}>{course.tag}</span>
                </div>
                <h4 className="text-lg font-bold mb-1">{course.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{course.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className={`${course.bgFillClass} h-full rounded-full`} style={{width: `${course.progress}%`}}></div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-card-dark rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
              <p className="text-slate-500 dark:text-slate-400 font-medium">No courses found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary font-bold text-sm hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark px-4 pb-6 pt-3 z-50">
        <Link to="/dashboard" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
          <span className="material-symbols-outlined">menu_book</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Courses</p>
        </Link>
        <Link to="/playground" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">code</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Editor</p>
        </Link>
        <Link to="/explore" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">search</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Explore</p>
        </Link>
        <Link to="/community" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">group</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Community</p>
        </Link>
        <button onClick={() => setIsSettingsOpen(true)} className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">person</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
