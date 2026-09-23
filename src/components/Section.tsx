import React from 'react';

interface SectionProps {
  id: string;
  /** 小节标题，小号大写字距样式 */
  label: string;
  /** 标题右侧的次要信息 */
  note?: string;
  children: React.ReactNode;
  className?: string;
}

/** 统一的首页小节容器：标题 + 分隔线 + 内容 */
const Section: React.FC<SectionProps> = ({ id, label, note, children, className = '' }) => (
  // scroll-mt 用于抵消固定导航栏的高度，避免锚点跳转后被挡住
  <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
    <div className="mb-10 md:mb-14 flex items-baseline justify-between gap-6 border-b border-neutral-200 pb-4">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">{label}</h2>
      {note && <span className="text-xs text-neutral-400 tabular-nums">{note}</span>}
    </div>
    {children}
  </section>
);

export default Section;
