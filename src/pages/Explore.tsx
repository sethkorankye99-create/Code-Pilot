import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SettingsModal from '../components/SettingsModal';
import CoinDisplay from '../components/CoinDisplay';
import StreakDisplay from '../components/StreakDisplay';
import AdModal from '../components/AdModal';
import { useAppContext } from '../context/AppContext';

interface Video {
  id: number;
  title: string;
  category: string;
  url: string;
  time: string;
  image_url: string;
  created_at: string;
}

export default function Explore() {
  const { profilePicture } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [hasWatchedAd, setHasWatchedAd] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVideos(data.videos);
        }
      })
      .catch(err => console.error("Failed to fetch videos", err));
  }, []);

  const handleVideoClick = (url: string) => {
    if (!hasWatchedAd) {
      setSelectedVideoUrl(url);
      setIsAdOpen(true);
    } else {
      window.open(url, '_blank');
    }
  };

  const handleAdClose = () => {
    setIsAdOpen(false);
    setHasWatchedAd(true);
    if (selectedVideoUrl) {
      window.open(selectedVideoUrl, '_blank');
      setSelectedVideoUrl(null);
    }
  };

  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 text-black dark:text-white overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-4 justify-between border-b border-slate-200/50 dark:border-white/10 shadow-sm dark:shadow-none">
        <Link to="/dashboard" className="flex size-10 shrink-0 items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center text-slate-900 dark:text-white">Explore</h2>
        <div className="flex w-auto items-center justify-end gap-3">
          <StreakDisplay />
          <CoinDisplay />
          <button onClick={() => setIsSettingsOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors overflow-hidden border border-slate-200 dark:border-slate-700">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Search Bar */}
        <div className="px-4 py-6">
          <label className="flex flex-col w-full group">
            <div className="flex w-full items-center rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all duration-300 overflow-hidden h-14">
              <div className="flex items-center justify-center pl-5 text-slate-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos, categories..." 
                className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 px-4 text-base font-medium outline-none"
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

        {/* Latest Videos */}
        <div className="px-4 mb-8">
          <h3 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight mb-6">Latest Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <motion.div 
                  key={video.id} 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleVideoClick(video.url)}
                  className="group bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/50 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30 dark:hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="h-48 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center overflow-hidden">
                    {video.image_url ? (
                      <img src={video.image_url} alt={video.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : null}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                    
                    {/* Premium Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 group-hover:bg-primary/90 group-hover:border-primary transition-all duration-300 shadow-2xl">
                        <span className="material-symbols-outlined text-4xl text-white ml-1">play_arrow</span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-mono font-bold z-20 shadow-lg border border-white/10">{video.time}</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                        {video.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">• {new Date(video.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold text-xl leading-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">{video.title}</h4>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-card-dark rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-2">No videos found matching your search.</p>
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
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl px-4 pb-safe pt-2 z-50 sm:pb-2 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Courses</p>
          </Link>
          <Link to="/playground" className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">code</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Editor</p>
          </Link>
          <Link to="/explore" className="flex flex-col items-center justify-center gap-1 p-2 text-primary">
            <div className="bg-primary/10 p-1.5 rounded-xl">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>search</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Explore</p>
          </Link>
          <Link to="/community" className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">group</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Community</p>
          </Link>
          <button onClick={() => setIsSettingsOpen(true)} className="flex flex-col items-center justify-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <div className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">person</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
          </button>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <AdModal isOpen={isAdOpen} onClose={handleAdClose} />
    </div>
  );
}
