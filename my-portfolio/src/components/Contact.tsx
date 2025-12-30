import React from 'react';
import { SOCIALS } from '../constants';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section className="pt-24 md:pt-32 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-12">
          Let's connect.
        </h2>
        
        {/* 社交媒体链接列表 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {SOCIALS.map((link) => (
            <a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 group-hover:text-neutral-600 transition-colors">
                {link.name}
              </span>
              <span 
                className="text-sm text-neutral-600 leading-relaxed transition-colors group-hover:text-neutral-900"
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* 页脚版权信息 */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-400 uppercase tracking-wider pb-8">
          <span>© {new Date().getFullYear()} Fuquan Lin</span>
          <span>Waterloo, ON</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;