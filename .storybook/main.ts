import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
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
}
export default config
