import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Home from './components/Home';
import Nav from './components/Nav';
import ProjectDetail from './components/ProjectDetail';

const App: React.FC = () => {
  return (
    // reducedMotion="user"：系统开启"减弱动态效果"时自动停用位移/缩放动画
    <MotionConfig reducedMotion="user">
      <Router>
        <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white px-6 md:px-12 lg:px-24">
          {/* 顶部渐隐：页面滚到导航下方时淡出，避免小节标题和分隔线与导航文字叠在一起。
              z-40 位于导航（z-50）之下、内容之上。 */}
          <div
            className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/85 to-transparent z-40 pointer-events-none"
            aria-hidden="true"
          />

          <Nav />

          <main className="max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MotionConfig>
  );
};

export default App;
