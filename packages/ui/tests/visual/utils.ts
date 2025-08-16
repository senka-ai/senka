import { type Page } from '@playwright/test'

/**
 * Utility functions for visual testing
 */

/**
 * Navigate to a specific Storybook story
 */
export async function visitStory(page: Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&visualTest=true`, {
    waitUntil: 'networkidle',
    timeout: 60000,
  })

  // Disable animations and transitions for consistent visual testing
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-delay: 0.01ms !important;
        transition-duration: 0.01ms !important;
        transition-delay: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `,
  })

  // Wait for the story to load
  await page.waitForSelector('#storybook-root')
  // Wait for any remaining dynamic content to stabilize
  await page.waitForTimeout(500)
}

/**
 * Switch theme by setting data-theme attribute
 */
export async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((theme) => {
    document.documentElement.setAttribute('data-theme', theme)
  }, theme)
  // Reduced wait time for theme transition
  await page.waitForTimeout(100)
}

/**
 * Get the main story container for screenshots
 */
export function getStoryContainer(page: Page) {
  return page.locator('#storybook-root')
}

/**
 * Mock external images and videos with static placeholders
 */
export async function mockExternalImages(page: Page) {
  await page.route('**/*', (route) => {
    const url = route.request().url()

    // Mock external video services with a minimal static video
    if (
      url.includes('gtv-videos-bucket') ||
      url.includes('commondatastorage.googleapis.com') ||
      url.includes('BigBuckBunny.mp4')
    ) {
      // Return a minimal 1-second black MP4 video (base64 encoded)
      // This is a valid MP4 file that loads instantly and shows a black frame
      const staticVideo = Buffer.from(
        'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAitbZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE2NCByMzA5NSBiYWVlNDAwIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAyMyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEyIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAIhliIql',
        'base64'
      )
      route.fulfill({
        status: 200,
        contentType: 'video/mp4',
        body: staticVideo,
      })
    }
    // Mock external image services with a static placeholder
    else if (
      url.includes('picsum.photos') ||
      url.includes('placeholder.com') ||
      url.includes('via.placeholder.com') ||
      url.includes('invalid-url.com') ||
      url.includes('unsplash.com') ||
      url.includes('images.unsplash.com')
    ) {
      // Return a static colored rectangle image (100x100 gray)
      const staticImage = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        'base64'
      )
      route.fulfill({
        status: 200,
        contentType: 'image/png',
        body: staticImage,
      })
    } else {
      route.continue()
    }
  })
}

/**
 * Wait for all images to load in the story
 */
export async function waitForImages(page: Page) {
  await page.evaluate(() => {
    const images = Array.from(document.images)
    return Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve()
        return new Promise((resolve) => {
          img.addEventListener('load', resolve)
          img.addEventListener('error', resolve)
        })
      })
    )
  })
}

/**
 * Standard screenshot options for consistency
 */
export const screenshotOptions = {
  animations: 'disabled' as const,
  clip: { x: 0, y: 0, width: 800, height: 600 },
}

/**
 * Take a visual snapshot of a story in both themes
 */
export async function visualTestStory(page: Page, storyId: string, testName: string) {
  await visitStory(page, storyId)
  await waitForImages(page)

  // Test light theme
  await setTheme(page, 'light')
  await page.locator('#storybook-root').screenshot({
    path: `tests/visual/screenshots/${testName}-light.png`,
    ...screenshotOptions,
  })

  // Test dark theme
  await setTheme(page, 'dark')
  await page.locator('#storybook-root').screenshot({
    path: `tests/visual/screenshots/${testName}-dark.png`,
    ...screenshotOptions,
  })
}
