import { test, expect } from '@playwright/test'
import { visitStory, setTheme, getStoryContainer, waitForImages } from './utils'

/**
 * Visual regression tests for critical components
 * These tests capture screenshots of key components in both light and dark themes
 */

/**
 * Critical components visual tests
 * These are the most important components that need visual consistency checks
 */

// Button Visual Tests
test.describe('Button Visual Tests', () => {
	test('All Variants - Light Theme', async ({ page }) => {
		await visitStory(page, 'components-button--all-variants')
		await waitForImages(page)
		await setTheme(page, 'light')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('button-all-variants-light.png')
	})
	
	test('All Variants - Dark Theme', async ({ page }) => {
		await visitStory(page, 'components-button--all-variants')
		await waitForImages(page)
		await setTheme(page, 'dark')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('button-all-variants-dark.png')
	})
	
	test('Loading State - Light Theme', async ({ page }) => {
		await visitStory(page, 'components-button--loading')
		await waitForImages(page)
		await setTheme(page, 'light')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('button-loading-light.png')
	})
	
	test('Loading State - Dark Theme', async ({ page }) => {
		await visitStory(page, 'components-button--loading')
		await waitForImages(page)
		await setTheme(page, 'dark')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('button-loading-dark.png')
	})
})

// TextField Visual Tests
test.describe('TextField Visual Tests', () => {
	test('Default State - Light Theme', async ({ page }) => {
		await visitStory(page, 'components-textfield--default')
		await waitForImages(page)
		await setTheme(page, 'light')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('textfield-default-light.png')
	})
	
	test('Default State - Dark Theme', async ({ page }) => {
		await visitStory(page, 'components-textfield--default')
		await waitForImages(page)
		await setTheme(page, 'dark')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('textfield-default-dark.png')
	})
})

// Card Visual Tests
test.describe('Card Visual Tests', () => {
	test('Default Card - Light Theme', async ({ page }) => {
		await visitStory(page, 'components-card--default')
		await waitForImages(page)
		await setTheme(page, 'light')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('card-default-light.png')
	})
	
	test('Default Card - Dark Theme', async ({ page }) => {
		await visitStory(page, 'components-card--default')
		await waitForImages(page)
		await setTheme(page, 'dark')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('card-default-dark.png')
	})
})

// Avatar Visual Tests
test.describe('Avatar Visual Tests', () => {
	test('All Sizes - Light Theme', async ({ page }) => {
		await visitStory(page, 'components-avatar--all-sizes')
		await waitForImages(page)
		await setTheme(page, 'light')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('avatar-all-sizes-light.png')
	})
	
	test('All Sizes - Dark Theme', async ({ page }) => {
		await visitStory(page, 'components-avatar--all-sizes')
		await waitForImages(page)
		await setTheme(page, 'dark')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('avatar-all-sizes-dark.png')
	})
})

// Dropdown Visual Tests
test.describe('Dropdown Visual Tests', () => {
	test('Default State - Light Theme', async ({ page }) => {
		await visitStory(page, 'components-dropdown--default')
		await waitForImages(page)
		await setTheme(page, 'light')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('dropdown-default-light.png')
	})
	
	test('Default State - Dark Theme', async ({ page }) => {
		await visitStory(page, 'components-dropdown--default')
		await waitForImages(page)
		await setTheme(page, 'dark')
		
		const storyContainer = getStoryContainer(page)
		await expect(storyContainer).toHaveScreenshot('dropdown-default-dark.png')
	})
})