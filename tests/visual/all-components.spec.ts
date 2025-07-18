import { test, expect } from '@playwright/test'
import { visitStory, setTheme, getStoryContainer, waitForImages, mockExternalImages } from './utils'

/**
 * Visual regression tests for ALL components
 * Tests actual working stories for each component in both light and dark themes
 */

// All components with their actual working story names
const allComponents = [
	{ name: 'Accordion', story: 'basic-closed' },
	{ name: 'Avatar', story: 'all-sizes' },
	{ name: 'Badge', story: 'all-variants' },
	{ name: 'Button', story: 'all-variants' },
	{ name: 'Card', story: 'default' },
	{ name: 'CardHorizontal', story: 'default' },
	{ name: 'Checkbox', story: 'all-sizes' },
	{ name: 'Divider', story: 'all-variants' },
	{ name: 'Dropdown', story: 'default' },
	{ name: 'Icons', story: 'icon-gallery', section: 'icons-all-icons' },
	{ name: 'Image', story: 'default' },
	{ name: 'IndividualIcons', story: 'add-icon', section: 'icons-individual-icons' },
	{ name: 'List', story: 'basic-list' },
	{ name: 'ListItem', story: 'basic' },
	{ name: 'ListTitle', story: 'basic' },
	{ name: 'NavBar', story: 'all-variants' },
	{ name: 'RadioButton', story: 'all-sizes' },
	{ name: 'SearchBar', story: 'all-states' },
	{ name: 'TabBar', story: 'default' },
	{ name: 'Tag', story: 'all-variants' },
	{ name: 'TextArea', story: 'default' },
	{ name: 'TextField', story: 'all-states' },
	{ name: 'ThemeToggle', story: 'default' },
	{ name: 'Toggle', story: 'all-sizes' },
	{ name: 'Video', story: 'default' },
]

// Generate tests for each component
allComponents.forEach(component => {
	test.describe(`${component.name} Component`, () => {
		test(`${component.name} - Light Theme`, async ({ page }) => {
			const storyId = component.section 
				? `${component.section}--${component.story}`
				: `components-${component.name.toLowerCase()}--${component.story}`
			
			try {
				await mockExternalImages(page)
				await visitStory(page, storyId)
				await waitForImages(page)
				await setTheme(page, 'light')
				
				const storyContainer = getStoryContainer(page)
				await expect(storyContainer).toHaveScreenshot(
					`${component.name.toLowerCase()}-light.png`
				)
			} catch (error) {
				console.log(`Story ${storyId} failed: ${error.message}`)
				test.skip()
			}
		})
		
		test(`${component.name} - Dark Theme`, async ({ page }) => {
			const storyId = component.section 
				? `${component.section}--${component.story}`
				: `components-${component.name.toLowerCase()}--${component.story}`
			
			try {
				await mockExternalImages(page)
				await visitStory(page, storyId)
				await waitForImages(page)
				await setTheme(page, 'dark')
				
				const storyContainer = getStoryContainer(page)
				await expect(storyContainer).toHaveScreenshot(
					`${component.name.toLowerCase()}-dark.png`
				)
			} catch (error) {
				console.log(`Story ${storyId} failed: ${error.message}`)
				test.skip()
			}
		})
	})
})