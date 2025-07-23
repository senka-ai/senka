import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for app-level e2e testing
 * For UI component visual testing, see ../ui/playwright.config.ts
 */
export default defineConfig({
  testDir: './tests',

  // Enable full parallelization
  fullyParallel: true,

  // Configure test timeout and retry
  timeout: 30 * 1000,

  // Fail the build on CI if the files are missing
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Use parallel workers for faster execution
  workers: process.env.CI ? 2 : 4,

  // Reporter to use
  reporter: [['html', { open: 'never' }], ['list']],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:5173',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Configure screenshot settings
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'yarn app:dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
