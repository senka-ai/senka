<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RadioButton from '../lib/components/RadioButton.svelte'
	import RadioGroupExample from './RadioGroupExample.svelte'

	const { Story } = defineMeta({
		title: 'Components/RadioButton',
		component: RadioButton,
		args: {
			checked: false,
			size: 'medium',
			disabled: false,
		},
		argTypes: {
			checked: {
				control: { type: 'boolean' },
				description: 'Checked state',
			},
			size: {
				control: { type: 'select' },
				options: ['small', 'medium', 'large'],
				description: 'Radio button size',
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Disabled state',
			},
			onchange: {
				action: 'changed',
				description: 'Change event handler',
			},
		},
	})
</script>

<Story name="Default" args={{ checked: false }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Checked" args={{ checked: true }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, checked: false }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Disabled Checked" args={{ disabled: true, checked: true }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="All Sizes">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<RadioButton size="small" />
				<RadioButton size="small" checked={true} />
			</div>
			<div class="flex items-center gap-4">
				<RadioButton size="medium" />
				<RadioButton size="medium" checked={true} />
			</div>
			<div class="flex items-center gap-4">
				<RadioButton size="large" />
				<RadioButton size="large" checked={true} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Radio Group Example">
	{#snippet template()}
		<RadioGroupExample />
	{/snippet}
</Story>
