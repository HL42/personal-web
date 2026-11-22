import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FEATURED_PROJECTS } from '../data/projects';
import type { Project } from '../types';
import PipelineDiagram from './PipelineDiagram';
import { useEntrance } from '../lib/motion';

/** 卡片整体可点击，同时支持键盘 */
const useCardActivation = (id: string) => {
  const navigate = useNavigate();
  const open = () => navigate(`/project/${id}`);
  return {
    open,
    a11y: {
      role: 'link' as const,
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') open();
      },
    },
  };
};

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]';

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-mono text-[11px] text-neutral-300 bg-white/10 px-2.5 py-1 rounded-full">
    {children}
  </span>
);

const Meta: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">{children}</span>
);

/** 标准项目卡：截图 + 标题 + 元信息 */
const StandardCard: React.FC<{ project: Project }> = ({ project }) => {
  const { open, a11y } = useCardActivation(project.id);
  const entrance = useEntrance();

  return (
    <motion.article
      initial={entrance({ opacity: 0, y: 20 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      onClick={open}
      {...a11y}
      aria-label={`Open case study: ${project.title}`}
      className={`group relative bg-[#0a0a0a] rounded-2xl p-4 cursor-pointer overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98]  flex flex-col justify-between ${FOCUS_RING}`}
    >
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-800">
        {project.imageUrl ? (
          <motion.img
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-full object-contain opacity-100 group-hover:opacity-100 transition-opacity duration-500"
            variants={{ hover: { scale: 1.06 } }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ) : project.caseStudy?.flow ? (
          <PipelineDiagram stages={project.caseStudy.flow} tone="dark" compact className="p-5" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />

        <motion.div
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white"
          variants={{ hover: { opacity: 1, y: 0, rotate: 45 } }}
          initial={{ opacity: 0, y: 10, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </motion.div>
      </div>

      <div className="flex flex-col justify-end mt-4 px-2 pb-2">
        <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
        {project.subtitle && (
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed ">
            {project.summary}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map(tech => <Chip key={tech}>{tech}</Chip>)}
        </div>
        <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
          <div className="flex flex-col gap-1">
            <Meta>{project.category}</Meta>
            <Meta>{project.period || project.year}</Meta>
          </div>
          <motion.div
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            variants={{ hover: { x: 5 } }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedWork: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {FEATURED_PROJECTS.map(project => <StandardCard key={project.id} project={project} />)}
    </div>
  );
};

export default FeaturedWork;
