// 常量定义文件，存储所有静态数据
import type { Project, Experience, SocialLink } from './types';
import inventoryImage from './assets/inventory.jpg';
import webBlogImage from './assets/web-blog.jpg';
import waterlooEatImage from './assets/waterlooEat.jpg';
import saveWiseImage from './assets/Save-wise.png';
import roadMapImage from './assets/codepath.png';

// 首页英雄区文字
export const HERO_TEXT = {
  greeting: "I am Fuquan Lin,",
  role: "a Full Stack Developer",
  location: "based in Waterloo, Ontario."
};

// 项目列表数据
export const PROJECTS: Project[] = [
  {
    id: 'codepath',
    title: "CodePath",
    category: "EdTech Platform",
    year: "2026",
    description: "An all-in-one CS learning platform for beginners with dual-track architecture — serving both students and self-learners with AI-assisted development and direction diagnosis.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "shadcn/ui"],
    imageUrl: roadMapImage,
    link: "https://codepath-eta.vercel.app",
    githubLink: "https://github.com/HL42/RoadMap-dev",
    period: "2026",
    detailedDescription: "CodePath is an all-in-one CS learning platform for beginners, designed to solve three core problems in self-directed learning: losing direction, passive consumption without practice, and failure to stay consistent. The platform uses a dual-track architecture serving both enrolled students (preserving handwritten code and exam readiness) and self-learners (AI-assisted rapid development). Unlike Codecademy or freeCodeCamp, CodePath features a built-in direction diagnostic system, module unlock dependencies, and mandatory project output flows — ensuring users are hands-on from day one rather than just bookmarking tutorials."
  },
  {
    id: 'save-wise',
    title: "save-wise",
    category: "Web Application",
    year: "2026",
    description: "A finance-focused web project for smarter saving decisions and money tracking.",
    techStack: ["React", "Node.js", "TypeScript", "Tailwind CSS", "Vite", "mongoose"],
    imageUrl: saveWiseImage,
    link: "https://save-wise-theta.vercel.app/",
    githubLink: "https://github.com/HL42/SaveWise.git",
    period: "2026",
    detailedDescription: "SaveWise is designed for users who want fast, conversational bookkeeping without sacrificing accounting correctness. Instead of forcing rigid form-based workflows, the platform accepts natural-language financial input (English/Chinese), resolves intent into structured transactions, updates account balances with asset/liability-safe logic, and visualizes portfolio value in a dual-currency context."
  },
  {
    id: 'nexus',
    title: "Nexus Inventory",
    category: "Enterprise System",
    year: "2025",
    description: "A full-stack inventory management dashboard supporting comprehensive CRUD operations. Features bulk data import/export via SheetJS and a responsive admin interface with Material UI DataGrid.",
    techStack: ["React", "Node.js", "MongoDB", "Material UI"],
    imageUrl: inventoryImage,
    link: "https://inventory-system-liart-iota.vercel.app/",
    githubLink: "https://github.com/HL42/inventory-system",
    period: "Nov 2025",
    detailedDescription: "Nexus is an enterprise-grade inventory management system designed to streamline data entry and visualization. Unlike traditional CRUD apps, Nexus features a powerful Excel Integration Engine, allowing businesses to migrate legacy data in bulk and export reports with a single click.",
  },
  {
    id: 'blog-app',
    title: "Dynamic Blog",
    category: "Web Application",
    year: "2025",
    description: "A multi-user blogging platform with secure RESTful API endpoints. Implements real-time news integration via GNewsAPI and persistent bookmarking functionality.",
    techStack: ["React", "Express.js", "MongoDB Atlas", "GNewsAPI"],
    imageUrl: webBlogImage,
    link: "https://blog-app-92jy.vercel.app/",
    githubLink: "https://github.com/HL42/BlogApp",
    period: "Jan 2025 – Mar 2025",
    detailedDescription: "A complete full-stack application engineered to combine real-time news aggregation with a robust, cloud-persistent user blogging platform. The project successfully migrated from local browser storage to a MERN stack architecture, demonstrating expertise in asynchronous data flow and RESTful API development.",
  },
  {
    id: 'waterloo-eat',
    title: "Waterloo Eat",
    category: "Web Application",
    year: "2025",
    description: "A modern, bilingual food discovery platform designed specifically for the Waterloo community, similar to Dianping in China. Discover the best restaurants, share your dining experiences, and explore hidden culinary treasures in Waterloo.",
    techStack: ["JavaScript", "HTML", "CSS"],
    imageUrl: waterlooEatImage,
    link: "https://hl42.github.io/WaterlooEat-App/",
    githubLink: "https://github.com/HL42/WaterlooEat-App",
    period: "Sep 2025",
  }
];

// 工作经历数据
export const EXPERIENCE: Experience[] = [
  {
    id: 'code-ninja',
    role: "Code Tutor",
    company: "Code Ninja",
    location: "Waterloo, Ontario",
    period: "Oct 2023 - 2024",
    responsibilities: [
      "Increased student comprehension by utilizing personalized teaching methods.",
      "Established positive relationships with students and parents.",
      "Promoted critical thinking skills through engaging coding activities."
    ]
  }
];

// 社交媒体链接数据
export const SOCIALS: SocialLink[] = [
  {
    name: "Email",
    url: "mailto:fuquanlin347@gmail.com",
    label: "fuquanlin347@gmail.com"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/fuquan-lin-1b3ba3290",
    label: "LinkedIn Profile"
  },
  {
    name: "GitHub",
    url: "https://github.com/HL42",
    label: "github.com/HL42"
  }
];

// 技能列表
export const SKILLS = [
  "JavaScript / TypeScript",
  "React & Node.js",
  "Python",
  "Java & C",
  "MongoDB & SQL",
  "Data Analysis"
];
