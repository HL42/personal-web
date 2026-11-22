import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
const skipIntro = async (page: import("@playwright/test").Page) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("study-intro-seen", "1"),
  );
};
const ready = async (page: import("@playwright/test").Page) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".study-hero")).toBeVisible();
};
for (const [width, height] of [
  [1440, 900],
  [1280, 800],
  [390, 844],
]) {
  test(`measured reference layout and no overflow ${width}×${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await skipIntro(page);
    await ready(page);
    await page.waitForTimeout(300);
    const reference = JSON.parse(
      readFileSync(`qa/reference/${width}x${height}.json`, "utf8"),
    );
    for (const [ref, local] of Object.entries({
      ".hero": ".study-hero",
      ".hero__name": ".study-hero-name",
      ".hero__line": ".study-hero-line",
      ".marquee": ".study-marquee",
      ".selected-work": ".study-selected",
      ".up-close": ".study-gallery",
      ".statement": ".study-statement",
      ".service-tiles": ".study-services",
      ".footer": ".study-footer",
    })) {
      const box = await page.locator(local).first().boundingBox();
      expect(box, local).not.toBeNull();
      expect(
        Math.abs(box!.y - reference[ref][0].y),
        `${local} vertical placement`,
      ).toBeLessThan(3);
      if (ref !== ".footer")
        expect(
          Math.abs(box!.height - reference[ref][0].height),
          `${local} height`,
        ).toBeLessThan(3);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const fonts = await page.evaluate(() =>
      document.fonts.check('16px "Archivo Variable"'),
    );
    expect(fonts).toBe(true);
  });
}
test("real variable font responds and restores without text scaling", async ({
  page,
}) => {
  await skipIntro(page);
  await ready(page);
  const letter = page.locator(".study-hero-line [data-study-letter]").nth(1);
  const b = await letter.boundingBox();
  await page.mouse.move(b!.x + b!.width / 2, b!.y + b!.height / 2);
  await page.waitForTimeout(500);
  const wide = await letter.evaluate((el) => ({
    axes: getComputedStyle(el).fontVariationSettings,
    width: el.getBoundingClientRect().width,
    transform: getComputedStyle(el).transform,
  }));
  expect(wide.axes).not.toBe('"wdth" 70, "wght" 800');
  expect(wide.width).toBeGreaterThan(b!.width);
  expect(wide.transform).toBe("none");
  await page.screenshot({ path: "qa/interactions/variable-font.png" });
  await page.mouse.move(10, 890);
  await page.waitForTimeout(1800);
  expect(Math.abs((await letter.boundingBox())!.width - b!.width)).toBeLessThan(
    1,
  );
});
test("intro can be skipped and appears once per session", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("dialog", { name: "Opening animation" }),
  ).toBeVisible();
  await page.screenshot({ path: "qa/interactions/intro.png" });
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(
    page.getByRole("dialog", { name: "Opening animation" }),
  ).toBeHidden({ timeout: 3000 });
  await page.reload();
  await expect(
    page.getByRole("dialog", { name: "Opening animation" }),
  ).toHaveCount(0);
});
test("mobile navigation supports keyboard, Escape, route transitions and focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await skipIntro(page);
  await ready(page);
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(
    page.getByRole("button", { name: "Close", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "qa/interactions/mobile-menu.png" });
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".study-menu a").last()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.locator(".study-cover")).toBeVisible();
  await page.waitForTimeout(650);
  await page.screenshot({ path: "qa/interactions/transition.png" });
  await expect(page.locator(".study-cover")).toBeHidden({ timeout: 5000 });
  await expect(page).toHaveURL(/#\/work$/);
  await expect(page.locator("#study-main")).toBeFocused();
  await expect(page.locator(".study-menu")).toHaveAttribute("inert", "");
});
test("work switches views and opens original sample case", async ({ page }) => {
  await skipIntro(page);
  await page.goto("/#/work");
  await page.getByRole("button", { name: "Grid", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Grid", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator(".study-project-grid .study-project-media"),
  ).toHaveCount(4);
  await page.locator(".study-project-grid a").first().click();
  await expect(page).toHaveURL(/#\/work\/fun-arena$/);
  await expect(
    page.getByText("Demonstration study", { exact: true }),
  ).toBeVisible();
});
test("selected work focuses, follows pointer and pauses media", async ({
  page,
}) => {
  await skipIntro(page);
  await ready(page);
  await page.locator(".study-selected").scrollIntoViewIfNeeded();
  const row = page.locator(".study-work-row").nth(1);
  await row.hover();
  await expect(row).toHaveClass(/is-active/);
  await page.waitForTimeout(700);
  const before = await page.locator(".study-floating-preview").boundingBox();
  await page.mouse.move(650, 420, { steps: 5 });
  await page.waitForTimeout(400);
  const after = await page.locator(".study-floating-preview").boundingBox();
  expect(Math.abs(after!.x - before!.x)).toBeGreaterThan(5);
  await page.screenshot({ path: "qa/interactions/floating-preview.png" });
  await page
    .getByRole("button", { name: "(Pause motion)", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "(Play motion)", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator(".study-floating-preview .is-active .sample-screen")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
});
test("gallery drags with inertia, prevents accidental navigation, and normal click still works", async ({
  page,
}) => {
  await skipIntro(page);
  await ready(page);
  await page.locator(".study-gallery").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const b = await page.locator(".study-gallery-frame").first().boundingBox();
  const start = await page
    .locator(".study-gallery-track")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.mouse.move(b!.x + 250, b!.y + 130);
  await page.mouse.down();
  await page.mouse.move(b!.x + 60, b!.y + 130, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  expect(page.url()).not.toContain("/work/");
  expect(
    await page
      .locator(".study-gallery-track")
      .evaluate((el) => getComputedStyle(el).transform),
  ).not.toBe(start);
  await page.locator(".study-gallery-item").nth(3).click();
  await expect(page).toHaveURL(/#\/work\/wellpaws$/);
});
test("native horizontal scrolling on touch", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await skipIntro(page);
  await ready(page);
  const el = page.locator(".study-gallery-viewport");
  expect(await el.evaluate((el) => getComputedStyle(el).overflowX)).toBe(
    "auto",
  );
  await el.evaluate((el) => el.scrollTo({ left: 700 }));
  await page.waitForTimeout(200);
  expect(await el.evaluate((el) => el.scrollLeft)).toBeGreaterThan(300);
  await context.close();
});
test("pinned statement illuminates words in scroll order", async ({ page }) => {
  await skipIntro(page);
  await ready(page);
  await page.evaluate(() => {
    const el = document.querySelector(".study-statement")!;
    window.scrollTo(
      0,
      el.getBoundingClientRect().top +
        scrollY +
        (el.clientHeight - innerHeight) * 0.5,
    );
  });
  await page.waitForTimeout(300);
  const words = await page
    .locator(".study-statement-word")
    .evaluateAll((els) => els.map((e) => Number(getComputedStyle(e).opacity)));
  expect(words[0]).toBe(1);
  expect(words.at(-1)).toBeCloseTo(0.14, 2);
  expect(words.filter((o) => o === 1).length).toBeGreaterThan(5);
  await page.screenshot({ path: "qa/interactions/statement.png" });
});
test("reduced motion keeps content, native cursor and direct route navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await ready(page);
  await expect(page.locator(".study-intro")).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      document.documentElement.classList.contains("study-custom-cursor"),
    ),
  ).toBe(false);
  expect(
    await page
      .locator(".study-statement-word")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  await page.locator(".study-hero-action a").click();
  await expect(page).toHaveURL(/#\/work$/);
  await expect(page.locator(".study-cover")).toBeHidden();
});
test("FAQ is exclusive and contact preview is local only", async ({ page }) => {
  await skipIntro(page);
  await page.goto("/#/services/websites");
  const questions = page.locator(".study-faq button");
  await questions.nth(1).click();
  await expect(questions.nth(0)).toHaveAttribute("aria-expanded", "false");
  await expect(questions.nth(1)).toHaveAttribute("aria-expanded", "true");
  await page.goto("/#/contact");
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") requests.push(r.url());
  });
  await page.getByRole("button", { name: "Website", exact: true }).click();
  await page.getByRole("button", { name: "App design", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Website", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("textbox", { name: "Your name" })
    .fill("Preview visitor");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("preview@example.com");
  await page.getByRole("button", { name: "Preview enquiry →" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing was sent");
  expect(requests).toEqual([]);
});
test("local assets load, footer fits and browser has no uncaught errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await skipIntro(page);
  await ready(page);
  expect(
    await page
      .locator("img")
      .evaluateAll((els) =>
        els.every(
          (e) =>
            (e as HTMLImageElement).complete &&
            (e as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBe(true);
  const footer = page.locator(".study-footer-title");
  expect(
    await footer.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("mobile work preview swipes without opening the project", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await skipIntro(page);
  await ready(page);
  await page.locator(".study-selected").scrollIntoViewIfNeeded();
  const viewport = page.locator(".study-docked-media");
  const box = await viewport.boundingBox();
  await page.mouse.move(box!.x + 260, box!.y + 100);
  await page.mouse.down();
  await page.mouse.move(box!.x + 90, box!.y + 100, { steps: 6 });
  await page.mouse.up();
  await expect(page.locator(".study-dock-dots i").nth(1)).toHaveClass(
    "is-current",
  );
  expect(page.url()).not.toContain("/work/");
});

test("storage notice dismisses, stays dismissed on scrolling, and can reopen", async ({
  page,
}) => {
  await skipIntro(page);
  await ready(page);
  await page.locator(".study-selected").scrollIntoViewIfNeeded();
  const notice = page.getByRole("region", { name: "Storage preferences" });
  await expect(notice).toBeVisible();
  await notice.getByRole("button", { name: "Decline", exact: true }).click();
  await expect(notice).toBeHidden();
  await page.locator(".study-gallery").scrollIntoViewIfNeeded();
  await expect(notice).toBeHidden();
  await page
    .getByRole("button", { name: "Cookie settings", exact: true })
    .click();
  await expect(notice).toBeVisible();
});
