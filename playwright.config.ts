import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  workers: 1,
  reporter: [
    ["list"],
    ["json", { outputFile: "qa/phase-2/browser-results.json" }],
    ["html", { outputFolder: "qa/phase-2/test-report", open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:5173",
    channel: "chrome",
    headless: true,
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
  },
  outputDir: "qa/phase-2/test-results",
});
