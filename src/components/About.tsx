import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { useEntrance } from '../lib/motion';

const About: React.FC = () => {
  const entrance = useEntrance();

  return (
  <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20">
    <motion.div
      initial={entrance({ opacity: 0, y: 12 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="space-y-5 max-w-2xl"
    >
      {PROFILE.about.map((paragraph) => (
        <p key={paragraph} className="text-neutral-600 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </motion.div>

    <motion.div
      initial={entrance({ opacity: 0, y: 12 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-5">
        Education
      </h3>
      <p className="text-neutral-900 font-medium">{PROFILE.education.school}</p>
      <p className="mt-1.5 text-sm text-neutral-500">{PROFILE.education.degree}</p>
      <p className="mt-1 text-sm text-neutral-400">
        {PROFILE.education.location} · {PROFILE.education.graduation}
      </p>
    </motion.div>
  </div>
  );
};

export default About;
