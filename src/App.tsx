/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
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
import AdminDashboard from './pages/AdminDashboard';
import Store from './pages/Store';
import { AppProvider, useAppContext } from './context/AppContext';
import AdModal from './components/AdModal';

function AppContent() {
  const { isAdModalOpen, setIsAdModalOpen } = useAppContext();
  
  return (
    <Router>
      <AdModal isOpen={isAdModalOpen} onClose={() => setIsAdModalOpen(false)} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/store" element={<Store />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
