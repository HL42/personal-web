import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome", headless: true });
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
  await page.goto("https://mikewilcockdesign.com/", {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(3800);
  for (const [name, sel] of Object.entries({
    work: ".selected-work",
    gallery: ".up-close",
    about: ".statement",
    footer: ".footer",
  })) {
    await page.evaluate(
      (sel) =>
        window.scrollTo(
          0,
          document.querySelector(sel).getBoundingClientRect().top + scrollY,
        ),
      sel,
    );
    await page.waitForTimeout(1600);
    await page.screenshot({
      path: `qa/reference/${width}x${height}-${name}.png`,
    });
  }
  await page.close();
  console.log("Reference sections", width, height);
}
await browser.close();
