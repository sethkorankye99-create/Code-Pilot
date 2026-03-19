/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Community from './pages/Community';
import Forum from './pages/Forum';
import Explore from './pages/Explore';
import SupportChat from './pages/SupportChat';
import AITutor from './pages/AITutor';
import AdminDashboard from './pages/AdminDashboard';
import { AppProvider } from './context/AppContext';
import NotificationHandler from './components/NotificationHandler';
import FloatingAIChat from './components/FloatingAIChat';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <NotificationHandler />
        <FloatingAIChat />
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
          <Route path="/community" element={<Community />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/support" element={<SupportChat />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
