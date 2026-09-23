import React from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '../data/socials';
import { PROFILE } from '../data/profile';
import { useEntrance } from '../lib/motion';

const Contact: React.FC = () => {
  const entrance = useEntrance();

  return (
  <motion.div
    initial={entrance({ opacity: 0, y: 20 })}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
      Let&apos;s connect.
    </h2>
    <p className="text-neutral-500 max-w-xl leading-relaxed mb-12">
      Open to new-grad software engineering, platform engineering, and site reliability roles
      starting in 2027. The fastest way to reach me is email.
    </p>

    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
      {SOCIALS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 rounded-sm"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2 group-hover:text-neutral-600 transition-colors">
            {link.name}
          </span>
          <span className="text-sm text-neutral-600 transition-colors group-hover:text-neutral-900 break-all">
            {link.label}
          </span>
        </a>
      ))}
    </div>

    <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-wrap justify-between items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 pb-8">
      <span>
        © {new Date().getFullYear()} {PROFILE.name}
      </span>
      <span>Waterloo, ON</span>
    </div>
  </motion.div>
  );
};

export default Contact;
