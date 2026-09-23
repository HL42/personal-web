/** 站内锚点滚动工具 */

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 平滑滚动到指定 section。
 * 注意：站点用的是 HashRouter，hash 被路由占用，
 * 所以不能用 <a href="#work">，必须走 JS 滚动。
 */
export const scrollToSection = (id: string): void => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
};
