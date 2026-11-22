import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const round = process.argv[2] || "round-1";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const map = {
  ".hero": ".study-hero",
  ".hero__top": ".study-hero-meta",
  ".hero__name": ".study-hero-name",
  ".hero__line": ".study-hero-line",
  ".hero__bottom": ".study-hero-bottom",
  ".hero__intro": ".study-hero-description",
  ".header": ".study-header",
  ".marquee": ".study-marquee",
  ".selected-work": ".study-selected",
  ".selected-work__grid": ".study-work-grid",
  ".selected-work__row": ".study-work-row",
  ".selected-work__dock": ".study-work-dock",
  ".up-close": ".study-gallery",
  ".up-close__frame": ".study-gallery-frame",
  ".statement": ".study-statement",
  ".statement__text": ".study-statement-text",
  ".service-tiles": ".study-services",
  ".footer": ".study-footer",
  ".footer__big": ".study-footer-title",
};
await mkdir(`qa/${round}`, { recursive: true });
for (const [width, height] of [
  [1440, 900],
  [1280, 800],
  [390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    hasTouch: width < 700,
    isMobile: width < 700,
  });
  await page.addInitScript(() =>
    sessionStorage.setItem("study-intro-seen", "1"),
  );
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const metrics = await page.evaluate(
    (map) =>
      Object.fromEntries(
        Object.entries(map).map(([key, sel]) => [
          key,
          [...document.querySelectorAll(sel)].map((el) => {
            const r = el.getBoundingClientRect(),
              s = getComputedStyle(el);
            return {
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
              fontSize: s.fontSize,
              lineHeight: s.lineHeight,
              variation: s.fontVariationSettings,
              padding: s.padding,
            };
          }),
        ]),
      ),
    map,
  );
  await writeFile(
    `qa/${round}/${width}x${height}.json`,
    JSON.stringify({ metrics, errors }, null, 2),
  );
  await page.screenshot({ path: `qa/${round}/${width}x${height}.png` });
  // Compare all major regions at their own section position, reference and local.
  for (const [name, sel] of Object.entries({
    work: ".study-selected",
    gallery: ".study-gallery",
    about: ".study-statement",
    footer: ".study-footer",
  })) {
    await page.evaluate(
      (sel) =>
        window.scrollTo(
          0,
          document.querySelector(sel).getBoundingClientRect().top + scrollY,
        ),
      sel,
    );
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: `qa/${round}/${width}x${height}-${name}.png`,
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: `qa/${round}/${width}x${height}-full.png`,
    fullPage: true,
  });
  console.log(width, height, "errors", errors);
  await page.close();
}
await browser.close();
