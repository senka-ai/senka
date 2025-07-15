import type { StorybookConfig } from '@storybook/sveltekit'
import tailwindcss from '@tailwindcss/vite'

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
	viteFinal: async (config) => {
		config.plugins?.push(tailwindcss())
		return config
	},
}
export default config
