import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export default function Landing() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-background-dark transition-colors duration-300">
      {/* Top App Bar Component */}
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 md:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
            <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Code Pillot</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-600 dark:text-slate-400 font-medium hover:text-primary transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
            Sign Up
          </Link>
        </div>
      </header>
      
      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
        {/* Illustration Area */}
        <div className="w-full @container mb-8">
          <div className="relative w-full aspect-square max-w-[400px] mx-auto">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full"></div>
            {/* Trophy Visual */}
            <div 
              className="relative w-full h-full bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl flex items-center justify-center bg-cover bg-center" 
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent"></div>
              
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative z-10 flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/40 blur-2xl rounded-full"></div>
                  <Trophy size={120} className="text-yellow-400 relative z-10 drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="size-3 rounded-full bg-yellow-500 animate-pulse"></div>
                  <div className="size-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
                  <div className="size-3 rounded-full bg-yellow-500 animate-pulse delay-150"></div>
                </div>
              </motion.div>

              {/* Floating Tech Tags */}
              <div className="absolute top-8 left-8 bg-slate-900/80 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-xs text-primary font-mono shadow-lg">JS</div>
              <div className="absolute bottom-12 right-12 bg-slate-900/80 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-xs text-primary font-mono shadow-lg">CSS</div>
              <div className="absolute top-1/4 right-8 bg-slate-900/80 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full text-xs text-primary font-mono shadow-lg">HTML</div>
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="text-center space-y-4 max-w-lg">
          <h1 className="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Master the Art of <span className="text-primary">Code</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Learn HTML, CSS, JavaScript, and more with interactive lessons designed for the next generation of developers.
          </p>
        </div>
        
        {/* Action Area */}
        <div className="w-full max-w-sm mt-12 space-y-6">
          <Link to={isLoggedIn ? "/dashboard" : "/signup"} className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white font-bold h-14 rounded-2xl transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-2 group">
            <span>Get Started</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <div className="flex flex-col items-center">
              <span className="text-slate-900 dark:text-slate-100 font-bold text-xl">50k+</span>
              <span className="text-slate-500 text-xs uppercase tracking-wider">Students</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex flex-col items-center">
              <span className="text-slate-900 dark:text-slate-100 font-bold text-xl">120+</span>
              <span className="text-slate-500 text-xs uppercase tracking-wider">Courses</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex flex-col items-center">
              <span className="text-slate-900 dark:text-slate-100 font-bold text-xl">4.9</span>
              <span className="text-slate-500 text-xs uppercase tracking-wider">Rating</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Decoration */}
      <footer className="p-8 flex justify-center opacity-30">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-8 h-2 rounded-full bg-primary/40"></div>
          <div className="w-2 h-2 rounded-full bg-primary/40"></div>
        </div>
      </footer>
    </div>
  );
}
