import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Code, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Terminal, 
  Box, 
  Clock, 
  LayoutTemplate, 
  Zap, 
  FunctionSquare, 
  AlertTriangle, 
  Globe, 
  BrainCircuit, 
  Wrench,
  Trophy,
  RefreshCcw,
  Home,
  Sparkles
} from 'lucide-react';
import { jsContent } from '../data/jsContent';
import { useAppContext } from '../context/AppContext';
import TrophyModal from '../components/TrophyModal';
import CodeChallenge from '../components/CodeChallenge';

const sectionIcons: Record<string, React.ReactNode> = {
  'js-fundamentals': <Terminal size={20} />,
  'objects-prototypes': <Box size={20} />,
  'async-js': <Clock size={20} />,
  'dom-manipulation': <LayoutTemplate size={20} />,
  'es6-features': <Zap size={20} />,
  'functional-programming': <FunctionSquare size={20} />,
  'error-handling': <AlertTriangle size={20} />,
  'browser-apis': <Globe size={20} />,
  'advanced-concepts': <BrainCircuit size={20} />,
  'tooling-environment': <Wrench size={20} />,
  'es6-plus-mastery': <Sparkles size={20} />,
};

export default function JsReference() {
  const { deductCoin, updateStreak, addCoins } = useAppContext();
  const [activeSectionId, setActiveSectionId] = useState(jsContent[0].id);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState(false);
  const [isDeducting, setIsDeducting] = useState(false);

  const activeSection = jsContent.find(s => s.id === activeSectionId) || jsContent[0];

  const handleQuizStart = async () => {
    setQuizMode(true);
    await updateStreak();
  };

  const handleNextSection = () => {
    const currentIndex = jsContent.findIndex(s => s.id === activeSectionId);
    if (currentIndex < jsContent.length - 1) {
      setActiveSectionId(jsContent[currentIndex + 1].id);
      resetQuiz();
    }
  };

  const handlePrevSection = () => {
    const currentIndex = jsContent.findIndex(s => s.id === activeSectionId);
    if (currentIndex > 0) {
      setActiveSectionId(jsContent[currentIndex - 1].id);
      resetQuiz();
    }
  };

  const resetQuiz = () => {
    setQuizMode(false);
    setCurrentQuizIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionSelect = async (index: number) => {
    if (selectedOption !== null || isDeducting) return;
    
    setIsDeducting(true);
    const result = await deductCoin();
    
    if (result.success) {
      setSelectedOption(index);
      const correct = index === activeSection.quizzes[currentQuizIndex].correctAnswer;
      setIsCorrect(correct);
      if (correct) setScore(s => s + 1);

      setTimeout(() => {
        if (currentQuizIndex < activeSection.quizzes.length - 1) {
          setCurrentQuizIndex(i => i + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          setQuizFinished(true);
          setIsTrophyModalOpen(true);
          const finalScore = correct ? score + 1 : score;
          if (finalScore > 0) {
            addCoins(finalScore);
          }
        }
      }, 3500);
    }
    setIsDeducting(false);
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl flex flex-col shrink-0 overflow-y-auto no-scrollbar hidden md:flex">
        <div className="p-6 border-b border-slate-200/50 dark:border-white/10 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-accent-js flex items-center justify-center text-slate-900 shadow-lg shadow-accent-js/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">JS Mastery</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Complete Reference</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {jsContent.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                resetQuiz();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeSectionId === section.id 
                  ? 'bg-accent-js/20 text-yellow-600 dark:text-yellow-500 font-semibold' 
                  : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className={activeSectionId === section.id ? 'text-yellow-600 dark:text-yellow-500' : 'text-slate-400'}>
                {sectionIcons[section.id]}
              </span>
              <span className="text-sm truncate">{section.title}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-6 border-t border-slate-200/50 dark:border-white/10">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors">
            <Home size={16} />
            Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-50/50 dark:bg-[#050505]">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl z-10">
          <Link to="/dashboard" className="text-slate-500">
            <ChevronLeft size={24} />
          </Link>
          <h2 className="font-bold text-sm truncate px-4">{activeSection.title}</h2>
          <div className="size-6" />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 no-scrollbar relative">
          {/* Desktop Back Button */}
          <div className="hidden md:block absolute top-10 right-10 z-20">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-500 hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm"
            >
              <Home size={18} />
              <span className="text-sm font-bold">Home</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {!quizMode ? (
              <motion.div
                key={`content-${activeSectionId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                {/* Section Header */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-js/20 text-yellow-700 dark:text-yellow-500 text-xs font-bold uppercase tracking-wider">
                    {sectionIcons[activeSectionId]}
                    Section {jsContent.findIndex(s => s.id === activeSectionId) + 1}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">{activeSection.title}</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {activeSection.note}
                  </p>
                </div>

                {/* Example Block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
                    <Code size={16} />
                    Code Example
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-js to-yellow-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <pre className="relative p-6 rounded-xl bg-slate-900/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl text-slate-300 font-mono text-sm overflow-x-auto border border-slate-800/50 dark:border-white/10 shadow-2xl">
                      <code>{activeSection.example}</code>
                    </pre>
                  </div>
                </div>

                {/* Interactive Challenge */}
                {activeSection.challenge && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest">
                      <Terminal size={16} />
                      Interactive Challenge
                    </div>
                    <CodeChallenge 
                      title={activeSection.challenge.title}
                      description={activeSection.challenge.description}
                      initialCode={activeSection.challenge.initialCode}
                      solution={activeSection.challenge.solution}
                      language="javascript"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleQuizStart}
                    className="flex-1 flex items-center justify-center gap-2 bg-accent-js hover:bg-yellow-400 text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-accent-js/20 hover:shadow-accent-js/40 hover:-translate-y-0.5 group"
                  >
                    <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                    Take Section Quiz
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevSection}
                      disabled={jsContent.findIndex(s => s.id === activeSectionId) === 0}
                      className="size-14 flex items-center justify-center bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNextSection}
                      disabled={jsContent.findIndex(s => s.id === activeSectionId) === jsContent.length - 1}
                      className="size-14 flex items-center justify-center bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`quiz-${activeSectionId}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto h-full flex flex-col justify-center"
              >
                {!quizFinished ? (
                  <div className="space-y-8">
                    {/* Quiz Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Question {currentQuizIndex + 1} of {activeSection.quizzes.length}</h3>
                          <p className="text-[10px] font-bold text-yellow-600 dark:text-yellow-500 uppercase tracking-tighter">Each question costs 1 coin</p>
                        </div>
                        <span className="text-yellow-600 dark:text-yellow-500 font-black text-xl">{score}/{activeSection.quizzes.length}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent-js"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuizIndex + 1) / activeSection.quizzes.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <div className="space-y-4">
                      <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                        {activeSection.quizzes[currentQuizIndex].question}
                      </h2>
                      {isDeducting && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse font-medium">
                          <div className="size-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                          Deducting 1 coin...
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="grid gap-3">
                      {activeSection.quizzes[currentQuizIndex].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrectOption = idx === activeSection.quizzes[currentQuizIndex].correctAnswer;
                        
                        let bgColor = "bg-white/80 dark:bg-card-dark/80 backdrop-blur-md hover:border-accent-js/50";
                        let borderColor = "border-slate-200/50 dark:border-white/10";
                        let textColor = "text-slate-700 dark:text-slate-300";

                        if (selectedOption !== null) {
                          if (isCorrectOption) {
                            bgColor = "bg-emerald-500/10 backdrop-blur-md";
                            borderColor = "border-emerald-500/50";
                            textColor = "text-emerald-500";
                          } else if (isSelected) {
                            bgColor = "bg-rose-500/10 backdrop-blur-md";
                            borderColor = "border-rose-500/50";
                            textColor = "text-rose-500";
                          } else {
                            bgColor = "bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md opacity-50";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={selectedOption !== null || isDeducting}
                            className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:cursor-not-allowed ${bgColor} ${borderColor} ${textColor}`}
                          >
                            <span className="font-semibold">{option}</span>
                            {selectedOption !== null && isCorrectOption && <CheckCircle2 size={20} />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                      {selectedOption !== null && activeSection.quizzes[currentQuizIndex].explanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border ${
                            isCorrect 
                              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                              : 'bg-rose-500/5 border-rose-500/20 text-rose-700 dark:text-rose-400'
                          }`}
                        >
                          <div className="flex gap-2">
                            <BrainCircuit size={18} className="shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-xs font-bold uppercase tracking-wider">Explanation</p>
                              <p className="text-sm leading-relaxed">
                                {activeSection.quizzes[currentQuizIndex].explanation}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8"
                  >
                    <div className="size-32 bg-accent-js/20 rounded-full flex items-center justify-center mx-auto text-yellow-600 dark:text-yellow-500">
                      <Trophy size={64} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black">Section Complete!</h2>
                      <p className="text-slate-500">You scored {score} out of 10</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={resetQuiz}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-4 px-8 rounded-2xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        <RefreshCcw size={20} />
                        Retake Quiz
                      </button>
                      <button 
                        onClick={() => {
                          handleNextSection();
                          resetQuiz();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-accent-js text-slate-900 font-bold py-4 px-8 rounded-2xl hover:bg-yellow-400 transition-all shadow-lg shadow-accent-js/20 hover:shadow-xl hover:shadow-accent-js/40 hover:-translate-y-0.5"
                      >
                        Next Section
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Footer */}
        <div className="md:hidden p-4 border-t border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl flex gap-2 overflow-x-auto no-scrollbar">
          {jsContent.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                resetQuiz();
              }}
              className={`shrink-0 size-12 rounded-xl flex items-center justify-center transition-all ${
                activeSectionId === section.id 
                  ? 'bg-accent-js text-slate-900 shadow-lg shadow-accent-js/20' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-400'
              }`}
            >
              {sectionIcons[section.id]}
            </button>
          ))}
        </div>
      </main>

      <TrophyModal 
        isOpen={isTrophyModalOpen}
        onClose={() => setIsTrophyModalOpen(false)}
        score={score}
        total={activeSection.quizzes.length}
        sectionTitle={activeSection.title}
      />
    </div>
  );
}
