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
import CodePlayground from './pages/CodePlayground';
import CourseDetail from './pages/CourseDetail';
import Community from './pages/Community';
import Explore from './pages/Explore';
import SupportChat from './pages/SupportChat';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
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
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="/course" element={<CourseDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/support" element={<SupportChat />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
