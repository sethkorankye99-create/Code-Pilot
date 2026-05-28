import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen } from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { Article } from '../data/htmlArticles';

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  const { bookmarks, toggleBookmark, progress } = useLearning();
  const isBookmarked = bookmarks.includes(article.id);
  const p = progress[article.id] || 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="size-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <BookOpen />
        </div>
        <button onClick={() => toggleBookmark(article.id)} className={`p-2 rounded-full ${isBookmarked ? 'text-indigo-500' : 'text-slate-400'}`}>
          <Bookmark />
        </button>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{article.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow">{article.description}</p>
      <div className="mb-4">
        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500" style={{ width: `${p}%` }} />
        </div>
      </div>
      <Link 
        to={`/html-articles/${article.id}`}
        className="inline-flex items-center justify-center w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
      >
        Read Article
      </Link>
    </motion.div>
  );
}
