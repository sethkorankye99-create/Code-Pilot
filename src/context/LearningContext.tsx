import React, { createContext, useContext, useState, useEffect } from 'react';

interface LearningContextType {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  progress: Record<string, number>;
  saveProgress: (id: string, progress: number) => void;
  completed: string[];
  markAsCompleted: (id: string) => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('html_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
      const savedProgress = localStorage.getItem('html_progress');
      if (savedProgress) setProgress(JSON.parse(savedProgress));
      const savedCompleted = localStorage.getItem('html_completed');
      if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    } catch (e) {
      console.error('Error parsing local storage:', e);
    }
  }, []);

  const toggleBookmark = (id: string) => {
    const nextBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
    setBookmarks(nextBookmarks);
    localStorage.setItem('html_bookmarks', JSON.stringify(nextBookmarks));
  };

  const saveProgress = (id: string, p: number) => {
    const nextProgress = { ...progress, [id]: p };
    setProgress(nextProgress);
    localStorage.setItem('html_progress', JSON.stringify(nextProgress));
  };

  const markAsCompleted = (id: string) => {
    if (!completed.includes(id)) {
      const nextCompleted = [...completed, id];
      setCompleted(nextCompleted);
      localStorage.setItem('html_completed', JSON.stringify(nextCompleted));
    }
  };

  return (
    <LearningContext.Provider value={{ bookmarks, toggleBookmark, progress, saveProgress, completed, markAsCompleted }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used within a LearningProvider');
  return context;
};
