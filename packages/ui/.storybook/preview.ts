import type { Preview } from '@storybook/sveltekit'
import '../src/styles/index.css'

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
}

export default preview
