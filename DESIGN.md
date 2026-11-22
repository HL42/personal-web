# Phase 1 measured reference contract

Reference: https://mikewilcockdesign.com/. This is a recreation, not an original design exercise. Experience mode. No concept alternatives or personalization.

## Reference values
- Ground #111010; surface #1a1918; text #edeae4; accent #7fa8ff; secondary #8f8a82; hairlines 12% foreground.
- Archivo variable wdth 62–125, wght 100–900, normal/italic; Geist Mono metadata. Self-host via OFL-licensed Fontsource files.
- Display rest wdth 70 / wght 800; near-pointer wdth 125 / wght 260, radius 420px in hero. Per-frame normalized smoothing .12. Do not scale text horizontally.
- Gutter clamp(20px, 4vw, 56px). Hero 100svh, top clamp(100px,15vh,150px), title font min(19vw,53.1915cqh), .86 line-height, -.01em tracking. Mobile <=700px uses measured text-to-container fit, 96px top, title margin 44px/48px.
- Navigation fixed, padding 18px/gutter, three columns. <=1100px hides clock, <=900px uses menu, <=700px padding 14px/20px.
- Work rows min-height 40vh; dock width clamp(320px,30vw,460px), 4:5. <=700px dock above rows, sticky top64px,16:9.
- Gallery frames 4:5, height clamp(320px,58vh,560px), gap clamp(16px,2vw,28px). Drag inertia .92 per normalized frame, smoothing .2, skew capped 3deg.
- Statement 150vh with 100vh sticky reading area; opacity .14–1 by word; <=700px 130vh.
- Primary easing cubic-bezier(.16,1,.3,1); transition easing cubic-bezier(.76,0,.24,1). Intro target 2.7s; route cover target1.7s; reveal1.1s; word stagger40ms.

## Media and identity boundary
Reference name/project names are short factual comparison labels. The original logo and all media are excluded. The header uses an independent study wordmark; all project previews are locally authored fictional UI compositions. No implied client relationships or working enquiry service. This necessary media difference is not Phase2 branding.

## Verification
Capture identical viewports in qa/round-1 and qa/round-2, including section views; compare computed bounding boxes, overflow, font axes, and interaction state. Browser tests cover menu, routes, drag, pause, reduced motion, intro, and variable font behavior. Do not describe visual QA as passed unless performed.
