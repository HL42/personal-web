// TypeScript 类型定义文件

// 项目类型
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link?: string; // 可选字段，项目链接
  githubLink?: string; // 可选字段，GitHub 仓库链接
  period?: string; // 可选字段，制作时间
  detailedDescription?: string; // 可选字段，详细描述（用于详情页）
}

// 工作经历类型
export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

// 社交媒体链接类型
export interface SocialLink {
  name: string;
  url: string;
  label: string;
}