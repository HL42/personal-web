import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ALL_PROJECTS } from '../data/projects';
import PipelineDiagram from './PipelineDiagram';
import { useEntrance } from '../lib/motion';

/** 案例研究各小节的统一标题 */
const CaseSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="mt-12 first:mt-0">
    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-5">
      {title}
    </h2>
    {children}
  </section>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item) => (
      <li
        key={item}
        className="text-neutral-600 leading-relaxed pl-5 border-l border-neutral-200"
      >
        {item}
      </li>
    ))}
  </ul>
);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = ALL_PROJECTS.find((p) => p.id === id);
  const entrance = useEntrance();

  // 进入详情页时回到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
        <p className="text-neutral-500">This project does not exist.</p>
        <Link to="/" className="text-sm font-medium text-neutral-900 underline hover:no-underline">
          Back to home
        </Link>
      </div>
    );
  }

  const study = project.caseStudy;
  const hasLinks = Boolean(project.link || project.githubLink);

  return (
    <motion.div
      initial={entrance({ opacity: 0 })}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-32 pb-24"
    >
      <button
        type="button"
        onClick={() => navigate('/')}
        className="group mb-12 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to home
      </button>

      {/* 标题区 */}
      <header className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            {project.category}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">
            {project.period || project.year}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-neutral-900 leading-[1.05]">
          {project.title}
        </h1>

        {project.subtitle && (
          <p className="mt-6 text-lg md:text-xl text-neutral-500 leading-relaxed">
            {project.subtitle}
          </p>
        )}

        {study?.framingNote && (
          <p className="mt-8 text-sm text-neutral-400 italic border-l-2 border-neutral-200 pl-4">
            {study.framingNote}
          </p>
        )}
      </header>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-12 lg:gap-20">
        {/* 主栏：案例研究 */}
        <div>
          <CaseSection title={study?.problem ? 'Problem' : 'Overview'}>
            <p className="text-neutral-600 leading-relaxed">
              {study?.problem || project.summary}
            </p>
          </CaseSection>

          {study?.flow && study.flow.length > 0 && (
            <CaseSection title="Architecture">
              <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6 md:p-8">
                <PipelineDiagram stages={study.flow} caption={study.flowCaption} tone="light" />
              </div>
            </CaseSection>
          )}

          {study?.built && study.built.length > 0 && (
            <CaseSection title="What I Built">
              <BulletList items={study.built} />
            </CaseSection>
          )}

          {study?.decisions && study.decisions.length > 0 && (
            <CaseSection title="Engineering Decisions">
              <div className="space-y-6">
                {study.decisions.map((decision) => (
                  <div key={decision.title} className="border-t border-neutral-200 pt-6">
                    <h3 className="text-neutral-900 font-medium">{decision.title}</h3>
                    <p className="mt-2 text-neutral-600 leading-relaxed">{decision.detail}</p>
                  </div>
                ))}
              </div>
            </CaseSection>
          )}

          {study?.reliability && study.reliability.length > 0 && (
            <CaseSection title="Reliability & Testing">
              <BulletList items={study.reliability} />
            </CaseSection>
          )}

          {study?.challenges && study.challenges.length > 0 && (
            <CaseSection title="Challenges">
              <BulletList items={study.challenges} />
            </CaseSection>
          )}
        </div>

        {/* 侧栏：技术栈与链接 */}
        <aside>
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="border-t border-neutral-200 pt-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Links
              </h2>
              {hasLinks ? (
                <div className="flex flex-col gap-3 text-sm">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 underline hover:no-underline w-fit"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-900 underline hover:no-underline w-fit"
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-sm text-neutral-400">
                  Internal work — no public repository.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
