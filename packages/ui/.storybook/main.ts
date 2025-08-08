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
    const { resolve } = await import('path')
    const { fileURLToPath } = await import('url')
    const { dirname } = await import('path')
    
    // Get __dirname equivalent in ESM
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    
    config.plugins?.push(tailwindcss())
    
    // Add path aliases for Storybook (needed because Storybook runs its own Vite instance)
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': resolve(__dirname, '../src/lib/components'),
      '@icons': resolve(__dirname, '../src/lib/icons'),
      '@utils': resolve(__dirname, '../src/lib/utils'),
      '@type': resolve(__dirname, '../src/lib/type'),
      '@styles': resolve(__dirname, '../src/styles'),
    }
    
    return config
  },
}
export default config
