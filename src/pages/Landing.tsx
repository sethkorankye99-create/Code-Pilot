import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Landing() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-300 circuit-pattern">
      {/* Top App Bar Component */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
          </div>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Code Pillot</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-600 dark:text-slate-400 font-medium hover:text-primary transition-colors">
            Log In
          </Link>
          <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/10">
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
            {/* Code Brackets & Circuit Visual */}
            <div 
              className="relative w-full h-full bg-slate-900/40 border border-slate-800/50 rounded-3xl overflow-hidden backdrop-blur-md flex items-center justify-center bg-cover bg-center" 
              style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8fUYE_OqE9m_APk8YN1_hAyzc1Ez6BUV50PFY4cEoFRxoLeA0zEjvihXNcXRWK_MteBIcbyiqICVHFhhaJtF47_W4nrCE-SLaKC7ZkrwfumoieuTDjVWXz9lZc_T1Tmzn1OkuOqdJh0swPsil-5H-s2vXVeyJH69GodJFJyo7Q7uwaWqFwJ3_fsAdOvWvwxf6c2oRtav_JrFONE94so7cT5DI02MOynJuo7g0wLay6FA82eWmcpkFeYGWmvJB8TM4jJ5Xj8rWPf8')"}}
            >
              <div className="flex items-center space-x-4">
                <span className="text-primary text-7xl font-bold opacity-80">&lt;</span>
                <div className="h-16 w-1 bg-primary/40 rounded-full"></div>
                <span className="text-primary text-7xl font-bold opacity-80">/&gt;</span>
              </div>
              {/* Floating Tech Tags */}
              <div className="absolute top-8 left-8 bg-slate-900/80 border border-primary/30 px-3 py-1 rounded-full text-xs text-primary font-mono">JS</div>
              <div className="absolute bottom-12 right-12 bg-slate-900/80 border border-primary/30 px-3 py-1 rounded-full text-xs text-primary font-mono">CSS</div>
              <div className="absolute top-1/4 right-8 bg-slate-900/80 border border-primary/30 px-3 py-1 rounded-full text-xs text-primary font-mono">HTML</div>
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
        <div className="w-full max-w-sm mt-12 space-y-4">
          <Link to={isLoggedIn ? "/dashboard" : "/signup"} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
            <span>Get Started</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          
          <div className="flex items-center justify-center gap-6 pt-4">
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
