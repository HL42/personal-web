import type { Project } from '../types';
// 只有精选项目卡片会渲染配图，归档项目是纯文字列表，因此不引用图片资源
import ciravoImage from '../assets/ciravo-live.jpg';
import saveWiseImage from '../assets/savewise-live.jpg';

/** 首页精选工程，按重要性排序 */
export const FEATURED_PROJECTS: Project[] = [
  {
    "id": "ciravo",
    "title": "Ciravo",
    "subtitle": "Discover local events and connect through shared plans",
    "category": "Social Discovery",
    "year": "2026",
    "featured": true,
    "summary": "An event discovery and social connection product. The public launch site previews nearby events, saved plans, messaging, and meeting people through shared interests; the app is coming soon.",
    "techStack": [],
    "imageUrl": ciravoImage,
    "link": "https://ciravo.app/",
    "caseStudy": {
      "framingNote": "Pre-launch product. The public site shows product previews; the application source is not publicly accessible.",
      "built": [
        "Public product previews cover event discovery, maps, conversations, and attendee profiles."
      ],
      "challenges": [
        "Public launch remains pending. The waitlist form is currently under development."
      ]
    }
  },
  {
    "id": "repowiki",
    "title": "RepoWiki",
    "subtitle": "Turn source code into a searchable, conversational knowledge base",
    "category": "AI Developer Tool",
    "year": "2026",
    "featured": true,
    "summary": "A local-first code knowledge tool that classifies source files, generates Markdown documentation, and answers questions with retrieval. SHA-256 change detection reprocesses only changed files.",
    "techStack": [
      "Go",
      "Vue 3",
      "Vite",
      "DeepSeek",
      "Meilisearch (optional)"
    ],
    "githubLink": "https://github.com/HL42/Repowiki",
    "caseStudy": {
      "problem": "Understanding an unfamiliar repository requires connecting implementation details scattered across source files and documentation.",
      "built": [
        "Import code and documents, classify by technical layer and business domain, and generate a module index.",
        "Use an inverted index for retrieval and DeepSeek for multi-turn questions over generated knowledge.",
        "Persist knowledge as Markdown and YAML on the filesystem.",
        "Bind the local API to loopback and validate Host and Origin headers."
      ],
      "flow": [
        {
          "label": "Source files"
        },
        {
          "label": "Classify + summarize"
        },
        {
          "label": "Markdown knowledge"
        },
        {
          "label": "Retrieve + answer"
        }
      ],
      "framingNote": "Local application with macOS and Windows release packages. No hosted demo is advertised."
    }
  },
  {
    "id": "save-wise",
    "title": "SaveWise",
    "subtitle": "Know what you can spend and when credit cards are due",
    "category": "Personal Finance",
    "year": "2026",
    "featured": true,
    "summary": "A bilingual, mobile-first ledger that starts from current balances and estimates spendable cash against upcoming bills. PostgreSQL transactions, idempotency, and version checks protect financial writes.",
    "techStack": [
      "React",
      "TypeScript",
      "Supabase Auth",
      "PostgreSQL",
      "Row-Level Security"
    ],
    "imageUrl": saveWiseImage,
    "link": "https://save-wise-theta.vercel.app/",
    "githubLink": "https://github.com/HL42/SaveWise",
    "caseStudy": {
      "problem": "A useful personal ledger should start from today’s balances without requiring a complete reconstruction of past spending.",
      "built": [
        "Track expenses, income, refunds, transfers, repayments, reconciliation, and undo.",
        "Store amounts as integer cents and report CAD and CNY separately.",
        "Allocate partial repayments to the earliest due bills.",
        "Isolate accounts with authenticated identity and row-level security.",
        "Provide English and Chinese interfaces with mobile navigation and bottom-sheet entry."
      ],
      "framingNote": "Current version uses Supabase, not MongoDB. No AI bookkeeping, bank synchronization, automatic exchange rates, or offline entry."
    }
  },
];

/** 更早期或非核心方向的工程，在首页以紧凑列表呈现 */
export const ARCHIVE_PROJECTS: Project[] = [
  {
    id: 'production-engineering',
    title: 'Production Engineering & CI/CD',
    subtitle: 'Standardizing build, test, and release workflows across Go and Node.js services',
    category: 'Platform Engineering',
    year: '2026',
    period: 'May – Aug 2026',
    featured: false,
    summary:
      'Standardized CI/CD across roughly seven Go and Node.js repositories using Jenkins Multibranch Pipelines — reusable pipeline structure, blocking test gates, deployment validation, and rollback-oriented release workflows.',
    techStack: ['Jenkins', 'Go', 'Node.js', 'Playwright', 'Prometheus', 'Grafana', 'Shell', 'Linux'],
    // 这个项目以架构图代替截图，卡片会自动渲染成流水线预览
    caseStudy: {
      problem:
        'Build and release workflows had drifted across roughly seven services — three written in Go, four in Node.js. Each pipeline had started as a copy of another and was then edited in place, so build steps, lint rules, and test gates differed from repository to repository. Environment variables and credentials were handled ad hoc, and there was no shared definition of what had to pass before a change could be released. The practical consequence was that release behaviour was hard to predict and hard to audit: the same kind of change could pass cleanly in one service and fail in another, for reasons that existed only in that pipeline\'s history.',
      flowCaption: 'A representative pipeline, from commit to a validated or rolled-back release.',
      flow: [
        { label: 'Git push', phase: 'Trigger' },
        { label: 'Jenkins Multibranch Pipeline', phase: 'Trigger', note: 'branch and PR builds' },
        { label: 'Checkout', phase: 'Continuous Integration', note: 'shallow clone' },
        { label: 'Environment setup', phase: 'Continuous Integration', note: 'Go / Node toolchain' },
        { label: 'Build', phase: 'Continuous Integration' },
        { label: 'Lint', phase: 'Continuous Integration' },
        { label: 'Unit tests', phase: 'Continuous Integration', note: 'Go + Node.js' },
        { label: 'E2E tests', phase: 'Continuous Integration', note: 'Playwright' },
        { label: 'AI-assisted code review', phase: 'Continuous Integration' },
        { label: 'Deploy', phase: 'Continuous Delivery', note: 'artifact → SCP → SSH' },
        { label: 'Health check', phase: 'Continuous Delivery', note: 'post-deploy validation' },
        { label: 'Success / Rollback', phase: 'Continuous Delivery', note: 'automatic on failed validation' },
      ],
      built: [
        'Standardized CI/CD across roughly seven repositories (3 Go, 4 Node.js) on Jenkins Multibranch Pipelines, so branch and pull-request builds follow the same lifecycle in every service.',
        'Introduced reusable Jenkinsfile structure that keeps shared pipeline logic separate from per-repository configuration, which cut down copy-paste drift between services.',
        'Separated environment-specific variables and credentials from the pipeline definition, so the same pipeline can run against different environments without edits.',
        'Ordered the pipeline as explicit gates — build, lint, unit tests, end-to-end tests, and AI-assisted code review — each able to stop the run.',
        'Automated the deployment path: build artifact → SCP transfer → SSH to the target host → deploy → health check → automatic rollback when validation fails.',
        'Added Playwright end-to-end tests to CI so regressions are caught before promotion rather than after a release.',
        'Stood up Prometheus and Grafana dashboards for host and service metrics to make post-deployment behaviour observable.',
        'Wrote operational procedures for Jenkins workspace cleanup, Git safe.directory configuration, Go module cache cleanup, and Jenkins storage capacity management.',
      ],
      decisions: [
        {
          title: 'Shared pipeline structure instead of per-repository pipelines',
          detail:
            'Copy-pasted pipelines drift, because a fix applied to one repository never reaches the others. Keeping shared stages in a common Jenkinsfile structure and pushing only environment differences into per-repository configuration means a change to the build or test standard lands everywhere at once — and reviewing a pipeline means reading one definition instead of seven.',
        },
        {
          title: 'Ordered, blocking quality gates',
          detail:
            'Cheap checks run first — build and lint before tests — so a broken change fails in seconds rather than after a full test run. Because each gate can stop the pipeline, a failing test blocks promotion rather than producing a warning nobody reads.',
        },
        {
          title: 'Treat a failed deployment as a normal outcome',
          detail:
            'The deployment path validates the service after release and rolls back automatically when validation fails. Designing for the failure case, rather than assuming the happy path, is what makes releasing often less risky than releasing rarely.',
        },
        {
          title: 'Instrument the service, not just the pipeline',
          detail:
            'A green pipeline only reports that the deploy command succeeded. Prometheus metrics and Grafana dashboards cover what happens afterwards — whether the service is actually serving traffic correctly.',
        },
      ],
      reliability: [
        'Unit-test quality gates enforced in CI for both Go and Node.js services.',
        'Playwright end-to-end tests covering the deployed service, wired into the same pipeline.',
        'Go and Node.js test automation, so tests run the same way locally and in CI.',
        'Health checks after deployment, with automatic rollback on failed validation.',
        'Prometheus and Grafana dashboards for system and service metrics.',
      ],
      challenges: [
        'CI environments are not development machines. Go module resolution depends on GOPATH, GOMOD, and GOPROXY being configured the way the build expects, and go.work workspaces behave differently in a clean CI checkout than in a developer\'s local tree.',
        'Jenkins workspaces and Go module caches grow until the host runs out of disk. Keeping them bounded needed explicit cleanup stages and documented capacity procedures, not a one-off manual delete.',
        'Git refuses to operate on repositories it considers owned by another user — a recurring failure on shared build hosts, handled with safe.directory configuration.',
        'Credentials and environment-specific values were the main source of differences between repositories, so they had to be pulled out of the pipeline definitions before the pipelines could genuinely be shared.',
      ],
      framingNote:
        'This was internship work on an existing set of services, not a greenfield platform built from scratch.',
    },
  },{
  "id": "personal-memo",
  "title": "PersonalMemo",
  "category": "Agent Infrastructure",
  "year": "2026",
  "featured": false,
  "summary": "A portable local memory store for MCP-capable agents. Markdown holds current context; append-only JSONL tracks revisions. Includes a CLI, search, and an MCP stdio server.",
  "techStack": [
    "TypeScript",
    "Node.js",
    "MCP SDK",
    "Zod"
  ],
  "caseStudy": {
    "framingNote": "Local project verified from source. No public repository or hosted demo is available."
  }
},
];

export const ALL_PROJECTS: Project[] = [...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS];
