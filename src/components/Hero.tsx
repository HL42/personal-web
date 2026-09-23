import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { EMAIL, GITHUB_URL } from '../data/socials';
import { scrollToSection } from '../lib/scroll';
import { useEntrance } from '../lib/motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const riseIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] },
  },
};

const Hero: React.FC = () => {
  const entrance = useEntrance();

  return (
    <section className="min-h-[80vh] flex flex-col justify-center pt-32 pb-20 md:pt-40 md:pb-28">
      <motion.div variants={container} initial={entrance('hidden')} animate="visible">
        <motion.p
          variants={riseIn}
          className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 mb-8"
        >
          {PROFILE.name}
        </motion.p>

        {/* 主标题：三行以内让招聘者一眼看清定位 */}
        <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-900 max-w-5xl">
          {PROFILE.headline.map((line) => (
            <motion.span key={line} variants={riseIn} className="block">
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={riseIn}
          className="mt-10 md:mt-12 text-lg md:text-xl text-neutral-700 font-light leading-relaxed max-w-2xl"
        >
          {PROFILE.positioning}
        </motion.p>

        <motion.p
          variants={riseIn}
          className="mt-4 text-sm text-neutral-400 font-mono"
        >
          {PROFILE.contextLine}
        </motion.p>

        {/* 主要行动点 */}
        <motion.div variants={riseIn} className="mt-12 md:mt-14 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('work')}
            className="bg-neutral-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]"
          >
            View Work
          </button>
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-900 px-6 py-3 rounded-full border border-neutral-300 hover:border-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]"
          >
            Resume
          </a>

          <span className="hidden sm:block w-px h-6 bg-neutral-200 mx-2" aria-hidden="true" />

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors px-2 py-3"
          >
            GitHub
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors px-2 py-3"
          >
            Email
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
