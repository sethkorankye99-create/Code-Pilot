import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HTML_ARTICLES } from '../data/htmlArticles';
import { useLearning } from '../context/LearningContext';

export default function ArticleReader() {
  const { id } = useParams();
  const article = HTML_ARTICLES.find(a => a.id === id);
  const { saveProgress, markAsCompleted } = useLearning();
  const [complete, setComplete] = useState(false);

  if (!article) return <div>Not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">{article.title}</h1>
      <div 
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />
      <button 
        onClick={() => {saveProgress(article.id, 100); markAsCompleted(article.id); setComplete(true);}}
        className="mt-8 w-full py-3 bg-indigo-600 text-white rounded-xl"
      >
        Complete Article
      </button>
      {complete && <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-xl">Article Completed! Quiz time?</div>}
    </div>
  );
}
