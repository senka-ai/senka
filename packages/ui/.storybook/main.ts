import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts|svelte)'],
  addons: [
    {
      name: '@storybook/addon-svelte-csf',
      options: {
        legacyTemplate: false,
      },
    },
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },
  features: {
    experimentalRSC: false,
  },
  viteFinal: async (config) => {
    // Import Tailwind CSS v4 dynamically to avoid export issues
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    config.plugins?.push(tailwindcss())
    return config
  },
}
export default config
