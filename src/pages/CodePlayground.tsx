import React, { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import { Play, Info, Mail, Menu, X, Code2, Eye, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

type FileType = 'html' | 'css' | 'js';

export default function CodePlayground() {
  const navigate = useNavigate();
  const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>Start coding to see magic happen!</p>\n<button id="btn">Click Me</button>');
  const [css, setCss] = useState('body {\n  font-family: sans-serif;\n  background: #f0f0f0;\n  padding: 20px;\n}\n\nh1 {\n  color: #2563eb;\n}\n\nbutton {\n  padding: 10px 20px;\n  background: #22c55e;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}');
  const [js, setJs] = useState('const btn = document.getElementById("btn");\n\nbtn.addEventListener("click", () => {\n  alert("Button Clicked!");\n  document.body.style.background = "#e0e7ff";\n});');
  
  const [activeTab, setActiveTab] = useState<FileType>('html');
  const [srcDoc, setSrcDoc] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const insertSymbol = (symbol: string) => {
    const textarea = document.querySelector('.playground-editor textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
    const newText = text.substring(0, start) + symbol + text.substring(end);

    if (activeTab === 'html') setHtml(newText);
    else if (activeTab === 'css') setCss(newText);
    else setJs(newText);

    // Focus back and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 0);
  };

  const runLive = () => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(srcDoc);
      newWindow.document.close();
    }
  };

  const shortcuts = [
    { label: '(', value: '(' },
    { label: ')', value: ')' },
    { label: '{', value: '{' },
    { label: '}', value: '}' },
    { label: '[', value: '[' },
    { label: ']', value: ']' },
    { label: ';', value: ';' },
    { label: '=', value: '=' },
    { label: '!', value: '!' },
    { label: '&&', value: '&&' },
    { label: 'if', value: 'if () {}' },
    { label: 'log', value: 'console.log()' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-slate-300 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-[#161b22] flex items-center justify-between px-4 md:px-8 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors mr-1"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
            <span className="md:hidden text-sm font-bold">Back</span>
          </button>
          <div className="size-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Code2 size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:inline-block">Playground</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <button 
            onClick={runLive}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" /> Run Live
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-400">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-[#161b22] border-b border-slate-800 p-6 flex flex-col gap-4 z-40 md:hidden shadow-2xl"
          >
            <button 
              onClick={() => {
                runLive();
                setIsMenuOpen(false);
              }}
              className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Play size={20} fill="currentColor" /> Run Live
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Editor Section */}
        <div className={`flex-1 flex flex-col border-r border-slate-800 transition-all duration-300 ${showPreview ? 'hidden md:flex' : 'flex'}`}>
          {/* Tabs */}
          <div className="flex bg-[#0d1117] border-b border-slate-800">
            {(['html', 'css', 'js'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' 
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab === 'html' ? 'index.html' : tab === 'css' ? 'style.css' : 'main.js'}
              </button>
            ))}
          </div>

          {/* Editor Container */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0d1117] playground-editor relative">
            <Editor
              value={activeTab === 'html' ? html : activeTab === 'css' ? css : js}
              onValueChange={code => {
                if (activeTab === 'html') setHtml(code);
                else if (activeTab === 'css') setCss(code);
                else setJs(code);
              }}
              highlight={code => highlight(code, activeTab === 'html' ? languages.markup : activeTab === 'css' ? languages.css : languages.javascript, activeTab)}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                minHeight: '100%',
              }}
              className="outline-none"
            />
          </div>

          {/* Mobile Shortcut Bar */}
          <div className="h-12 bg-[#161b22] border-t border-slate-800 flex items-center px-2 gap-2 overflow-x-auto no-scrollbar shrink-0">
            <div className="flex items-center gap-1.5">
              {shortcuts.map((s) => (
                <button
                  key={s.label}
                  onClick={() => insertSymbol(s.value)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-mono transition-colors active:scale-95"
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 pl-4 border-l border-slate-800">
              <button 
                onClick={runLive}
                className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-md text-xs font-bold"
              >
                <Play size={14} fill="currentColor" /> Run Live
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${showPreview ? 'flex' : 'hidden md:flex'}`}>
          <div className="h-14 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-white md:bg-transparent border border-slate-200 md:border-none p-2 md:p-1.5 hover:bg-slate-200 rounded-lg md:rounded text-slate-700 md:text-slate-500 hover:text-slate-900 transition-colors mr-1 font-bold text-sm"
                title="Back to Dashboard"
              >
                <ArrowLeft size={18} className="md:size-4" />
                <span className="md:hidden">Back</span>
              </button>
              <div className="hidden md:flex items-center gap-2">
                <Eye size={16} className="text-slate-500" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="md:hidden text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Preview</span>
              <button 
                onClick={() => setShowPreview(false)}
                className="md:hidden flex items-center gap-2 bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-bold shadow-sm"
              >
                <Code2 size={16} />
                <span>Editor</span>
              </button>
              <button 
                onClick={() => setShowPreview(false)}
                className="hidden md:flex text-slate-500 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <iframe
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-scripts"
            className="flex-1 w-full border-none"
          />

          {/* Mobile Preview Floating Controls */}
          {showPreview && (
            <div className="md:hidden fixed bottom-6 right-6 flex flex-col gap-3 z-[60]">
              <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => setShowPreview(false)}
                className="size-12 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-2xl border border-slate-700"
                title="Back to Editor"
              >
                <Code2 size={20} />
              </motion.button>
              <motion.button 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => navigate('/dashboard')}
                className="size-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl"
                title="Back to Dashboard"
              >
                <ArrowLeft size={24} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Floating Run Button (Desktop) */}
        <button 
          onClick={runLive}
          className="hidden md:flex absolute bottom-8 right-8 size-14 bg-emerald-500 text-white rounded-full items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform z-50"
          title="Run Live"
        >
          <Play size={24} fill="currentColor" />
        </button>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-[#0d1117] border-t border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span className="flex items-center gap-1"><div className="size-1.5 rounded-full bg-emerald-500" /> Connected</span>
          <span>UTF-8</span>
        </div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Line 1, Col 1
        </div>
      </footer>
    </div>
  );
}
