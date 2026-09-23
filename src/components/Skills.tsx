import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data/skills';
import { useEntrance } from '../lib/motion';

/** 技能按方向分组，避免一份无差别的长列表 */
const Skills: React.FC = () => {
  const entrance = useEntrance();

  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
    {SKILLS.map((group, groupIndex) => (
      <motion.div
        key={group.category}
        initial={entrance({ opacity: 0, y: 12 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
      >
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-5">
          {group.category}
        </h3>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="font-mono text-xs text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
  );
};

export default Skills;
