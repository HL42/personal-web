import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("qa/phase-2", { recursive: true });
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
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => {
    sessionStorage.setItem("study-intro-seen", "1");
    localStorage.setItem("study-storage-choice", "declined");
  });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350);
  const metrics = await page.evaluate(() => ({
    title: document.title,
    overflow: document.documentElement.scrollWidth > innerWidth,
    hero: [...document.querySelectorAll(".study-hero-line")].map((el) => ({
      text: el.textContent,
      fontSize: getComputedStyle(el).fontSize,
      rect: el.getBoundingClientRect().toJSON(),
      scrollWidth: el.scrollWidth,
    })),
    tokens: Object.fromEntries(
      [
        "--study-bg",
        "--study-text",
        "--study-accent",
        "--study-out",
        "--study-in-out",
        "--study-gutter",
      ].map((k) => [
        k,
        getComputedStyle(document.documentElement).getPropertyValue(k),
      ]),
    ),
  }));
  await page.screenshot({ path: `qa/phase-2/${width}x${height}.png` });
  for (const [name, selector] of Object.entries({
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
      selector,
    );
    await page.waitForTimeout(1100);
    await page.screenshot({
      path: `qa/phase-2/${width}x${height}-${name}.png`,
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: `qa/phase-2/${width}x${height}-full.png`,
    fullPage: true,
  });
  for (const route of ["work", "about", "experience", "contact"]) {
    await page.goto(`http://127.0.0.1:5173/#/${route}`, {
      waitUntil: "networkidle",
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    await page.screenshot({
      path: `qa/phase-2/${width}x${height}-page-${route}.png`,
    });
  }
  await writeFile(
    `qa/phase-2/${width}x${height}.json`,
    JSON.stringify({ metrics, errors }, null, 2),
  );
  console.log(width, height, JSON.stringify({ metrics, errors }));
  await page.close();
}
const og = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await og.addInitScript(() => sessionStorage.setItem("study-intro-seen", "1"));
await og.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await og.evaluate(() => document.fonts.ready);
await og.waitForTimeout(300);
await og.screenshot({
  path: "public/social-preview.jpg",
  type: "jpeg",
  quality: 90,
});
await browser.close();
