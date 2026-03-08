import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import SettingsModal from '../components/SettingsModal';
import CoinDisplay from '../components/CoinDisplay';
import StreakDisplay from '../components/StreakDisplay';
import AdModal from '../components/AdModal';
import { useAppContext } from '../context/AppContext';

// Mock database for latest videos
const LATEST_VIDEOS = [
  { id: 1, title: 'Building a REST API with Node.js', category: 'Node.js', time: '10:24', added: '2 days ago' },
  { id: 2, title: 'Python for Beginners', category: 'Python', time: '15:45', added: '1 day ago' },
  { id: 3, title: 'React Hooks Masterclass', category: 'React', time: '22:10', added: '3 days ago' },
];

export default function Explore() {
  const { profilePicture } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [hasWatchedAd, setHasWatchedAd] = useState(false);

  const handleVideoClick = () => {
    if (!hasWatchedAd) {
      setIsAdOpen(true);
    } else {
      // In a real app, this would navigate or open a player
      alert("Opening video player...");
    }
  };

  const handleAdClose = () => {
    setIsAdOpen(false);
    setHasWatchedAd(true);
    alert("Ad finished! In a real app, the video would start now.");
  };

  const filteredVideos = LATEST_VIDEOS.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark transition-colors duration-300 text-black dark:text-white overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
        <Link to="/dashboard" className="flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined cursor-pointer">arrow_back</span>
        </Link>
        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center">Explore</h2>
        <div className="flex w-auto items-center justify-end gap-3">
          <StreakDisplay />
          <CoinDisplay />
          <button onClick={() => setIsSettingsOpen(true)} className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Search Bar */}
        <div className="px-4 py-4 sticky top-0 bg-white dark:bg-black z-10">
          <div className="flex w-full items-center rounded-xl bg-gray-100 dark:bg-gray-900 px-4 py-3 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white transition-all">
            <span className="material-symbols-outlined text-gray-500">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, languages..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm ml-2 outline-none placeholder:text-gray-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Latest Videos */}
        <div className="px-4 mb-8">
          <h3 className="text-lg font-bold mb-4">Latest Videos</h3>
          <div className="grid grid-cols-1 gap-6">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <motion.div 
                  key={video.id} 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleVideoClick}
                  className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer group bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="h-48 bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <span className="material-symbols-outlined text-6xl text-gray-400 group-hover:text-primary transition-colors group-hover:scale-110 duration-300">play_circle</span>
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-mono font-bold">{video.time}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-primary/10 text-primary">
                        {video.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">• {video.added}</span>
                    </div>
                    <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{video.title}</h4>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">search_off</span>
                <p className="text-gray-500 font-medium">No videos found matching your search.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 pb-6 pt-3 z-50">
        <Link to="/dashboard" className="flex flex-1 flex-col items-center justify-center gap-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined">menu_book</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Courses</p>
        </Link>
        <Link to="/explore" className="flex flex-1 flex-col items-center justify-center gap-1 text-black dark:text-white">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>search</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Explore</p>
        </Link>
        <Link to="/community" className="flex flex-1 flex-col items-center justify-center gap-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined">group</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Community</p>
        </Link>
        <button onClick={() => setIsSettingsOpen(true)} className="flex flex-1 flex-col items-center justify-center gap-1 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined">person</span>
          <p className="text-[10px] font-bold uppercase tracking-wider">Profile</p>
        </button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <AdModal isOpen={isAdOpen} onClose={handleAdClose} />
    </div>
  );
}
