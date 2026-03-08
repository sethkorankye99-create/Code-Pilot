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
  Home
} from 'lucide-react';
import { pythonContent } from '../data/pythonContent';
import { useAppContext } from '../context/AppContext';
import TrophyModal from '../components/TrophyModal';

const sectionIcons: Record<string, React.ReactNode> = {
  'python-fundamentals': <Terminal size={20} />,
  'data-structures': <Box size={20} />,
  'functions-modules': <FunctionSquare size={20} />,
  'oop': <LayoutTemplate size={20} />,
  'advanced-python': <BrainCircuit size={20} />,
  'exception-handling': <AlertTriangle size={20} />,
  'file-io': <Globe size={20} />,
  'concurrency': <Clock size={20} />,
  'testing-debugging': <Wrench size={20} />,
};

export default function PythonReference() {
  const { deductCoin, updateStreak } = useAppContext();
  const [activeSectionId, setActiveSectionId] = useState(pythonContent[0].id);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTrophyModalOpen, setIsTrophyModalOpen] = useState(false);

  const activeSection = pythonContent.find(s => s.id === activeSectionId) || pythonContent[0];

  const handleQuizStart = async () => {
    const result = await deductCoin();
    if (result.success) {
      setQuizMode(true);
      await updateStreak();
    }
  };

  const handleNextSection = () => {
    const currentIndex = pythonContent.findIndex(s => s.id === activeSectionId);
    if (currentIndex < pythonContent.length - 1) {
      setActiveSectionId(pythonContent[currentIndex + 1].id);
      resetQuiz();
    }
  };

  const handlePrevSection = () => {
    const currentIndex = pythonContent.findIndex(s => s.id === activeSectionId);
    if (currentIndex > 0) {
      setActiveSectionId(pythonContent[currentIndex - 1].id);
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

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    
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
      }
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark flex flex-col shrink-0 overflow-y-auto no-scrollbar hidden md:flex">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-accent-python flex items-center justify-center text-white shadow-lg shadow-accent-python/20">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Python Mastery</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Complete Reference</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          {pythonContent.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                resetQuiz();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeSectionId === section.id 
                  ? 'bg-accent-python/10 text-accent-python font-semibold' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className={activeSectionId === section.id ? 'text-accent-python' : 'text-slate-400'}>
                {sectionIcons[section.id]}
              </span>
              <span className="text-sm truncate">{section.title}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-accent-python transition-colors">
            <Home size={16} />
            Back to Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark z-10">
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-accent-python hover:border-accent-python transition-all shadow-sm"
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-python/10 text-accent-python text-xs font-bold uppercase tracking-wider">
                    {sectionIcons[activeSectionId]}
                    Section {pythonContent.findIndex(s => s.id === activeSectionId) + 1}
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
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-python to-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <pre className="relative p-6 rounded-xl bg-slate-900 text-slate-300 font-mono text-sm overflow-x-auto border border-slate-800 shadow-2xl">
                      <code>{activeSection.example}</code>
                    </pre>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button 
                    onClick={handleQuizStart}
                    className="flex-1 flex items-center justify-center gap-2 bg-accent-python hover:bg-accent-python/90 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-accent-python/20 group"
                  >
                    <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                    Take Section Quiz (1 Coin)
                  </button>
                  <div className="flex gap-2">
                    <button 
                      onClick={handlePrevSection}
                      disabled={pythonContent.findIndex(s => s.id === activeSectionId) === 0}
                      className="size-14 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNextSection}
                      disabled={pythonContent.findIndex(s => s.id === activeSectionId) === pythonContent.length - 1}
                      className="size-14 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-30 transition-all"
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
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Question {currentQuizIndex + 1} of 10</h3>
                        <span className="text-accent-python font-black text-xl">{score}/{activeSection.quizzes.length}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent-python"
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuizIndex + 1) / activeSection.quizzes.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {activeSection.quizzes[currentQuizIndex].question}
                    </h2>

                    {/* Options */}
                    <div className="grid gap-3">
                      {activeSection.quizzes[currentQuizIndex].options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        const isCorrectOption = idx === activeSection.quizzes[currentQuizIndex].correctAnswer;
                        
                        let bgColor = "bg-white dark:bg-slate-800 hover:border-accent-python/50";
                        let borderColor = "border-slate-200 dark:border-slate-700";
                        let textColor = "text-slate-700 dark:text-slate-300";

                        if (selectedOption !== null) {
                          if (isCorrectOption) {
                            bgColor = "bg-emerald-500/10";
                            borderColor = "border-emerald-500";
                            textColor = "text-emerald-500";
                          } else if (isSelected) {
                            bgColor = "bg-rose-500/10";
                            borderColor = "border-rose-500";
                            textColor = "text-rose-500";
                          } else {
                            bgColor = "bg-slate-50 dark:bg-slate-900 opacity-50";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={selectedOption !== null}
                            className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${bgColor} ${borderColor} ${textColor}`}
                          >
                            <span className="font-semibold">{option}</span>
                            {selectedOption !== null && isCorrectOption && <CheckCircle2 size={20} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8"
                  >
                    <div className="size-32 bg-accent-python/10 rounded-full flex items-center justify-center mx-auto text-accent-python">
                      <Trophy size={64} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black">Section Complete!</h2>
                      <p className="text-slate-500">You scored {score} out of 10</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={resetQuiz}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-4 px-8 rounded-2xl hover:opacity-90 transition-all"
                      >
                        <RefreshCcw size={20} />
                        Retake Quiz
                      </button>
                      <button 
                        onClick={() => {
                          handleNextSection();
                          resetQuiz();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-accent-python text-white font-bold py-4 px-8 rounded-2xl hover:bg-accent-python/90 transition-all"
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
        <div className="md:hidden p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark flex gap-2 overflow-x-auto no-scrollbar">
          {pythonContent.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSectionId(section.id);
                resetQuiz();
              }}
              className={`shrink-0 size-12 rounded-xl flex items-center justify-center transition-all ${
                activeSectionId === section.id 
                  ? 'bg-accent-python text-white shadow-lg shadow-accent-python/20' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
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
