export {
  PROJECTS as projects,
  FOCUS_AREAS as services,
  marqueeSkills as skills,
} from "../data/portfolio";
export type { PortfolioProject as StudyProject } from "../data/portfolio";
export const number = (n: number) => String(n + 1).padStart(2, "0");
