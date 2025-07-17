<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import RadioButton from '../lib/components/RadioButton.svelte'
	import RadioGroupExample from './RadioGroupExample.svelte'
	import InteractiveRadioExample from './InteractiveRadioExample.svelte'

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
			label: {
				control: { type: 'text' },
				description: 'Simple text label',
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

<Story name="With Label" args={{ label: 'Choose this option' }}>
	{#snippet template(args)}
		<RadioButton {...args} />
	{/snippet}
</Story>

<Story name="Rich Content">
	{#snippet template()}
		<div class="space-y-4">
			<p class="text-neutral-600">Examples of rich content in radio buttons:</p>
			<div class="flex flex-col gap-3">
				<RadioButton name="plan" value="basic">
					{#snippet children()}
						<strong>Basic Plan</strong> - Free with limited features
					{/snippet}
				</RadioButton>
				<RadioButton name="plan" value="pro">
					{#snippet children()}
						<strong>Pro Plan</strong> - $9.99/month with <a href="/features" class="text-highlight underline">advanced features</a>
					{/snippet}
				</RadioButton>
				<RadioButton name="plan" value="enterprise">
					{#snippet children()}
						<strong>Enterprise</strong> - Custom pricing for <em>large teams</em>
					{/snippet}
				</RadioButton>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Interactive Example">
	{#snippet template()}
		<InteractiveRadioExample />
	{/snippet}
</Story>

<Story name="Radio Group Example">
	{#snippet template()}
		<RadioGroupExample />
	{/snippet}
</Story>
