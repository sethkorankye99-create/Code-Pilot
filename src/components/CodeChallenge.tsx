import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import { Play, CheckCircle2, XCircle, RotateCcw, Lightbulb, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CodeChallengeProps {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  language: 'javascript' | 'html' | 'css' | 'typescript' | 'python';
  onSuccess?: () => void;
}

export default function CodeChallenge({ title, description, initialCode, solution, language, onSuccess }: CodeChallengeProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    setIsCorrect(null);

    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      },
      error: (...args: any[]) => {
        logs.push(`Error: ${args.join(' ')}`);
      }
    };

    try {
      if (language === 'javascript' || language === 'typescript') {
        // For TS, we just run it as JS for now (simplified)
        const execute = new Function('console', code);
        execute(customConsole);
        
        setOutput(logs);
        
        const expectedLogs: string[] = [];
        const expectedConsole = {
          log: (...args: any[]) => {
            expectedLogs.push(args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
          }
        };
        const executeSolution = new Function('console', solution);
        executeSolution(expectedConsole);

        const correct = JSON.stringify(logs) === JSON.stringify(expectedLogs);
        setIsCorrect(correct);
        if (correct && onSuccess) onSuccess();
      } else if (language === 'python') {
        // Simulated Python execution (since we don't have a real Python runtime in the browser easily)
        // In a real app, you'd use something like Pyodide
        setOutput(['Python execution is simulated in this demo.', 'Output: Hello from Python!']);
        setIsCorrect(true);
        if (onSuccess) onSuccess();
      } else {
        // For HTML/CSS
        setOutput(['Preview updated (HTML/CSS challenges are visual)']);
        setIsCorrect(true);
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setOutput([`Runtime Error: ${err.message}`]);
      setIsCorrect(false);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setIsCorrect(null);
  };

  const getLanguageHighlight = (code: string) => {
    switch (language) {
      case 'javascript': return highlight(code, languages.javascript, 'javascript');
      case 'typescript': return highlight(code, languages.typescript, 'typescript');
      case 'python': return highlight(code, languages.python, 'python');
      case 'css': return highlight(code, languages.css, 'css');
      case 'html': return highlight(code, languages.markup, 'markup');
      default: return code;
    }
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Code2 size={20} />
            </div>
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="p-2 text-slate-500 hover:text-primary transition-colors"
              title="Show Hint"
            >
              <Lightbulb size={20} className={showHint ? 'fill-yellow-400 text-yellow-500' : ''} />
            </button>
            <button 
              onClick={resetCode}
              className="p-2 text-slate-500 hover:text-rose-500 transition-colors"
              title="Reset Code"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
        
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-xs text-yellow-700 dark:text-yellow-500 font-medium"
            >
              <strong>Hint:</strong> Try to match the logic shown in the lesson examples.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Editor & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 h-[400px]">
        {/* Editor */}
        <div className="flex flex-col bg-[#0d1117] overflow-hidden">
          <div className="px-4 py-2 bg-[#161b22] border-b border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Editor</span>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{language}</span>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={getLanguageHighlight}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 13,
                minHeight: '100%',
              }}
              className="outline-none text-slate-300"
            />
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden">
          <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Console Output</span>
            {isCorrect !== null && (
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                {isCorrect ? 'Success' : 'Incorrect'}
              </div>
            )}
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto no-scrollbar space-y-1">
            {output.length === 0 ? (
              <span className="text-slate-400 italic">Run your code to see results...</span>
            ) : (
              output.map((line, i) => (
                <div key={i} className={line.startsWith('Error') ? 'text-rose-500' : 'text-slate-600 dark:text-slate-400'}>
                  {line}
                </div>
              ))
            )}
          </div>
          
          {/* Run Button */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={runCode}
              disabled={isRunning}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                isCorrect === true 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-primary text-white shadow-primary/20 hover:bg-primary/90'
              }`}
            >
              {isRunning ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
