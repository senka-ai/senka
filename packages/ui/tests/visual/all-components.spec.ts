import { test, expect } from '@playwright/test'
import { visitStory, setTheme, getStoryContainer, waitForImages, mockExternalImages } from './utils'

/**
 * Visual regression tests for ALL components
 * Tests actual working stories for each component in both light and dark themes
 */

// All components with their actual working story names
const allComponents = [
  { name: 'Accordion', story: 'overview', section: 'layout-accordion' },
  { name: 'ActionSheet', story: 'overview', section: 'controls-actionsheet' },
  { name: 'Avatar', story: 'overview', section: 'media-avatar' },
  { name: 'Badge', story: 'overview', section: 'feedback-badge' },
  { name: 'Banner', story: 'overview', section: 'feedback-banner' },
  { name: 'Button', story: 'overview', section: 'core-button' },
  { name: 'Card', story: 'overview', section: 'layout-card' },
  { name: 'CardHorizontal', story: 'overview', section: 'layout-cardhorizontal' },
  { name: 'Checkbox', story: 'overview', section: 'forms-checkbox' },
  { name: 'ContentSwitcher', story: 'overview', section: 'controls-contentswitcher' },
  { name: 'Dialog', story: 'overview', section: 'feedback-dialog' },
  { name: 'Divider', story: 'overview', section: 'layout-divider' },
  { name: 'Dropdown', story: 'overview', section: 'forms-dropdown' },
  { name: 'IconButton', story: 'overview', section: 'core-iconbutton' },
  { name: 'Icons', story: 'overview', section: 'icons-all-icons' },
  { name: 'Image', story: 'overview', section: 'media-image' },
  { name: 'IndividualIcons', story: 'add-icon', section: 'icons-individual-icons' },
  { name: 'List', story: 'overview', section: 'layout-list' },
  { name: 'ListItem', story: 'overview', section: 'layout-listitem' },
  { name: 'ListTitle', story: 'overview', section: 'layout-listtitle' },
  { name: 'Loader', story: 'overview', section: 'feedback-loader' },
  { name: 'NavBar', story: 'overview', section: 'navigation-navbar' },
  { name: 'NumberInput', story: 'overview', section: 'forms-numberinput' },
  { name: 'ProgressBar', story: 'overview', section: 'feedback-progressbar' },
  { name: 'RadioGroup', story: 'overview', section: 'forms-radiogroup' },
  { name: 'SearchBar', story: 'overview', section: 'forms-searchbar' },
  { name: 'Slider', story: 'overview', section: 'forms-slider' },
  { name: 'StarRating', story: 'overview', section: 'forms-starrating' },
  { name: 'TabBar', story: 'overview', section: 'navigation-tabbar' },
  { name: 'Tag', story: 'overview', section: 'feedback-tag' },
  { name: 'TextArea', story: 'overview', section: 'forms-textarea' },
  { name: 'TextField', story: 'overview', section: 'forms-textfield' },
  { name: 'ThemeToggle', story: 'overview', section: 'core-themetoggle' },
  { name: 'Toast', story: 'overview', section: 'feedback-toast' },
  { name: 'Toggle', story: 'overview', section: 'forms-toggle' },
  { name: 'Tooltip', story: 'overview', section: 'feedback-tooltip' },
  { name: 'ValidationExample', story: 'email-validation', section: 'forms-validation-example' },
  { name: 'Video', story: 'overview', section: 'media-video' },
]

// Generate tests for each component (optimized for speed)
allComponents.forEach((component) => {
  test.describe(`${component.name} Component`, () => {
    test(`${component.name} - Both Themes`, async ({ page }) => {
      const storyId = component.section
        ? `${component.section}--${component.story}`
        : `components-${component.name.toLowerCase()}--${component.story}`

      try {
        await mockExternalImages(page)
        await visitStory(page, storyId)
        await waitForImages(page)

        // Test light theme
        await setTheme(page, 'light')
        const storyContainer = getStoryContainer(page)
        await expect(storyContainer).toHaveScreenshot(`${component.name.toLowerCase()}-light.png`)

        // Test dark theme (reuse same page)
        await setTheme(page, 'dark')
        await expect(storyContainer).toHaveScreenshot(`${component.name.toLowerCase()}-dark.png`)
      } catch (error) {
        console.log(`Story ${storyId} failed: ${error instanceof Error ? error.message : String(error)}`)
        throw error
      }
    })
  })
})
