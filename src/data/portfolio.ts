import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "./socials";
import { EXPERIENCE } from "./experience";

/** Public portfolio content. Project facts checked against source on 2026-11-22. */
export const PERSON = {
  name: "Fuquan Lin",
  firstName: "FUQUAN",
  lastName: "LIN",
  role: "Software Engineer",
  focus: "Full-Stack Development · AI Applications · Platform Engineering",
  location: "Waterloo, Ontario, Canada",
  shortLocation: "Waterloo, Ontario",
  city: "Waterloo",
  timezone: "America/Toronto",
  email: EMAIL,
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  resume: "/Fuquan-Lin-Resume.pdf",
  title: "Fuquan Lin — Software Engineer",
  description:
    "Computer Science student and software engineer in Waterloo, Ontario. Full-stack products, AI applications, and reliable delivery systems.",
  bio: "I'm a software engineer passionate about learning new technologies and turning ideas into reality.",
  statement:
    "I'm Fuquan. I build useful products and reliable systems, from full-stack development and AI applications to automated delivery. Computer Science at Wilfrid Laurier University. Based in Waterloo.",
  statementEmphasis: ["products", "systems,"],
  education: {
    school: "Wilfrid Laurier University",
    degree: "BSc Computer Science",
    graduation: "Expected May 2027",
    location: "Waterloo, Ontario",
  },
  about: [
    "I enjoy turning an idea into something people can use, and understanding the engineering that keeps it working. My projects span social products, personal finance, developer tools, and retrieval-augmented AI applications.",
    "During my backend and platform engineering internship, I worked on Jenkins pipelines, automated tests, AI-assisted code review, deployment validation and observability across Go and Node.js services.",
    "I'm completing my BSc in Computer Science at Wilfrid Laurier University. I'm interested in early-career software engineering opportunities across backend, platform, DevOps, SRE and applied AI.",
  ],
};
export const NAVIGATION = [
  ["/", "Home"],
  ["/work", "Work"],
  ["/about", "About"],
  ["/experience", "Experience"],
  ["/contact", "Contact"],
] as const;
export const experience = EXPERIENCE.filter(
  (e) => e.id === "backend-platform-intern",
);
export const SKILL_GROUPS = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Go", "Python", "Java", "SQL"],
  },
  {
    category: "Applications",
    items: ["React", "Next.js", "Node.js", "Express", "Vue 3", "Playwright"],
  },
  {
    category: "Data & AI",
    items: [
      "PostgreSQL",
      "Supabase",
      "MongoDB",
      "pgvector",
      "DeepSeek",
      "Vercel AI SDK",
    ],
  },
  {
    category: "Delivery & Reliability",
    items: [
      "Jenkins",
      "GitHub Actions",
      "Linux",
      "Prometheus",
      "Grafana",
      "CI/CD",
    ],
  },
];
export const marqueeSkills = [
  "TypeScript",
  "React",
  "Next.js",
  "Go",
  "Python",
  "PostgreSQL",
  "AI Applications",
  "Platform Engineering",
];
export const FOCUS_AREAS = [
  {
    name: "Full-stack",
    description:
      "Useful products, from a responsive interface to APIs and persistent data.",
    to: "/work/ciravo",
  },
  {
    name: "Applied AI",
    description:
      "Code knowledge and agentic retrieval grounded in source material.",
    to: "/work/repowiki",
  },
  {
    name: "Platform",
    description:
      "Repeatable builds, test gates and automated deployment workflows.",
    to: "/experience",
  },
  {
    name: "Reliability",
    description: "Health checks, rollback workflows and service observability.",
    to: "/experience",
  },
];
type ScreenshotMedia = {
  kind: "screenshot";
  desktop: string;
  mobile: string;
  detail?: string;
  alt: string;
  caption: string;
};
type DiagramMedia = {
  kind: "diagram";
  eyebrow: string;
  steps: { title: string; detail: string }[];
  caption: string;
};
export type PortfolioProject = {
  slug: string;
  name: string;
  lines: string[];
  year: string;
  type: string;
  platform: string;
  tone: string;
  status: string;
  note?: string;
  stack: string[];
  summary: string;
  features: string[];
  boundary: string;
  github?: string;
  live?: string;
  media: ScreenshotMedia | DiagramMedia;
  source: { url: string; revision?: string; files: string[] };
};
export const PROJECTS: PortfolioProject[] = [
  {
    slug: "ciravo",
    name: "Ciravo",
    lines: ["Ciravo"],
    year: "2026",
    type: "Campus social & event platform",
    platform: "Full-stack / Social",
    tone: "#283d6e",
    status: "In development",
    note: "(Pre-launch)",
    stack: ["JavaScript", "Supabase", "PostgreSQL", "Capacitor"],
    summary:
      "A campus social and event product, co-developed with a friend, that connects people through nearby events, shared interests and plans.",
    features: [
      "Event discovery and saved plans, with product previews on the public launch site.",
      "Supabase authentication, PostgreSQL row-level security and private media storage.",
      "Work on moderation, reporting and background-job workflows.",
      "A Capacitor-based iOS direction, currently in controlled testing.",
    ],
    boundary:
      "Pre-launch product in controlled testing. The public site presents product previews; iOS distribution and the waitlist are still in development.",
    live: "https://ciravo.app/",
    media: {
      kind: "screenshot",
      desktop: "/projects/ciravo-desktop.jpg",
      mobile: "/projects/ciravo-mobile.jpg",
      alt: "Ciravo public launch page captured from ciravo.app",
      caption: "Public launch site · captured November 2026",
    },
    source: {
      url: "https://ciravo.app/",
      files: [
        "Public launch page",
        "Existing project context: projects/ciravo",
      ],
    },
  },
  {
    slug: "repowiki",
    name: "RepoWiki",
    lines: ["RepoWiki"],
    year: "2026",
    type: "AI-powered codebase knowledge system",
    platform: "Go / Vue / RAG",
    tone: "#f6c9da",
    status: "Local application",
    stack: [
      "Go",
      "Vue 3",
      "Vite",
      "DeepSeek",
      "Markdown",
      "Meilisearch (optional)",
    ],
    summary:
      "A local-first developer tool that turns source code and documentation into an indexed knowledge base, with retrieval-based questions and source citations.",
    features: [
      "Classify source files by technical layer and business domain.",
      "Generate file summaries and a module index, stored as Markdown and YAML.",
      "Refine questions, retrieve relevant chunks and return cited multi-turn answers.",
      "Use SHA-256 change detection to process changed files; bind the API to loopback with Host and Origin validation.",
    ],
    boundary:
      "Runs locally with an external model API. macOS and Windows release packages are documented; no hosted demo is advertised.",
    github: "https://github.com/HL42/Repowiki",
    media: {
      kind: "diagram",
      eyebrow: "Source-verified architecture",
      steps: [
        {
          title: "Source code & docs",
          detail: "Scan · classify by layer and domain",
        },
        {
          title: "Generated knowledge",
          detail: "Markdown + YAML · incremental updates",
        },
        { title: "Retrieve", detail: "Inverted index · refined queries" },
        {
          title: "Answer with sources",
          detail: "DeepSeek · multi-turn context",
        },
      ],
      caption:
        "Architecture derived from repository source, not a product screenshot",
    },
    source: {
      url: "https://github.com/HL42/Repowiki",
      revision: "f96a5ee60f328f6d64e3cce8c64f82780ddc595b",
      files: [
        "README.md",
        "go.mod",
        "frontend/package.json",
        "internal/wiki/ingest.go",
        "internal/wiki/query.go",
      ],
    },
  },
  {
    slug: "savewise",
    name: "SaveWise",
    lines: ["SaveWise"],
    year: "2026",
    type: "Personal finance & cash flow management",
    platform: "React / PostgreSQL",
    tone: "#d7e4dc",
    status: "Live web app",
    stack: [
      "React",
      "TypeScript",
      "Supabase Auth",
      "PostgreSQL",
      "Row-Level Security",
      "GitHub Actions",
    ],
    summary:
      "A bilingual personal ledger that starts with current balances and estimates spendable cash against upcoming credit-card bills.",
    features: [
      "Expenses, income, refunds, transfers, repayments, reconciliation and undo.",
      "Integer-cent amounts, with CAD and CNY tracked separately.",
      "Authenticated access with row-level security, transactional writes, idempotency and version checks.",
      "Mobile-first entry sheets, account-scoped caches and automated checks in GitHub Actions.",
    ],
    boundary:
      "Demo images use fictional accounts. Personal ledgers require sign-in; the application tracks confirmed records rather than synchronizing bank accounts.",
    github: "https://github.com/HL42/SaveWise",
    live: "https://save-wise-theta.vercel.app/",
    media: {
      kind: "screenshot",
      desktop: "/projects/savewise-desktop.jpg",
      mobile: "/projects/savewise-mobile.jpg",
      alt: "SaveWise actual application in its read-only fictional demo mode",
      caption: "Actual app · read-only fictional demo data",
    },
    source: {
      url: "https://github.com/HL42/SaveWise",
      revision: "c5020f056b25eed241626abade1c5800b0466ca0",
      files: [
        "README.md",
        "client/package.json",
        "client/src/finance.ts",
        "client/src/supabase.ts",
        ".github/workflows/ci.yml",
      ],
    },
  },

];
export const SITE_COPY = {
  portfolioLabel: "(Portfolio / ©2026)",
  scrollHint: "↓ Scroll, gently",
  workAction: "See the work →",
  workHeading: "Selected work",
  galleryHeading: "(Up close)",
  galleryHint: "Drag or scroll",
  focusHeading: "What I work on",
  focusAction: "Experience →",
  footerPrompt: "Let’s build something useful.",
  footerTitle: "CONTACT ME",
  contactTitle: "SAY HI",
  contactIntro:
    "Interested in working together? I’m open to software engineering opportunities and conversations about useful products and reliable systems.",
  contactTopics: [
    "Software engineering",
    "Backend / Platform",
    "Applied AI",
    "Collaboration",
    "Other",
  ],
  contactLabel: "What would you like to discuss?",
  contactButton: "Open email draft →",
};
