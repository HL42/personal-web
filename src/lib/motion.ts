import { useReducedMotion } from 'framer-motion';

/**
 * 统一的入场动画起始状态。
 *
 * 返回一个函数：系统开启"减弱动态效果"时它返回 false，framer-motion 会直接以
 * animate / whileInView 的目标状态渲染，跳过位移与淡入；否则返回传入的起始状态。
 *
 * 用法：const entrance = useEntrance(); ... initial={entrance({ opacity: 0, y: 16 })}
 */
export const useEntrance = () => {
  const reduce = useReducedMotion();
  return <T>(hidden: T): T | false =>
    reduce ? false : hidden;
};
