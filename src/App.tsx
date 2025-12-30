import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white px-6 md:px-12 lg:px-24">
        {/* 顶部导航栏 */}
        <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 pointer-events-none">
          {/* Logo 和联系按钮 */}
          <Link to="/" className="text-sm font-bold tracking-widest uppercase pointer-events-auto cursor-pointer text-neutral-900 mix-blend-difference text-white">
            FL.
          </Link>
          <a href="mailto:fuquanlin347@gmail.com" className="text-sm font-medium hover:opacity-70 transition-opacity pointer-events-auto cursor-pointer text-neutral-900 mix-blend-difference text-white">
            Get in touch
          </a>
        </nav>

        {/* 主要内容区域 */}
        <main className="max-w-7xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;