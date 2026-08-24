/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import HtmlReference from './pages/HtmlReference';
import CssReference from './pages/CssReference';
import JsReference from './pages/JsReference';
import TsReference from './pages/TsReference';
import PythonReference from './pages/PythonReference';
import CppReference from './pages/CppReference';
import CodePlayground from './pages/CodePlayground';
import CourseDetail from './pages/CourseDetail';
import HTMLArticles from './pages/HTMLArticles';
import ArticleReader from './pages/ArticleReader';
import Store from './pages/Store';
import { AppProvider } from './context/AppContext';
import { LearningProvider } from './context/LearningContext';

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/html-mastery" element={<HtmlReference />} />
        <Route path="/css-mastery" element={<CssReference />} />
        <Route path="/js-mastery" element={<JsReference />} />
        <Route path="/ts-mastery" element={<TsReference />} />
        <Route path="/python-mastery" element={<PythonReference />} />
        <Route path="/cpp-mastery" element={<CppReference />} />
        <Route path="/playground" element={<CodePlayground />} />
        <Route path="/course" element={<CourseDetail />} />
        <Route path="/html-articles" element={<HTMLArticles />} />
        <Route path="/html-articles/:id" element={<ArticleReader />} />
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <LearningProvider>
        <AppContent />
      </LearningProvider>
    </AppProvider>
  );
}
