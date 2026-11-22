import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const sizes = [
  [1440, 900],
  [1280, 800],
  [390, 844],
];
await mkdir("qa/reference", { recursive: true });
for (const [width, height] of sizes) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto("https://mikewilcockdesign.com/", {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(3800);
  const sections = [
    ".hero",
    ".hero__top",
    ".hero__name",
    ".hero__line",
    ".hero__bottom",
    ".hero__intro",
    ".header",
    ".marquee",
    ".selected-work",
    ".selected-work__grid",
    ".selected-work__row",
    ".selected-work__dock",
    ".up-close",
    ".up-close__frame",
    ".statement",
    ".statement__text",
    ".service-tiles",
    ".footer",
    ".footer__big",
  ];
  const metrics = await page.evaluate(
    (selectors) =>
      Object.fromEntries(
        selectors.map((sel) => [
          sel,
          [...document.querySelectorAll(sel)].map((el) => {
            const r = el.getBoundingClientRect(),
              s = getComputedStyle(el);
            return {
              x: r.x,
              y: r.y,
              width: r.width,
              height: r.height,
              font: s.fontFamily,
              fontSize: s.fontSize,
              lineHeight: s.lineHeight,
              variation: s.fontVariationSettings,
              padding: s.padding,
              margin: s.margin,
              gap: s.gap,
              letterSpacing: s.letterSpacing,
            };
          }),
        ]),
      ),
    sections,
  );
  await writeFile(
    `qa/reference/${width}x${height}.json`,
    JSON.stringify(metrics, null, 2),
  );
  await page.screenshot({ path: `qa/reference/${width}x${height}.png` });
  // Scroll to trigger reveals before a document capture.
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += height * 0.65
  ) {
    await page.mouse.wheel(0, height * 0.65);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1600);
  await page.screenshot({
    path: `qa/reference/${width}x${height}-full.png`,
    fullPage: true,
  });
  console.log(width, height, metrics[".hero__line"]);
  await page.close();
}
await browser.close();
