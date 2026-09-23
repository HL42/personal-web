// TypeScript 类型定义文件

/** 一个流水线阶段，用于架构/数据流图 */
export interface FlowStage {
  label: string;
  /** 分组名，连续同组阶段会被画在同一个区块内（如 CI / CD） */
  phase?: string;
  /** 阶段下方的小字说明 */
  note?: string;
}

/** 单个工程决策：一句话结论 + 具体理由 */
export interface Decision {
  title: string;
  detail: string;
}

/** 项目详情页的案例研究内容，所有小节都是可选的 */
export interface CaseStudy {
  problem?: string;
  flow?: FlowStage[];
  flowCaption?: string;
  built?: string[];
  decisions?: Decision[];
  reliability?: string[];
  challenges?: string[];
  /** 放在标题下方的背景说明，用来界定这份工作的性质与边界 */
  framingNote?: string;
}

export interface Project {
  id: string;
  title: string;
  /** 卡片和详情页标题下的一句话定位 */
  subtitle?: string;
  category: string;
  year: string;
  period?: string;
  /** 是否作为精选工程展示在首页主网格 */
  featured: boolean;
  /** 卡片摘要 */
  summary: string;
  techStack: string[];
  /** 没有配图时卡片退化为纯文字版式 */
  imageUrl?: string;
  link?: string;
  githubLink?: string;
  caseStudy?: CaseStudy;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period?: string;
  /** 一段式概述，可选 */
  summary?: string;
  responsibilities: string[];
  stack?: string[];
  /** 次要经历在视觉上会被弱化 */
  secondary?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
}
