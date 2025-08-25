import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import type { StorybookConfig } from '@storybook/sveltekit'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts|svelte)'],
  addons: [
    {
      name: getAbsolutePath('@storybook/addon-svelte-csf'),
      options: {
        legacyTemplate: false,
      },
    },
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/sveltekit'),
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
      '@ui': resolve(__dirname, '../src/lib'),
    }

    return config
  },
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}
