import React from 'react';
import type { FlowStage } from '../types';

interface PipelineDiagramProps {
  stages: FlowStage[];
  caption?: string;
  /** light = 详情页浅色底，dark = 项目卡深色底 */
  tone?: 'light' | 'dark';
  /** 收紧行距，用于要在卡片里完整展示整条流水线的场合 */
  compact?: boolean;
  className?: string;
}

/** 阶段在整个流程中的序号在分组时就固定下来，渲染时不再累加 */
interface Step extends FlowStage {
  step: number;
}

interface Group {
  phase?: string;
  stages: Step[];
}

/** 按 phase 把连续阶段分组成区块 */
const groupStages = (stages: FlowStage[]): Group[] => {
  const groups: Group[] = [];
  for (const [i, stage] of stages.entries()) {
    const step: Step = { ...stage, step: i + 1 };
    const last = groups[groups.length - 1];
    if (last && last.phase === stage.phase) {
      last.stages.push(step);
    } else {
      groups.push({ phase: stage.phase, stages: [step] });
    }
  }
  return groups;
};

const TONES = {
  light: {
    phase: 'text-neutral-400',
    line: 'border-neutral-200',
    dot: 'bg-neutral-300',
    label: 'text-neutral-900',
    note: 'text-neutral-400',
    caption: 'text-neutral-400',
  },
  dark: {
    phase: 'text-neutral-500',
    line: 'border-white/15',
    dot: 'bg-white/35',
    label: 'text-neutral-200',
    note: 'text-neutral-500',
    caption: 'text-neutral-500',
  },
};

/**
 * 流水线 / 数据流示意图。
 * 用 HTML + CSS 绘制而非图片：可选中、可读屏、随字号缩放，也不用额外资源。
 */
const PipelineDiagram: React.FC<PipelineDiagramProps> = ({
  stages,
  caption,
  tone = 'light',
  compact = false,
  className = '',
}) => {
  const t = TONES[tone];
  const groups = groupStages(stages);

  // 紧凑模式主要压缩行与行之间的留白，字号只微调，保证仍然清晰可读
  const rowPad = compact ? 'py-[3px]' : 'py-[7px]';
  const rowText = compact ? 'text-[12.5px]' : 'text-[13px]';
  const dotTop = compact ? 'top-[0.75rem]' : 'top-[1.05rem]';
  const groupGap = compact ? 'space-y-4' : 'space-y-6';
  const phaseGap = compact ? 'mb-2' : 'mb-3';

  return (
    <figure className={className}>
      <div className={groupGap}>
        {groups.map((group, groupIdx) => (
          <div key={group.phase ?? groupIdx}>
            {group.phase && (
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${phaseGap} ${t.phase}`}>
                {group.phase}
              </p>
            )}

            <div className={`border-l ml-[3px] ${t.line}`}>
              {group.stages.map((stage) => (
                <div key={stage.label} className={`relative pl-5 ${rowPad}`}>
                  <span
                    className={`absolute left-0 ${dotTop} w-[7px] h-[7px] rounded-full -translate-x-1/2 ${t.dot}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className={`font-mono ${rowText} ${t.label}`}>
                      <span className={`${t.note} mr-2 tabular-nums`}>
                        {String(stage.step).padStart(2, '0')}
                      </span>
                      {stage.label}
                    </span>
                    {stage.note && (
                      <span className={`font-mono ${compact ? 'text-[10.5px]' : 'text-[11px]'} ${t.note}`}>
                        {stage.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {caption && (
        <figcaption className={`mt-6 text-xs leading-relaxed ${t.caption}`}>{caption}</figcaption>
      )}
    </figure>
  );
};

export default PipelineDiagram;
