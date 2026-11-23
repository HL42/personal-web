import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await page.goto("https://save-wise-theta.vercel.app/", {
  waitUntil: "networkidle",
});
await page.getByText("EN", { exact: true }).click();
console.log((await page.locator("body").innerText()).slice(0, 1600));
const demo = page.getByRole("button", { name: /demo/i });
console.log("demo buttons", await demo.allTextContents());
await demo.click();
await page.waitForTimeout(1000);
console.log((await page.locator("body").innerText()).slice(0, 2400));
await page.screenshot({
  path: "public/projects/savewise-desktop.jpg",
  type: "jpeg",
  quality: 90,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
await page.screenshot({
  path: "public/projects/savewise-mobile.jpg",
  type: "jpeg",
  quality: 90,
});
await writeFile(
  "qa/phase-2/savewise-demo.txt",
  await page.locator("body").innerText(),
);
await browser.close();
