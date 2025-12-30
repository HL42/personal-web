// 经历和技能列表组件
import React from 'react';
import { EXPERIENCE, SKILLS } from '../constants';
import { motion } from 'framer-motion';

const ExperienceList: React.FC = () => {
  return (
    <section className="py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
      
      {/* 工作经历列 */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">Experience</h2>
        <div className="space-y-12">
          {EXPERIENCE.map((exp) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-medium text-neutral-900">{exp.role}</h3>
                <span className="text-sm text-neutral-400">{exp.period}</span>
              </div>
              <div className="mb-4 text-neutral-500 text-sm">
                {exp.company}, {exp.location}
              </div>
              <ul className="list-none space-y-2">
                {exp.responsibilities.map((resp: string, idx: number) => (
                  <li key={idx} className="text-neutral-600 text-sm leading-relaxed pl-4 border-l border-neutral-200">
                    {resp}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 教育和技能列 */}
      <div>
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">Education</h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-medium text-neutral-900">Wilfrid Laurier University</h3>
            <p className="text-neutral-500 mt-2">Bachelor of Science, Major in Computer Science</p>
            <p className="text-neutral-400 text-sm mt-1">Waterloo, Ontario • Expected May 2027</p>
          </motion.div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default ExperienceList;