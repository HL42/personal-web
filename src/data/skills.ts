import type { SkillGroup } from '../types';

// 只列实际用过的技术，不为了堆关键词而添加
export const SKILLS: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Go', 'Python', 'Java', 'JavaScript', 'TypeScript', 'Shell', 'C', 'SQL'],
  },
  {
    category: 'Platform / Reliability',
    items: [
      'Jenkins',
      'CI/CD',
      'Linux',
      'Prometheus',
      'Grafana',
      'Playwright',
      'Git',
      'REST APIs',
    ],
  },
  {
    category: 'Application Development',
    items: ['React', 'Node.js', 'Express', 'MongoDB', 'SQL'],
  },
];
