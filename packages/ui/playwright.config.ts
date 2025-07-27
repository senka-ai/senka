import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for UI component visual regression testing
 * Tests the UI components in isolation via Storybook
 */
export default defineConfig({
  testDir: './tests/visual',

  // Enable full parallelization
  fullyParallel: true,

  // Configure test timeout and retry
  timeout: 30 * 1000,
  expect: {
    // Configure screenshot comparison
    threshold: 0.2,
    toHaveScreenshot: {
      animations: 'disabled',
    },
  },

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
    baseURL: 'http://localhost:6006',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Configure screenshot settings
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium-light',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
      },
    },
    // Optional: Add more browsers if needed
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     colorScheme: 'light',
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     colorScheme: 'light',
    //   },
    // },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'yarn story',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
