import React, { useState } from 'react';
import { HTML_ARTICLES } from '../data/htmlArticles';
import ArticleCard from '../components/ArticleCard';

export default function HTMLArticles() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(HTML_ARTICLES.map(a => a.category))];
  const filtered = filter === 'All' ? HTML_ARTICLES : HTML_ARTICLES.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">HTML Articles</h1>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full ${filter === c ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-900'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
      </div>
    </div>
  );
}
