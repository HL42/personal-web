import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';
import type { Experience } from '../types';
import { useEntrance } from '../lib/motion';

const ExperienceEntry: React.FC<{ experience: Experience; index: number }> = ({
  experience,
  index,
}) => {
  const secondary = Boolean(experience.secondary);
  const entrance = useEntrance();

  return (
    <motion.div
      initial={entrance({ opacity: 0, y: 16 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={secondary ? 'pt-10 border-t border-neutral-200' : ''}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3
          className={
            secondary
              ? 'text-base font-medium text-neutral-500'
              : 'text-xl md:text-2xl font-semibold tracking-tight text-neutral-900'
          }
        >
          {experience.role}
        </h3>
        {experience.period && (
          <span className="text-sm text-neutral-400 tabular-nums">{experience.period}</span>
        )}
      </div>

      <p className={`mt-1.5 text-sm ${secondary ? 'text-neutral-400' : 'text-neutral-500'}`}>
        {experience.company}
        {experience.location ? ` · ${experience.location}` : ''}
      </p>

      {experience.summary && (
        <p className="mt-5 text-neutral-600 leading-relaxed max-w-3xl">{experience.summary}</p>
      )}

      <ul className={`mt-5 space-y-2.5 ${secondary ? 'opacity-70' : ''}`}>
        {experience.responsibilities.map((item) => (
          <li
            key={item}
            className={`leading-relaxed pl-5 border-l ${
              secondary
                ? 'text-neutral-500 text-sm border-neutral-200'
                : 'text-neutral-600 border-neutral-300'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {experience.stack && experience.stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {experience.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const ExperienceList: React.FC = () => (
  <div className="space-y-12 md:space-y-14">
    {EXPERIENCE.map((experience, index) => (
      <ExperienceEntry key={experience.id} experience={experience} index={index} />
    ))}
  </div>
);

export default ExperienceList;
