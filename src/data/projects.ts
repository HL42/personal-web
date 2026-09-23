import type { Project } from '../types';
// 只有精选项目卡片会渲染配图，归档项目是纯文字列表，因此不引用图片资源
import inventoryImage from '../assets/inventory.jpg';
import saveWiseImage from '../assets/Save-wise.png';

/** 首页精选工程，按重要性排序 */
export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'production-engineering',
    title: 'Production Engineering & CI/CD',
    subtitle: 'Standardizing build, test, and release workflows across Go and Node.js services',
    category: 'Platform Engineering',
    year: '2026',
    period: 'May – Aug 2026',
    featured: true,
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
  },
  {
    id: 'save-wise',
    title: 'SaveWise',
    subtitle: 'Conversational bookkeeping that keeps the accounting correct',
    category: 'Full-Stack Application',
    year: '2026',
    period: '2026',
    featured: true,
    summary:
      'Accepts natural-language financial input in English or Chinese and resolves it into structured transactions, with asset/liability-aware balance updates and a dual-currency portfolio view.',
    techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Mongoose', 'Vite', 'Tailwind CSS'],
    imageUrl: saveWiseImage,
    link: 'https://save-wise-theta.vercel.app/',
    githubLink: 'https://github.com/HL42/SaveWise.git',
    caseStudy: {
      problem:
        'Recording what you spend is usually a trade-off between two bad options: form-based bookkeeping that produces clean data but is tedious enough that people stop doing it, and quick free-text notes that are fast but leave you with records you cannot compute on. SaveWise takes conversational input and resolves it into proper transaction records, so entering a purchase is one sentence without giving up accounting correctness.',
      flowCaption: 'From a written sentence to a value the rest of the system can compute on.',
      flow: [
        { label: 'Natural-language input', phase: 'Input', note: 'English or Chinese' },
        { label: 'Intent resolution', phase: 'Parsing', note: 'amount, category, account, direction' },
        { label: 'Structured transaction', phase: 'Parsing', note: 'typed record' },
        { label: 'Balance update', phase: 'Accounting', note: 'asset / liability aware' },
        { label: 'Portfolio view', phase: 'Presentation', note: 'dual-currency totals' },
      ],
      built: [
        'Natural-language input path that accepts everyday phrasing in English and Chinese and resolves it into a structured transaction.',
        'Transaction model covering amount, category, account, and direction, so free text becomes a record the rest of the system can compute on.',
        'Asset/liability-aware balance logic: each transaction updates the affected account with the correct sign, keeping balances consistent as records accumulate.',
        'Dual-currency portfolio view that reports holdings across more than one currency instead of assuming a single-currency account.',
        'Full-stack implementation: React and TypeScript client, Node.js API, MongoDB persistence through Mongoose.',
      ],
      decisions: [
        {
          title: 'Resolve to a structured record — never store the raw sentence as the record',
          detail:
            'The conversational input is an interface, not a data model. Parsing to a typed transaction at the boundary means balances, totals, and later features all operate on consistent fields, and a change to the parser cannot silently corrupt stored history.',
        },
        {
          title: 'Keep balance arithmetic in one place',
          detail:
            'Scattering "add or subtract depending on type" across screens is how balances drift apart from each other. Centralizing the sign and asset/liability rules in a single layer makes the behaviour testable and keeps every view consistent with the same source of truth.',
        },
        {
          title: 'Treat liabilities as a first-class concept',
          detail:
            'Modelling what you owe as its own concept, rather than as a negative number sitting in an asset field, keeps net-worth reporting correct and leaves room to represent the distinction properly in the interface.',
        },
      ],
      challenges: [
        'Natural language is ambiguous about exactly the things the data model cares about most — which account, which direction, whether an entry is income or a transfer — so the parser has to resolve intent rather than only extract numbers.',
        'Supporting two languages means the same underlying record can be described very differently by different users, which pushes the resolution logic to work on meaning rather than on fixed keyword patterns.',
        'Currency handling is a data-model problem before it is a display problem: balances held in different currencies cannot simply be summed.',
      ],
    },
  },
  {
    id: 'nexus',
    title: 'Nexus Inventory',
    subtitle: 'Inventory management where the hard part is the spreadsheet you already have',
    category: 'Full-Stack Application',
    year: '2025',
    period: 'Nov 2025',
    featured: true,
    summary:
      'Inventory dashboard built around bulk spreadsheet import and export, so existing records can be migrated in and reports taken out without hand-rekeying anything.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Material UI', 'SheetJS'],
    imageUrl: inventoryImage,
    link: 'https://inventory-system-liart-iota.vercel.app/',
    githubLink: 'https://github.com/HL42/inventory-system',
    caseStudy: {
      problem:
        'Inventory data rarely starts in the new system. It starts in a spreadsheet that a business has been maintaining for years, with its own column names and formatting. A CRUD interface on its own just moves the re-keying problem somewhere else, so the import and export path is the part that decides whether adopting the tool is realistic.',
      built: [
        'Bulk import and export built on SheetJS, taking an existing spreadsheet and loading it into the inventory schema in one operation.',
        'Mapping layer that translates arbitrary legacy column names onto the internal record shape, instead of requiring the source file to be reformatted by hand first.',
        'Export path that produces a report from live data in a single step.',
        'CRUD over inventory records backed by MongoDB, with a Material UI DataGrid front end suited to large, sortable tables.',
      ],
      decisions: [
        {
          title: 'Treat migration as a feature, not a setup step',
          detail:
            'If getting existing data in is a manual chore, the tool does not get adopted. Making import and export a first-class flow rather than a one-time script means the same path is reusable every time a new batch of records arrives.',
        },
        {
          title: 'Absorb the source format instead of demanding a clean one',
          detail:
            'Real spreadsheets do not match the target schema. Handling that translation inside the application keeps the requirement off the user, who would otherwise have to normalise their own file before the tool would accept it.',
        },
        {
          title: 'Pick a data grid that survives real tables',
          detail:
            'Inventory lists get long. Material UI DataGrid provides sorting, paging, and column control for large datasets without rebuilding that behaviour from scratch.',
        },
      ],
    },
  },
];

/** 更早期或非核心方向的工程，在首页以紧凑列表呈现 */
export const ARCHIVE_PROJECTS: Project[] = [
  {
    id: 'codepath',
    title: 'CodePath',
    category: 'EdTech Platform',
    year: '2026',
    featured: false,
    summary:
      'Learning platform for beginners with module unlock dependencies and a direction-diagnostic flow, built on Next.js and Supabase.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'shadcn/ui'],
    link: 'https://codepath-eta.vercel.app',
    githubLink: 'https://github.com/HL42/RoadMap-dev',
  },
  {
    id: 'blog-app',
    title: 'Dynamic Blog',
    category: 'Web Application',
    year: '2025',
    period: 'Jan 2025 – Mar 2025',
    featured: false,
    summary:
      'Multi-user blogging platform with REST endpoints, news integration, and persistent bookmarking. Migrated from browser storage to a MERN stack.',
    techStack: ['React', 'Express.js', 'MongoDB Atlas', 'GNewsAPI'],
    link: 'https://blog-app-92jy.vercel.app/',
    githubLink: 'https://github.com/HL42/BlogApp',
  },
  {
    id: 'waterloo-eat',
    title: 'Waterloo Eat',
    category: 'Web Application',
    year: '2025',
    period: 'Sep 2025',
    featured: false,
    summary:
      'Bilingual restaurant discovery site for the Waterloo community. Built with HTML, CSS, and vanilla JavaScript.',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    link: 'https://hl42.github.io/WaterlooEat-App/',
    githubLink: 'https://github.com/HL42/WaterlooEat-App',
  },
];

export const ALL_PROJECTS: Project[] = [...FEATURED_PROJECTS, ...ARCHIVE_PROJECTS];
