import { type Page } from '@playwright/test'

/**
 * Utility functions for visual testing
 */

/**
 * Navigate to a specific Storybook story
 */
export async function visitStory(page: Page, storyId: string) {
	await page.goto(`/iframe.html?id=${storyId}`)
	// Wait for the story to load
	await page.waitForSelector('#storybook-root')
	// Reduced wait time for faster execution
	await page.waitForTimeout(200)
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
 * Mock external images with static placeholder
 */
export async function mockExternalImages(page: Page) {
	await page.route('**/*', route => {
		const url = route.request().url()
		
		// Mock external image services with a static placeholder
		if (url.includes('picsum.photos') || 
			url.includes('placeholder.com') || 
			url.includes('via.placeholder.com') ||
			url.includes('invalid-url.com') ||
			url.includes('unsplash.com') ||
			url.includes('images.unsplash.com')) {
			
			// Return a static colored rectangle image (100x100 gray)
			const staticImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')
			route.fulfill({
				status: 200,
				contentType: 'image/png',
				body: staticImage
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
			images.map(img => {
				if (img.complete) return Promise.resolve()
				return new Promise(resolve => {
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
export async function visualTestStory(
	page: Page, 
	storyId: string, 
	testName: string
) {
	await visitStory(page, storyId)
	await waitForImages(page)
	
	// Test light theme
	await setTheme(page, 'light')
	await page.locator('#storybook-root').screenshot({ 
		path: `tests/visual/screenshots/${testName}-light.png`,
		...screenshotOptions
	})
	
	// Test dark theme
	await setTheme(page, 'dark')
	await page.locator('#storybook-root').screenshot({ 
		path: `tests/visual/screenshots/${testName}-dark.png`,
		...screenshotOptions
	})
}