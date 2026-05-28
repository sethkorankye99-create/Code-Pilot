export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string; 
  quiz: QuizQuestion[];
}

export const HTML_ARTICLES: Article[] = [
  { id: '1', category: 'Beginner HTML', title: 'What is HTML?', description: 'Introduction to HTML.', content: '<h1>What is HTML?</h1><p>HTML stands for HyperText Markup Language...</p>', quiz: [{ id: 'q1', question: 'Does HTML have a tag for image?', options: ['Yes', 'No'], correctAnswer: 0 }] },
  { id: '2', category: 'HTML Basics', title: 'HTML Document Structure', description: 'Essential structural tags.', content: '<h1>Document Structure</h1><p>The <html>...</html> tag is required...</p>', quiz: [{ id: 'q2', question: 'Which tag is used for the header?', options: ['<head>', '<body>', '<html>'], correctAnswer: 0 }] },
  { id: '3', category: 'HTML Basics', title: 'HTML Tags Explained', description: 'Understanding common tags.', content: '<h1>Common Tags</h1><p><p>, <div>, <span>...</p>', quiz: [{ id: 'q3', question: 'Which tag is used for paragraph?', options: ['<p>', '<div>', '<span>'], correctAnswer: 0 }] },
  { id: '4', category: 'HTML Basics', title: 'Links and Images', description: 'Adding navigation and visuals.', content: '<h1>Links and Images</h1><p>Use <a> and <img>...</p>', quiz: [{ id: 'q4', question: 'Which tag is used for link?', options: ['<a>', '<img>', '<link>'], correctAnswer: 0 }] },
  { id: '5', category: 'Beginner HTML', title: 'Lists in HTML', description: 'Ordered and unordered lists.', content: '<h1>Lists</h1><p>Use <ul>, <ol>, <li>...</p>', quiz: [{ id: 'q5', question: 'Which list is ordered?', options: ['<ol>', '<ul>', '<li>'], correctAnswer: 0 }] },
  { id: '6', category: 'Forms & Tables', title: 'HTML Forms', description: 'Collecting user input.', content: '<h1>Forms</h1><p>Use <form>, <input>...</p>', quiz: [{ id: 'q6', question: 'Which element starts a form?', options: ['<form>', '<input>', '<button>'], correctAnswer: 0 }] },
  { id: '7', category: 'Forms & Tables', title: 'HTML Tables', description: 'Displaying tabular data.', content: '<h1>Tables</h1><p>Use <table>, <tr>, <td>...</p>', quiz: [{ id: 'q7', question: 'Which element is for a table row?', options: ['<tr>', '<td>', '<th>'], correctAnswer: 0 }] },
  { id: '8', category: 'Semantic HTML', title: 'Semantic HTML', description: 'Meaningful tag structure.', content: '<h1>Semantic HTML</h1><p>Use <header>, <footer>...</p>', quiz: [{ id: 'q8', question: 'Which is a semantic tag?', options: ['<header>', '<div>', '<span>'], correctAnswer: 0 }] },
  { id: '9', category: 'Semantic HTML', title: 'Common HTML Mistakes', description: 'Best practices.', content: '<h1>Common Mistakes</h1><p>Avoid nested block elements in inline elements...</p>', quiz: [{ id: 'q9', question: 'Which is a bad practice?', options: ['Nesting block inside inline', 'Using semantic tags', 'Using lowercase tags'], correctAnswer: 0 }] },
  { id: '10', category: 'Mini Projects', title: 'Mini Project: Simple Web Page', description: 'Apply your knowledge.', content: '<h1>Simple Web Page</h1><p>Build a basic structure...</p>', quiz: [{ id: 'q10', question: 'What is the goal of this project?', options: ['Apply HTML knowledge', 'Build a backend', 'Learn React'], correctAnswer: 0 }] },
];
