/** 全站个人信息与定位文案 */

export const PROFILE = {
  name: 'Fuquan Lin',

  /** Hero 主标题，按行渲染，逐行淡入 */
  headline: ['I build software', 'that ships reliably.'],

  /** 一句话定位 */
  positioning: 'Software Engineer focused on Platform, Reliability & Automation.',

  /** 教育背景简述，Hero 底部一行 */
  contextLine: 'Computer Science @ Wilfrid Laurier University · Waterloo, Ontario',

  /**
   * Resume 文件位置。
   * TODO: 把你的简历放到 public/Fuquan-Lin-Resume.pdf 即可生效——
   *       文件名必须是 Fuquan-Lin-Resume.pdf，或者改这里的路径。
   */
  resumeUrl: '/Fuquan-Lin-Resume.pdf',

  education: {
    school: 'Wilfrid Laurier University',
    degree: 'Bachelor of Science, Computer Science',
    graduation: 'Expected May 2027',
    location: 'Waterloo, Ontario',
  },

  /** About 小节正文，每个元素是一个段落 */
  about: [
    'I work at the boundary between software development and production systems — automating releases, making deployments recoverable, improving observability, and reducing the manual steps that make operations unreliable.',
    'Most of my hands-on experience comes from a software engineering internship focused on DevOps and platform work, where I standardized CI/CD across a set of Go and Node.js services and worked on deployment automation, test gating, and monitoring.',
    'I am completing my BSc in Computer Science at Wilfrid Laurier University and am looking for new-grad software engineering, platform engineering, and site reliability roles.',
  ],
};
