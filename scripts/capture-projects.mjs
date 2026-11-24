import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

const targets = [
  { slug: 'ciravo', url: 'https://ciravo.app/', state: 'Public pre-launch website' },
  { slug: 'savewise', url: 'https://save-wise-theta.vercel.app/', state: 'Actual read-only demo; fictional data supplied by the application' },
];
if (process.env.REPOWIKI_CAPTURE_URL) {
  targets.push({ slug: 'repowiki', url: process.env.REPOWIKI_CAPTURE_URL, state: 'Unmodified local application; empty knowledge base; no API key or AI requests' });
}

await mkdir('qa/project-captures', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const target of targets) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    page.setDefaultTimeout(15000);
    let capturedState = target.state;
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status()}`);
      if (target.slug === 'savewise') {
        await page.getByRole('heading', { name: /欢迎回来|Welcome back/ }).waitFor();
        const english = page.getByText('EN', { exact: true });
        if (await english.isVisible()) await english.click();
        const demo = page.getByRole('button', { name: 'Explore the demo', exact: true });
        await demo.waitFor({ state: 'visible' });
        if (await demo.isEnabled()) {
          await demo.click();
          await page.getByText('Available to spend', { exact: true }).waitFor();
        } else {
          capturedState = 'Actual public sign-in screen; Explore the demo is disabled; no sign-in or financial data accessed';
        }
      }
      if (target.slug === 'repowiki') {
        await page.getByRole('heading', { name: '快速开始', exact: true }).waitFor();
      }
      await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
      await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 5000))]));
      await page.waitForTimeout(1500);
      const captures = [];
      const capture = async (suffix, viewport) => {
        if (viewport) {
          await page.setViewportSize(viewport);
          await page.waitForTimeout(700);
        }
        const path = target.slug === 'repowiki' && suffix === 'mobile'
          ? 'qa/project-captures/repowiki-narrow-unsupported.jpg'
          : `public/projects/${target.slug}-${suffix}.jpg`;
        const bytes = await page.screenshot({ path, type: 'jpeg', quality: 95 });
        captures.push({ path, viewport: page.viewportSize(), sha256: createHash('sha256').update(bytes).digest('hex') });
      };
      await capture('desktop');
      await page.screenshot({ path: `qa/project-captures/${target.slug}-full.png`, fullPage: true });
      if (target.slug === 'repowiki') {
        await page.getByRole('button', { name: /AI 问答.*打开/ }).click();
      } else {
        await page.mouse.wheel(0, 650);
      }
      await page.waitForTimeout(700);
      await capture('detail');
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await capture('mobile', { width: 390, height: 844 });
      const result = {
        ...target,
        state: capturedState,
        capturedAt: new Date().toISOString(),
        title: await page.title(),
        resolvedUrl: page.url(),
        text: (await page.locator('body').innerText()).slice(0, 7000),
        status: response.status(),
        captures,
        errors,
      };
      results.push(result);
      console.log(target.slug, response.status(), result.title, captures.map(capture => capture.path).join(', '));
    } finally {
      await page.close();
    }
  }
} finally {
  await writeFile('qa/project-captures/manifest.json', JSON.stringify(results, null, 2));
  await browser.close();
}
