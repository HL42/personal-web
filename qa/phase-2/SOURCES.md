# Phase 2 source and media verification

Checked 2026-11-22. Public GitHub content was read through the connected GitHub tools, including latest README, package manifests and selected implementation files. No source repositories were modified. The four supplied live sites returned HTTP200 in isolated Chrome. No account was created and no live data was written.

| Project | Inspected revision / evidence | Presentation boundary |
|---|---|---|
| Ciravo | Public ciravo.app page; existing projects/ciravo context | Co-developed pre-launch product. Public page is a launch preview; waitlist marked under development. No App Store release or production readiness claimed. |
| RepoWiki | f96a5ee60f328f6d64e3cce8c64f82780ddc595b; README, go.mod, frontend/package.json, internal/wiki/ingest.go and query.go | Go + Vue3 local app, filesystem knowledge, retrieval and DeepSeek. No hosted demo. Source-derived architecture diagram. |
| SaveWise | c5020f056b25eed241626abade1c5800b0466ca0; README, client/package.json, finance.ts, supabase.ts, CI workflow | Current React/TypeScript + Supabase/PostgreSQL implementation. Actual online English read-only demo captured; values belong to that explicitly fictional demo, not the user's finances. No MongoDB/AI bookkeeping claims. |
| Enterprise Multi-Source RAG Agent | d10bef0725e24cd260d7298a24c8185fca97b4d1; README, package.json, chat route, embeddings implementation and phase4-security.md | Next.js14, AI SDK6, DeepSeek, local ONNX embeddings and Supabase pgvector. A seeded prototype, not a verified production enterprise deployment. No hosted URL verified. |
| Nexus | 9c485d787166b0ca40848b38c5008fd69f1ad633; README, client/package.json, App.jsx, server/index.js, screenshot.png | MERN + MUI/Recharts/SheetJS. Current live page had empty inventory. Additional image is the repository's own screenshot, labelled accordingly. No inventory was inserted to improve the picture. |
| BlogApp | 69acff512d01f32961756ec6e6cba32316ee54a4; README, frontend/package.json, App.jsx and Express server | MERN news/blog application. Public interface loaded; news feed empty at capture. No backend writes, guaranteed feed availability, or unverified authenticated/multi-tenant features claimed. |

## Identity, experience and skills

Email, LinkedIn and GitHub match the existing configuration and resume. The resume confirms Wilfrid Laurier University, expected May2027, and Backend & Platform Engineering Intern at Guangzhou Baizhi Technology Co., Limited, May–Aug2026. Responsibilities were taken from the existing structured record and checked against the resume: Jenkins, automated testing/Playwright, AI-assisted review, deployment checks/rollback, Prometheus and Grafana. No invented percentages or new employers were added.

Docker is not listed: it was suggested as a possible skill but was not established by the reviewed project sources/resume. GitHub Actions is confirmed by SaveWise's workflow and RepoWiki's release workflow. Vue3 is included because it is the actual RepoWiki frontend.

## Items still needing owner confirmation

- The current PDF resume describes an older/different Enterprise RAG project with a Go/MongoDB-oriented stack. The portfolio uses the supplied GitHub repository's current Next.js/pgvector implementation. The PDF itself was not edited.
- Ciravo application source is not public; deeper implementation claims rely on the existing user project context, while the public page independently confirms the pre-launch status.
- Nexus and BlogApp backend-dependent populated states were not independently exercised through writes. Their capture notes preserve this boundary.
- The canonical website URL is retained from the pre-existing website configuration. This task does not deploy the updated portfolio to that domain.
