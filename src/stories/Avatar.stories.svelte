<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Avatar from '../lib/components/media/Avatar.svelte'

	const { Story } = defineMeta({
		title: 'Components/Avatar',
		component: Avatar,
		args: {
			size: 'medium',
			alt: 'User Avatar',
		},
		argTypes: {
			size: {
				control: { type: 'select' },
				options: ['xs', 'small', 'medium', 'large'],
				description: 'Avatar size',
			},
			status: {
				control: { type: 'select' },
				options: ['online', 'offline', 'away', 'busy'],
				description: 'Status indicator',
			},
			src: {
				control: { type: 'text' },
				description: 'Image source URL',
			},
			alt: {
				control: { type: 'text' },
				description: 'Alternative text',
			},
			initials: {
				control: { type: 'text' },
				description: 'Initials to display',
			},
		},
	})
</script>

<Story
	name="With Image"
	args={{
		src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
		alt: 'John Doe',
	}}
>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>

<Story
	name="With Initials"
	args={{
		initials: 'JD',
		alt: 'John Doe',
	}}
>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>

<Story
	name="With Status"
	args={{
		initials: 'JD',
		alt: 'John Doe',
		status: 'online',
	}}
>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>

<Story name="With SVG" args={{ alt: '' }}>
	{#snippet template(args)}
		<Avatar {...args} />
	{/snippet}
</Story>

<Story name="All Sizes">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<Avatar size="xs" initials="XS" alt="Extra Small" />
				<Avatar size="small" initials="S" alt="Small" />
				<Avatar size="medium" initials="M" alt="Medium" />
				<Avatar size="large" initials="L" alt="Large" />
			</div>
			<div class="flex items-center gap-4">
				<Avatar size="xs" initials="XS" alt="Extra Small" status="online" />
				<Avatar size="small" initials="S" alt="Small" status="online" />
				<Avatar size="medium" initials="M" alt="Medium" status="online" />
				<Avatar size="large" initials="L" alt="Large" status="online" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="All Status">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<Avatar initials="ON" alt="Online" status="online" />
				<Avatar initials="OF" alt="Offline" status="offline" />
				<Avatar initials="AW" alt="Away" status="away" />
				<Avatar initials="BS" alt="Busy" status="busy" />
			</div>
			<div class="flex items-center gap-4">
				<Avatar size="xs" initials="ON" alt="Online" status="online" />
				<Avatar size="xs" initials="OF" alt="Offline" status="offline" />
				<Avatar size="xs" initials="AW" alt="Away" status="away" />
				<Avatar size="xs" initials="BS" alt="Busy" status="busy" />
			</div>
		</div>
	{/snippet}
</Story>
