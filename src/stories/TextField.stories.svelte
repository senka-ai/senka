<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TextField from '../lib/components/TextField.svelte'
	import EyeInvisibleIcon from '../lib/icons/EyeInvisibleIcon.svelte'

	const { Story } = defineMeta({
		title: 'Components/TextField',
		component: TextField,
		args: {
			label: 'Label',
			placeholder: 'Placeholder text',
			disabled: false,
			fullWidth: false,
		},
		argTypes: {
			label: {
				control: { type: 'text' },
				description: 'Field label',
			},
			placeholder: {
				control: { type: 'text' },
				description: 'Placeholder text',
			},
			helperText: {
				control: { type: 'text' },
				description: 'Helper text',
			},
			error: {
				control: { type: 'text' },
				description: 'Error message',
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Disabled state',
			},
			fullWidth: {
				control: { type: 'boolean' },
				description: 'Full width field',
			},
			unit: {
				control: { type: 'text' },
				description: 'Unit suffix',
			},
		},
	})
</script>

<Story
	name="Default"
	args={{
		label: 'Title',
		placeholder: 'Placeholder',
	}}
>
	{#snippet template(args)}
		<TextField {...args} />
	{/snippet}
</Story>

<Story
	name="With Helper Text"
	args={{
		label: 'Website',
		placeholder: 'URL',
		helperText: 'Must be at least 8 characters',
	}}
>
	{#snippet template(args)}
		<TextField {...args} />
	{/snippet}
</Story>

<Story
	name="With Error"
	args={{
		label: 'Email',
		placeholder: 'Enter your email',
		error: 'Please enter a valid email address',
	}}
>
	{#snippet template(args)}
		<TextField {...args} />
	{/snippet}
</Story>

<Story
	name="Disabled"
	args={{
		label: 'Email',
		placeholder: 'Enter your email',
		disabled: true,
	}}
>
	{#snippet template(args)}
		<TextField {...args} />
	{/snippet}
</Story>

<Story
	name="With Unit"
	args={{
		label: 'Price',
		placeholder: '0.00',
		unit: '€',
	}}
>
	{#snippet template(args)}
		<TextField {...args} />
	{/snippet}
</Story>

<Story
	name="With Password"
	args={{
		label: 'Password',
		placeholder: 'Enter your password',
		type: 'password',
	}}
>
	{#snippet template(args)}
		{#snippet eyeIcon(size)}<EyeInvisibleIcon {size} />{/snippet}
		<TextField {...args} rightIcon={eyeIcon} />
	{/snippet}
</Story>

<Story name="All States">
	{#snippet template()}
		<div class="max-w-md space-y-4">
			<TextField label="Default" placeholder="Enter text" />
			<TextField label="With Helper Text" placeholder="Enter text" helperText="This is helper text" />
			<TextField label="With Error" placeholder="Enter text" error="This field is required" />
			<TextField label="Disabled" placeholder="Enter text" disabled />
			<TextField label="With Unit" placeholder="0.00" unit="€" />
			{#snippet passwordIcon(size)}<EyeInvisibleIcon {size} />{/snippet}
			<TextField label="With Password" placeholder="Enter your password" type="password" rightIcon={passwordIcon} />
		</div>
	{/snippet}
</Story>
