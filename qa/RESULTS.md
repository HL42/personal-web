# Phase 1 verification

This is the local reference recreation, not Phase 2 personalization. Existing personal portfolio components and data remain in the repository. Application code is independently implemented in `src/recreation/`; reference screenshots are private comparison artifacts in `qa/reference/` and are not included in `dist/`.

## Run

Use Node 22 (`nvm use`, version recorded in `.nvmrc`). Start with `npm run dev -- --host 127.0.0.1`. The local URL is http://127.0.0.1:5173/. The comparison viewer is http://127.0.0.1:5173/qa/index.html. A production build uses `npm run build`; use `npm run preview` to serve it. The production footer links to asset credits rather than the development-only comparison viewer.

## Visual evidence

Reference and local were captured with the same installed Google Chrome, device scale 1, at 1440×900, 1280×800 and 390×844. Two complete visual rounds include Hero, Selected Work, Gallery, About, Footer and full-page captures. Hover evidence is additionally captured for both desktop sizes. Timing-dependent media and marquee frames are not synchronized.

- Round 1 exposed excess grain contrast, a 2.47px mobile fit shift, extra italic words causing the About paragraph to wrap incorrectly, and extra footer rows/height.
- Round 2 corrects these issues, restores the measured footer word space, the mobile three-screen preview, and the active mobile project CTA.
- See `geometry-summary.json` for measured reference/local outer-box deltas. These are geometry readings, not a perceptual similarity score or a claim that substituted media match the originals.
- At the sampled 1440px hover position after 700ms, the reference letter measured 82.03125px wide, and the local letter 82px. Reference axes were wdth124.9/wght261; local axes were wdth124.775/wght262.213. See `hover-measurements.json` and hover screenshots.
- A sampled background patch measured RGB means 22.07/21.06/21.05 in the reference and 22.13/21.13/21.13 locally; noise standard deviation was about 1.26 vs 1.29. The texture is independently generated.

## Validation

TypeScript project checks and the production Vite build pass using Node22. The production JavaScript is about 91KB gzip and CSS about 13KB gzip. Fonts and sample photographs are served locally. These are bundle measurements; no new Lighthouse score is claimed.

The final Playwright suite has 16 passing tests, zero failures, zero skipped, and zero flaky tests. Machine-readable results: `browser-results.json`. Coverage includes:

- Three reference viewport geometries and horizontal overflow.
- Real variable font-axis response and restoration, without horizontal text transforms.
- First-visit intro, skip, and session persistence.
- Mobile navigation focus cycle, Escape, route transition and restored focus.
- Work list/grid and case navigation.
- Pointer-following preview, project switching and media pause.
- Gallery drag, inertia, accidental-click suppression, ordinary link click and native touch scrolling.
- Sequential pinned paragraph illumination.
- Reduced motion: content remains, normal cursor, direct navigation.
- Exclusive FAQ and local-only contact form.
- Local asset loading, footer fit and no uncaught browser errors.
- Mobile work-preview swiping and prevention of unintended navigation.
- Preference dismissal persistence and reopening.

The design detector reported only its generic Geist font warnings. Geist Mono is an explicit measured reference choice, so no font substitution or detector suppression was introduced.

## Remaining differences and boundaries

- The reference logo, award badge, photographs, project screenshots and video are intentionally excluded. The header is a study wordmark; demonstration interfaces and licensed alternative photographs replace project media. Source and licenses are in `public/study/ASSET-LICENSES.txt`.
- The original MP4/site recordings are represented by original animated HTML interfaces. Their content, per-scene choreography and colors necessarily differ.
- The intro uses the independent study identity and its own accent expansion rather than copying the reference logo sequence. It follows the reference's approximate 2.7-second first-visit rhythm.
- Secondary routes provide the presentation and interaction structure for review; they do not reproduce the original designer's complete client narratives, CMS, database or email service. Contact submits only to local React state.
- Validation uses Chrome. No claim is made about Safari/Firefox rendering or a formal Lighthouse audit.
- Phase 2 has not begun. No deployment, backend rewrite, or personal-project migration was performed.
