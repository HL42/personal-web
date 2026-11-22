import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const evidence = [];
for (const [width, height] of [
  [1440, 900],
  [1280, 800],
])
  for (const original of [true, false]) {
    const page = await browser.newPage({ viewport: { width, height } });
    if (!original)
      await page.addInitScript(() =>
        sessionStorage.setItem("study-intro-seen", "1"),
      );
    await page.goto(
      original ? "https://mikewilcockdesign.com/" : "http://127.0.0.1:5173/",
      { waitUntil: "networkidle" },
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(original ? 3000 : 400);
    const letters = page.locator(
      original
        ? ".hero__line .kinetic__letter"
        : ".study-hero-line [data-study-letter]",
    );
    const letter = letters.nth(1),
      box = await letter.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(700);
    evidence.push({
      width,
      height,
      source: original ? "reference" : "local",
      before: box,
      after: await letter.boundingBox(),
      axes: await letter.evaluate(
        (el) => getComputedStyle(el).fontVariationSettings,
      ),
    });
    await page.screenshot({
      path: `qa/${original ? "reference" : "round-2"}/${width}x${height}-hover.png`,
    });
    await page.close();
  }
await writeFile(
  "qa/hover-measurements.json",
  JSON.stringify(evidence, null, 2),
);
await browser.close();
console.log(evidence);
