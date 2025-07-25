import type { Preview } from '@storybook/sveltekit'
import '../src/styles/index.css'
import './story-layout.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Core',
          'Icons', 
          'Forms',
          'Feedback',
          'Layout',
          'Media',
          'Navigation'
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      const layout = context.parameters.layout || 'default'
      
      // Apply layout class to the story container
      const result = story()
      
      // Add data attribute for CSS targeting
      if (typeof document !== 'undefined') {
        setTimeout(() => {
          const storyContainer = document.querySelector('.docs-story, .sb-show-main')
          if (storyContainer) {
            storyContainer.setAttribute('data-layout', layout)
          }
        }, 0)
      }
      
      return result
    }
  ],
}

export default preview
