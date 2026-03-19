import { Link } from 'react-router-dom';

export default function Lesson() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="flex items-center bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl p-4 pb-4 justify-between border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-40">
        <Link to="/dashboard" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined text-xl">close</span>
        </Link>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight flex-1 text-center">Hello World in JS</h2>
        <div className="flex items-center justify-end gap-2">
          <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-xl">help</span>
          </button>
        </div>
      </header>

      {/* Progress Section */}
      <div className="flex flex-col gap-2 p-4 bg-background-light dark:bg-background-dark">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Lesson 1 of 12</p>
          <p className="text-primary text-sm font-bold">8% Complete</p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-800 h-2 w-full overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{width: '8%'}}></div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Explanation Panel */}
        <section className="mt-4 p-4 rounded-xl border dark:border-slate-800 bg-slate-900/50 border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <span className="material-symbols-outlined text-lg">info</span>
            <h3 className="text-slate-900 dark:text-slate-100 text-base font-bold">The Basics</h3>
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            To display text or variables in JavaScript, we use the <code className="bg-primary/10 text-primary px-1 rounded">console.log()</code> function. This output appears in the developer console or the output window below.
          </p>
        </section>

        {/* Editor Toolbar */}
        <div className="mt-6 flex items-center justify-between px-2 py-2 dark:bg-slate-900 rounded-t-lg border-x border-t dark:border-slate-800 bg-slate-900 border-slate-800">
          <div className="flex gap-2 items-center">
            <span className="material-symbols-outlined text-sm text-slate-500">terminal</span>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">script.js</span>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-sm text-slate-500 cursor-pointer hover:text-primary">settings</span>
          </div>
        </div>

        {/* Code Editor Snippet */}
        <div className="font-mono text-sm p-4 bg-white dark:bg-[#0d1117] border dark:border-slate-800 rounded-b-lg shadow-inner min-h-[160px] border-slate-800">
          <div className="flex gap-4">
            <div className="text-slate-400 dark:text-slate-600 text-right select-none pr-2 border-r border-slate-200 dark:border-slate-800">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div>
            <div className="flex-1">
              <div><span className="code-syntax-comment">// Print your message below</span></div>
              <div><span className="code-syntax-func">console</span>.<span className="code-syntax-func">log</span>(<span className="code-syntax-string">"Hello, Code Pillot!"</span>);</div>
              <div className="flex">
                <span className="animate-pulse w-0.5 h-5 bg-primary"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Output Preview (Mini Terminal) */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">output</span> Output
          </h4>
          <div className="p-4 rounded-lg border border-slate-800 font-mono text-sm text-slate-300">
            <div className="flex gap-2">
              <span className="text-slate-500">&gt;</span>
              <span>Waiting for execution...</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 flex gap-3 z-50">
        <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5">
          <span className="material-symbols-outlined text-xl">play_arrow</span>
          Run Code
        </button>
        <button className="w-14 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700/50">
          <span className="material-symbols-outlined text-xl">restart_alt</span>
        </button>
      </footer>
    </div>
  );
}
