import React from 'react';
import { Link } from 'react-router-dom';
import { ARCHIVE_PROJECTS } from '../data/projects';

/** 其它工程：紧凑列表，不与精选项目争夺首页注意力 */
const Archive: React.FC = () => (
  <div className="border-t border-neutral-200">
    {ARCHIVE_PROJECTS.map((project) => (
      <div
        key={project.id}
        className="group border-b border-neutral-200 py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 md:items-start"
      >
        <div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-lg font-medium text-neutral-900">
              <Link
                to={`/project/${project.id}`}
                className="hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-sm"
              >
                {project.title}
              </Link>
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              {project.category}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-300">
              {project.period || project.year}
            </span>
          </div>

          <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-2xl">
            {project.summary}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm md:pt-1">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              Live ↗
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default Archive;
