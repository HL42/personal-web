import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const projects = [
  ["ciravo", "https://ciravo.app/"],
  ["savewise", "https://save-wise-theta.vercel.app/"],
  ["nexus", "https://inventory-system-liart-iota.vercel.app/"],
  ["blogapp", "https://blog-app-92jy.vercel.app/"],
];
const results = [];
for (const [slug, url] of projects) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  try {
    const response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(4500);
    const entry = {
      slug,
      url,
      status: response.status(),
      title: await page.title(),
      text: (await page.locator("body").innerText()).slice(0, 6000),
      links: await page
        .locator("a")
        .evaluateAll((els) =>
          els.map((e) => ({ text: e.textContent, url: e.href })),
        ),
      errors,
    };
    await page.screenshot({
      path: `public/projects/${slug}-desktop.jpg`,
      type: "jpeg",
      quality: 90,
    });
    await page.screenshot({
      path: `qa/phase-2/${slug}-full.png`,
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `public/projects/${slug}-mobile.jpg`,
      type: "jpeg",
      quality: 90,
    });
    results.push(entry);
    console.log(JSON.stringify(entry));
  } catch (error) {
    results.push({ slug, url, error: String(error) });
    console.log(slug, String(error));
  }
  await page.close();
}
await writeFile(
  "qa/phase-2/live-projects.json",
  JSON.stringify(results, null, 2),
);
await browser.close();
