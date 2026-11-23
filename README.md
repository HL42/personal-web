# Personal Portfolio Website

我的个人作品集网站，展示我的项目、经历和技能。

🌐 **Live Demo**: [https://personal-web-steel-ten.vercel.app/](https://personal-web-steel-ten.vercel.app/)

## 关于这个项目

这是一个用 React + TypeScript 构建的个人作品集网站，展示了我的：
- 🎯 个人介绍和技能
- 💼 工作经历和教育背景
- 🚀 精选项目（包含项目详情页）
- 📧 联系方式

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Framer Motion** - 动画效果
- **React Router** - 路由管理
- **Tailwind CSS** - 样式（通过 CDN）

## 本地运行

1. 克隆仓库
```bash
git clone https://github.com/HL42/personal-web.git
cd personal-web
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:5173`

## 构建生产版本

```bash
npm run build
```

构建后的文件会在 `dist` 目录中。

## 项目结构

```
src/
├── components/     # React 组件
│   ├── Hero.tsx           # 首页英雄区
│   ├── ProjectList.tsx    # 项目列表
│   ├── ProjectDetail.tsx # 项目详情页
│   ├── ExperienceList.tsx # 经历和技能
│   └── Contact.tsx        # 联系方式
├── constants.ts    # 数据常量（项目、经历等）
├── types.ts        # TypeScript 类型定义
└── main.tsx        # 入口文件
```

## 部署

这个项目部署在 Vercel 上，每次推送到 main 分支会自动触发部署。

## 联系方式

- 📧 Email: fuquanlin347@gmail.com
- 💼 LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/fuquan-lin-1b3ba3290)
- 💻 GitHub: [github.com/HL42](https://github.com/HL42)

---

Made with ❤️ using React + TypeScript + Vite

## Project content verification (2026-11-21)

Project content lives in `src/data/projects.ts`. This is a reviewed snapshot, not a scheduled GitHub synchronization.

- Featured: Ciravo, RepoWiki, SaveWise. More Projects: Production Engineering & CI/CD and PersonalMemo.
- Enterprise RAG Agent, Nexus Inventory, Dynamic Blog, Waterloo Eat, and CodePath were removed from the portfolio at the owner’s request.
- RepoWiki and LLM Wiki refer to the same repository; only one card is shown.
- SaveWise was checked against its latest public README and local client dependencies. The current app uses Supabase/PostgreSQL, not MongoDB or AI bookkeeping.
- RepoWiki was checked against its public README and local Go/Vue source. Enterprise RAG Agent was checked against its public README and chat route.
- Ciravo's public landing page is available; its supplied GitHub repository returns 404. Its technology stack and individual implementation contributions remain unverified. Public product previews are described as pre-launch, not shipped functionality.
- PersonalMemo was verified from local README, package manifest, and source structure. No private repository URL or memory content is published.
- Ciravo and SaveWise images are browser captures of their public websites. SaveWise's public demo control is disabled, so its image shows the sign-in screen. RepoWiki and Enterprise RAG Agent use data-flow diagrams, not fabricated screenshots.
- Existing archive descriptions remain historical claims; their implementations were not freshly audited. The listed public demo and repository links returned HTTP 200. Waterloo Eat's older GitHub repository is absent from the current public repository list, so its GitHub button was removed; its live site remains accessible.
- Public repository scan excluded forks, course repositories, coding submissions, profile repositories, and sites without enough confirmed engineering detail.

Checks: `npx eslint src`, `npx tsc -b`, and `npm run build`. Full `npm run lint` also scans the pre-existing untracked legacy `my-portfolio/` directory and fails on an unterminated string in its `src/constants.ts`; that unrelated directory is not modified here. Node 20.13.1 produces a Vite version warning; use Node 22.12+ for supported tooling.

## Phase 1 reference recreation (2026-11-22)

The Phase 1 recreation is preserved at commit `b88c55a` on branch `phase-1-snapshot`. The current entry is the personalized Phase 2 portfolio in `src/recreation/`.
Existing personal portfolio components, data, and media remain in the repository;
Phase 2 retains the accepted visual and motion system. See `PRODUCT.md` and `DESIGN.md` for scope
and measured design values, and `public/study/ASSET-LICENSES.txt` for provenance.

Use Node 22.14+ (Vite 7 requires Node 20.19+ or 22.12+):

```sh
npm install
npm run dev -- --host 127.0.0.1
npm run typecheck
npm run build
npm run test:browser
npm run qa:capture
```

Browser QA uses an installed Google Chrome via Playwright (`channel: 'chrome'`);
it does not install or access the user's browser profile. Run the dev server before
browser tests or captures. The comparison gallery is at `/qa/index.html` during
local development. Raw measurements and both visual rounds live in `qa/`.
The Phase 2 contact form prepares a real email draft for review; it has no backend. Project images are actual public-site captures, with explicitly labelled source architecture diagrams where there is no hosted demo.


## Phase 2 — personal content, design locked

Branch: `phase-2-personalization`. Restore the accepted original with `git switch phase-1-snapshot` after saving any new work; no force reset is required.

- Personal identity, project facts, navigation, skills, and copy: `src/data/portfolio.ts`.
- Confirmed contact links: `src/data/socials.ts`; internship facts: `src/data/experience.ts`.
- Real project media: `public/projects/`; source/capture notes: `qa/phase-2/`.
- Run `npm run qa:capture` for current personal-portfolio screenshots.
- The color tokens, typography family, texture and motion parameters remain those accepted in Phase 1. Only real-content fitting and content pages are extended.
- Contact opens an email draft addressed to the confirmed email, never claims to send from a non-existent backend.
