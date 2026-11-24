# Locked design contract — Phase 2 content personalization

Reference: https://mikewilcockdesign.com/. Phase 1 visual design was accepted by the user. Experience mode. Phase 2 preserves layout, typography and motion. The owner subsequently authorized the charcoal / warm-white / warm-orange palette; no other redesign is authorized.

## Reference values
- Ground #141210; surface #1e1a17; text #f2ede4; accent #ff9b71; secondary #8f8a82; hairlines 12% foreground.
- Archivo variable wdth 62–125, wght 100–900, normal/italic; Geist Mono metadata. Self-host via OFL-licensed Fontsource files.
- Display rest wdth 70 / wght 800; near-pointer wdth 125 / wght 260, radius 420px in hero. Per-frame normalized smoothing .12. Do not scale text horizontally.
- Gutter clamp(20px, 4vw, 56px). Hero 100svh, top clamp(100px,15vh,150px), title font min(19vw,53.1915cqh), .86 line-height, -.01em tracking. Mobile <=700px uses measured text-to-container fit, 96px top, title margin 44px/48px.
- Navigation fixed, padding 18px/gutter, three columns. <=1100px hides clock, <=900px uses menu, <=700px padding 14px/20px.
- Work rows min-height 40vh; dock width clamp(320px,30vw,460px), 4:5. <=700px dock above rows, sticky top64px,16:9.
- Gallery frames 4:5, height clamp(320px,58vh,560px), gap clamp(16px,2vw,28px). Drag inertia .92 per normalized frame, smoothing .2, skew capped 3deg.
- Statement 150vh with 100vh sticky reading area; opacity .14–1 by word; <=700px 130vh.
- Primary easing cubic-bezier(.16,1,.3,1); transition easing cubic-bezier(.76,0,.24,1). Intro target 2.7s; route cover target1.7s; reveal1.1s; word stagger40ms.

## Phase 2 content fitting
The display identity is FUQUAN / LIN. Natural glyph widths are measured with the same font axes; desktop uses the existing viewport/container caps plus the measured width cap. On phones, either line is capped at 44.6vw so the short surname cannot become oversized. The biography is the user's supplied text. Project count is data-driven (three): Ciravo, RepoWiki and SaveWise. Longer copy may increase content height, never change the palette or physics.

## Media and identity boundary
All displayed identity, links and project content belong to Fuquan Lin. All three current projects use genuine browser captures refreshed November 24, 2026. Ciravo is its public pre-launch site; SaveWise is its labelled read-only fictional demo; RepoWiki is an unmodified local run showing initial setup and an empty Q&A panel, with no API key or generated answers. RepoWiki uses desktop captures on narrow layouts rather than a fabricated phone UI. No AI-generated screenshots or fabricated outcomes. Phase 1 demonstration assets are retained only in Git history.

## Verification
Phase 2 snapshots and project-source evidence live in qa/phase-2. Tests lock the authorized palette and Phase 1 layout affordances, verify FUQUAN/LIN fitting at three viewports, and exercise hover, inertia, pause, intro, transitions, keyboard focus, reduced motion, all project routes, resume and contact links. Historical Phase 1 comparisons remain in qa/round-1 and qa/round-2. Do not interpret longer content or three work rows as redesign drift.
