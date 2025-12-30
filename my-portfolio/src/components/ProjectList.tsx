import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import type { Project } from '../types';

// 单个项目卡片组件
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => navigate(`/project/${project.id}`)}
      className="group relative bg-[#0a0a0a] rounded-[2rem] p-4 cursor-pointer overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl aspect-[4/5] md:aspect-square flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover="hover"
    >
      {/* 项目预览图区域 */}
      <div className="relative w-full h-[65%] rounded-[1.5rem] overflow-hidden bg-neutral-800">
        <motion.img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          variants={{
            hover: { scale: 1.1 } // 悬停时放大
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        
        {/* 悬停时显示的箭头图标 */}
        <motion.div 
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white"
          variants={{
            hover: { opacity: 1, y: 0, rotate: 45 }
          }}
          initial={{ opacity: 0, y: 10, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </motion.div>
      </div>

      {/* 卡片内容区域 */}
      <div className="flex flex-col justify-end mt-4 px-2 pb-2">
        <div className="flex items-center gap-2 mb-2">
           {/* 项目标题首字母图标 */}
           <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
             <span className="text-[10px] font-bold text-white">{project.title.charAt(0)}</span>
           </div>
           <h3 className="text-2xl font-bold text-white tracking-tight lowercase">{project.title}</h3>
        </div>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-2">
          <div className="flex flex-col">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
               {project.category}
             </span>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mt-1">
               {project.period || project.year}
             </span>
          </div>
          <motion.div 
             className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             variants={{ hover: { x: 5 } }}
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// 项目列表主组件
const ProjectList: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Selected Works</h2>
        <span className="text-xs font-bold text-neutral-300">{PROJECTS.length} Projects</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        
        {/* 占位符，提示未来会有更多项目 */}
        <div className="hidden md:flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-neutral-200 aspect-square opacity-50">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">More<br/>Coming Soon</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectList;