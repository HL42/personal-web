import React from 'react';
import { motion } from 'framer-motion';
import { HERO_TEXT } from '../constants';

// 容器动画配置：控制整体渐入效果
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 子元素依次出现
      delayChildren: 0.3,
    },
  },
};

// 单词动画配置：每个单词的渐入动画
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
    },
  },
};

const Hero: React.FC = () => {
  // 将介绍文字按空格分割成单词数组
  const words = `${HERO_TEXT.greeting} ${HERO_TEXT.role} ${HERO_TEXT.location}`.split(" ");

  return (
    <section className="min-h-[90vh] flex flex-col justify-center py-20">
      <motion.div
        className="max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] tracking-tight text-neutral-900">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block mr-[0.2em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-12 max-w-xl"
      >
        <p className="text-lg text-neutral-500 font-light leading-relaxed">
          Computer Science student at Wilfrid Laurier University. 
          Passionate about building scalable web applications and engineering robust full-stack solutions.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;