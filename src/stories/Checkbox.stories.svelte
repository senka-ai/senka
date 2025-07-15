<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Checkbox from '../lib/components/Checkbox.svelte'

	const { Story } = defineMeta({
		title: 'Components/Checkbox',
		component: Checkbox,
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
				description: 'Checkbox size',
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
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="Checked" args={{ checked: true }}>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="Small" args={{ size: 'small' }}>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="Medium" args={{ size: 'medium' }}>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="Large" args={{ size: 'large' }}>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, checked: false }}>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="Disabled Checked" args={{ disabled: true, checked: true }}>
	{#snippet template(args)}
		<Checkbox {...args} />
	{/snippet}
</Story>

<Story name="All Sizes">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<Checkbox size="small" />
				<Checkbox size="small" checked={true} />
			</div>
			<div class="flex items-center gap-4">
				<Checkbox size="medium" />
				<Checkbox size="medium" checked={true} />
			</div>
			<div class="flex items-center gap-4">
				<Checkbox size="large" />
				<Checkbox size="large" checked={true} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Interactive Example">
	{#snippet template()}
		<div class="space-y-4">
			<p class="text-neutral-600">Click the checkboxes to toggle their state:</p>
			<div class="flex flex-col gap-3">
				<label class="flex cursor-pointer items-center gap-2">
					<Checkbox />
					<span>Option 1</span>
				</label>
				<label class="flex cursor-pointer items-center gap-2">
					<Checkbox />
					<span>Option 2</span>
				</label>
				<label class="flex cursor-pointer items-center gap-2">
					<Checkbox />
					<span>Option 3</span>
				</label>
				<label class="flex cursor-pointer items-center gap-2">
					<Checkbox disabled />
					<span class="text-neutral-500">Disabled option</span>
				</label>
			</div>
		</div>
	{/snippet}
</Story>
