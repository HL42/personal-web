import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === id);

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Project not found</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <button 
        onClick={() => navigate('/')}
        className="group mb-12 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </button>

      <motion.div layoutId={`card-${project.id}`} className="mb-12">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900 mb-6 lowercase">
          {project.title}.
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-mono text-neutral-500 uppercase tracking-widest mb-12">
          <span>{project.category}</span>
          <span>—</span>
          <span>{project.year}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden bg-neutral-100 shadow-sm aspect-video mb-12"
          >
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-4">Overview</h3>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {project.description}
            </p>
            {/* 详细描述 */}
            {project.detailedDescription && (
              <p className="text-neutral-600 leading-relaxed">
                {project.detailedDescription}
              </p>
            )}
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="sticky top-32"
          >
            <div className="mb-8 border-t border-neutral-200 pt-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-8">
               <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Links</h4>
               <div className="flex flex-col gap-3">
                 {project.link ? (
                   <a href={project.link} target="_blank" rel="noreferrer" className="text-neutral-900 underline hover:no-underline">
                     Live Demo ↗
                   </a>
                 ) : (
                   <span className="text-neutral-400 italic">Private Repo</span>
                 )}
                 {project.githubLink && (
                   <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-neutral-900 underline hover:no-underline">
                     GitHub Repository ↗
                   </a>
                 )}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;