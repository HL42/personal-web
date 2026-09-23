import type { Experience } from '../types';

export const EXPERIENCE: Experience[] = [
  {
    id: 'backend-platform-intern',
    role: 'Backend & Platform Engineering Intern',
    company: 'Guangzhou Baizhi Technology Co., Limited',
    location: 'Guangzhou, Guangdong',
    period: 'May – Aug 2026',
    summary:
      'Worked across a set of Go and Node.js services on build and release workflows — standardizing pipelines, adding automated test gates, automating deployment with rollback, and instrumenting services for observability.',
    responsibilities: [
      'Standardized CI/CD workflows across ~7 Go and Node.js repositories (3 Go, 4 Node.js) using Jenkins Multibranch Pipelines.',
      'Integrated build, lint, unit-test, E2E-test, and AI-assisted code-review quality gates into CI workflows.',
      'Automated deployment workflows using build artifacts, SCP/SSH transfer, health validation, and automatic rollback on failed validation.',
      'Implemented Playwright-based end-to-end tests and CI quality gates so failed checks block promotion instead of surfacing after release.',
      'Built Prometheus and Grafana dashboards for service and infrastructure observability.',
      'Documented Jenkins workspace cleanup, Go module cache cleanup, Git safe.directory configuration, and capacity-management procedures for operational reliability.',
    ],
    stack: ['Jenkins', 'Go', 'Node.js', 'Playwright', 'Prometheus', 'Grafana', 'Shell', 'Linux'],
  },
  {
    id: 'code-ninja',
    role: 'Code Tutor',
    company: 'Code Ninja',
    location: 'Waterloo, Ontario',
    period: 'Oct 2023 – 2024',
    secondary: true,
    responsibilities: [
      'Taught programming fundamentals to students through project-based coding activities.',
      'Adapted explanations to individual students to keep pace with different skill levels.',
      'Communicated progress with parents on a regular basis.',
    ],
  },
];
